import { useContext } from "react";
import ThirdContext from "../../Contexts/ThirdContext";

function Line({ container }) {
  const { setDeleteData } = useContext(ThirdContext);

  return (
    <li className="list-group-item">
      <div className="line">
        <div className="line__content d-flex flex-column">
          <div>Container ID:{container.id}</div>
          <div className="">Size:{container.title}</div>
          <div className="">Capacity:{container.capacity} boxes</div>
        </div>
        <div className="line__buttons">
          <button
            onClick={() => setDeleteData(container)}
            type="button"
            className="btn btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default Line;
