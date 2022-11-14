import { useContext } from "react";
import FirstContext from "../../Contexts/FirstContext";

function Line({ container }) {
  const { setModalData } = useContext(FirstContext);

  return (
    <li onClick={() => setModalData(container)} className="list-group-item">
      <div className="line__content">
        <div className="col-12 col-lg-3 margin-right-30px">
          <h5>Container ID: {container[0]}</h5>
          <h5>Container Size: {container[1][0].title}</h5>
          {/* {box.image ? (
            <img
              className="col-12"
              src={box.image}
              alt={`${box.title} crest`}
            ></img>
          ) : (
            <span className="no-image">No image</span>
          )} */}
        </div>
        <div className="col-12 col-lg-8 d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between">
          <div>
            <div>Container capacity: {container[1][0].capacity}</div>
            <div>Container current ocupation: {container[1][0].ocupation}</div>
            <div>Container left capacity: {container[1][0].left_capacity}</div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Line;
