import { useState, useEffect } from "react";
import ThirdContext from "../../Contexts/ThirdContext";
import Create from "./Create";
import List from "./List";
import axios from "axios";
import { authConfig } from "../../Functions/auth";

function Main() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);
  const [containers, setContainers] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  // READ for list
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/containers", authConfig())
      .then((res) => {
        setContainers(res.data);
      });
  }, [lastUpdate]);

  useEffect(() => {
    if (null === createData) {
      return;
    }
    axios
      .post("http://localhost:3003/admin/containers", createData, authConfig())
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
        "http://localhost:3003/admin/containers/" + deleteData.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  // useEffect(() => {
  //   if (null === editData) {
  //     return;
  //   }
  //   axios
  //     .put(
  //       "http://localhost:3003/server/clothes/" + editData.id,
  //       editData,
  //       authConfig()
  //     )
  //     .then((res) => {
  //       setLastUpdate(Date.now());
  //     });
  // }, [editData]);

  return (
    <ThirdContext.Provider
      value={{
        setCreateData,
        containers,
        setDeleteData,
        modalData,
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
    </ThirdContext.Provider>
  );
}
export default Main;