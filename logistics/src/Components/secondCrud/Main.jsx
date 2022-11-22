import { useState, useEffect } from "react";
import SecondContext from "../../Contexts/SecondContext";
import Create from "./Create";
import List from "./List";
import Edit from "./Edit";
import axios from "axios";
import { authConfig } from "../../Functions/auth";

function Main() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);
  const [boxes, setBoxes] = useState(null);
  const [containers, setContainers] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [occupyContainer, setOccupyContainer] = useState(null);
  const [weightChange, setWeightChange] = useState(null);
  const [changeContainers, setChangeContainers] = useState(null);

  // CONTAINER
  // READ for list
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/containers", authConfig())
      .then((res) => {
        setContainers(res.data);
      });
  }, [lastUpdate]);

  // CONTAINER OCUPATION
  useEffect(() => {
    if (null === deleteData) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/admin/boxDelete/" + deleteData.container_id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  useEffect(() => {
    if (null === occupyContainer) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/admin/boxCreate/" + occupyContainer.container_id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [occupyContainer]);

  useEffect(() => {
    if (null === changeContainers) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/admin/boxChangeAdd/" + changeContainers.add_id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });

    axios
      .put(
        "http://localhost:3003/admin/boxChangeRemove/" +
          changeContainers.remove_id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [changeContainers]);

  // BOXES
  useEffect(() => {
    axios.get("http://localhost:3003/admin/boxes", authConfig()).then((res) => {
      setBoxes(res.data);
    });
  }, [lastUpdate]);

  useEffect(() => {
    if (null === createData) {
      return;
    }
    axios
      .post("http://localhost:3003/admin/boxes", createData, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [createData]);

  useEffect(() => {
    if (null === deleteData) {
      return;
    }
    axios
      .delete(
        "http://localhost:3003/admin/boxes/" + deleteData.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/admin/boxes/" + editData.id,
        editData,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [editData]);

  return (
    <SecondContext.Provider
      value={{
        setCreateData,
        boxes,
        containers,
        setDeleteData,
        modalData,
        setChangeContainers,
        setOccupyContainer,
        setModalData,
        setEditData,
      }}
    >
      <div className="container">
        <div className="row">
          <div className=" col-lg-4">{<Create />}</div>
          <div className=" col-lg-8">{<List />}</div>
        </div>
      </div>
      <Edit />
    </SecondContext.Provider>
  );
}
export default Main;
