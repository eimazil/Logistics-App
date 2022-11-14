import { useContext, useEffect, useState, useRef } from "react";
import SecondContext from "../../Contexts/SecondContext";
import getBase64 from "../../Functions/getBase64";
import DataContext from "../../Contexts/DataContext";

function Edit() {
  const [title, setTitle] = useState("");
  const [flammability, setFlammability] = useState(false);
  const [perishable, setPerishable] = useState(false);
  const [containerID, setContainerID] = useState(false);
  const [deletePhoto, setDeletePhoto] = useState(false);
  const fileInput = useRef();

  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const {
    setEditData,
    modalData,
    setModalData,
    containers,
    setChangeContainers,
  } = useContext(SecondContext);
  const { makeMsg } = useContext(DataContext);

  console.log(modalData?.container_id);

  const edit = () => {
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

    setEditData({
      title,
      flammability,
      perishable,
      container_id: parseInt(containerID),
      id: modalData.id,
      deletePhoto: deletePhoto ? 1 : 0,
      image: photoPrint,
    });
    setChangeContainers({
      remove_id: modalData.container_id,
      add_id: parseInt(containerID),
    });
    setModalData(null);
    setDeletePhoto(false);
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setTitle(modalData.title);
    setFlammability(modalData.flammability);
    setPerishable(modalData.perishable);
    setContainerID(modalData.container_id);
    setPhotoPrint(modalData.image);
    setDeletePhoto(false);
  }, [modalData]);

  if (null === modalData) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Box</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body"></div>
          <div className="card m-4">
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
                    checked={perishable}
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
                    checked={flammability}
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
                  <label htmlFor="image-delete">X</label>
                  <input
                    id="image-delete"
                    type="checkbox"
                    checked={deletePhoto}
                    onChange={() => setDeletePhoto((d) => !d)}
                  ></input>
                  <img src={photoPrint} alt="upload"></img>
                </div>
              ) : null}
              <button
                onClick={edit}
                type="button"
                className="btn btn-outline-success"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
