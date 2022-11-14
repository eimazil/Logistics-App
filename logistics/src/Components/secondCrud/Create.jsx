import { useState, useContext, useRef } from "react";
import DataContext from "../../Contexts/DataContext";
import SecondContext from "../../Contexts/SecondContext";
import getBase64 from "../../Functions/getBase64";

function Create() {
  const [title, setTitle] = useState("");
  const [flammability, setFlammability] = useState(false);
  const [perishable, setPerishable] = useState(false);
  const [containerID, setContainerID] = useState(0);
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const { setCreateData, containers, setOccupyContainer } =
    useContext(SecondContext);
  const { makeMsg } = useContext(DataContext);

  const add = () => {
    if (title === null) {
      makeMsg("Add shipment title", "error");
      return;
    }
    if (title.length > 100) {
      makeMsg("Title too long!", "error");
      return;
    }

    if (containerID === 0) {
      makeMsg("Choose a container", "error");
      return;
    }
    setCreateData({
      title,
      flammability,
      perishable,
      image: photoPrint,
      container_id: parseInt(containerID),
    });
    setOccupyContainer({ container_id: parseInt(containerID) });
    setTitle("");
    setFlammability(false);
    setPerishable(false);
    setPhotoPrint(null);
    setContainerID(0);
    fileInput.current.value = null;
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">New Box</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Box title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Choose container</label>
          <select
            className="form-select"
            value={containerID}
            onChange={(e) => setContainerID(e.target.value)}
          >
            <option value={0} disabled>
              Choose from list
            </option>
            {containers?.map((c) =>
              c.capacity - c.ocupation > 0 ? (
                <option key={c.id} value={c.id}>
                  {c.title} {c.ocupation}/{c.capacity} occupied
                </option>
              ) : null
            )}
          </select>
        </div>
        <div className="mb-3 d-flex flex-row gap-10">
          <div className="d-flex flex-column gap-5px align-items-center">
            <label className="form-check-label" htmlFor="checkBox1">
              Is perishable?
            </label>
            <input
              type="checkbox"
              className="form-check-input"
              id="checkBox1"
              value={perishable}
              onChange={(e) => setPerishable(!perishable)}
            />
          </div>
          <div className="d-flex flex-column gap-5px align-items-center">
            <label className="form-check-label" htmlFor="checkBox2">
              Is flamable?
            </label>
            <input
              type="checkbox"
              className="form-check-input"
              id="checkBox2"
              value={flammability}
              onChange={(e) => setFlammability(!flammability)}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Contents</label>
          <input
            ref={fileInput}
            type="file"
            className="form-control"
            onChange={doPhoto}
          />
        </div>
        {photoPrint ? (
          <div className="img-bin">
            <img src={photoPrint} alt="upload"></img>
          </div>
        ) : null}
        <button onClick={add} type="button" className="btn btn-outline-success">
          Add
        </button>
      </div>
    </div>
  );
}

export default Create;
