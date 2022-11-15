import { useContext } from "react";
import SecondContext from "../../Contexts/SecondContext";

function Line({ box }) {
  const { setDeleteData, setModalData } = useContext(SecondContext);

  return (
    <li className="list-group-item">
      <div className="line__content">
        <div className="col-12 col-lg-3 margin-right-30px">
          <h5>{box.title}</h5>
          {box.image ? (
            <img
              className="col-12"
              src={box.image}
              alt={`${box.title} crest`}
            ></img>
          ) : (
            <span className="no-image">No image</span>
          )}
        </div>
        <div className="col-12 col-lg-8 d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between">
          <div>
            <div>Flamable: {box.flammability === 1 ? "Yes" : "No"}</div>
            <div>Perishable: {box.perishable === 1 ? "Yes" : "No"}</div>
            <div>Container ID: {box.container_id}</div>
          </div>
          <div className="d-flex flex-row flex-lg-column gap-2 ">
            <button
              onClick={() => setModalData(box)}
              type="button"
              className="btn btn-outline-warning"
            >
              Edit
            </button>
            <button
              onClick={() => setDeleteData(box)}
              type="button"
              className="btn btn-outline-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Line;
