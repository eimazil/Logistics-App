import { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";
import FirstContext from "../../Contexts/FirstContext";
import { authConfig } from "../../Functions/auth";
import Modal from "./Modal";

function Main() {
  const [containers, setContainers] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const reList = (data) => {
    const d = new Map();
    data.forEach((line) => {
      if (d.has(line.id)) {
        d.set(line.id, [...d.get(line.id), line]);
      } else {
        d.set(line.id, [line]);
      }
    });
    return [...d];
  };

  useEffect(() => {
    axios
      .get("http://localhost:3003/home/containers", authConfig())
      .then((res) => {
        setContainers(reList(res.data));
      });
  }, [lastUpdate]);

  return (
    <FirstContext.Provider
      value={{
        containers,
        modalData,
        setModalData,
      }}
    >
      <div className="container suppliers">
        <div className="row">
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
      <Modal />
    </FirstContext.Provider>
  );
}
export default Main;
