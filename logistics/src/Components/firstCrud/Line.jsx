import { useContext, useEffect, useState } from "react";
import FirstContext from "../../Contexts/FirstContext";

function Line({ container }) {
  const { setModalData } = useContext(FirstContext);
  const [totalWeight, setTotalWeight] = useState("");

  console.log(container);

  useEffect(() => {
    let sum = 0;
    container[1].map((b) => (sum += b.weight));
    setTotalWeight(sum);
  }, [container]);

  return (
    <li onClick={() => setModalData(container)} className="list-group-item">
      <div className="line__content">
        <div className="col-12 col-lg-3 margin-right-30px">
          <h5>Container ID: {container[0]}</h5>
          <h5>Container Size: {container[1][0].title}</h5>
        </div>
        <div className="col-12 col-lg-8 d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between">
          <div className="d-flex flex-column gap-1">
            <span>Container capacity: {container[1][0].capacity}</span>
            <span>
              Container current ocupation: {container[1][0].ocupation}
            </span>
            <span>
              Container left capacity: {container[1][0].left_capacity}
            </span>
            <span>Total Weight: {totalWeight}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Line;
