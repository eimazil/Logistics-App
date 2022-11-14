import { useContext } from "react";
import ThirdContext from "../../Contexts/ThirdContext";
import Line from "./Line";

function List() {
  const { containers } = useContext(ThirdContext);

  return (
    <div className="card m-4">
      <h5 className="card-header">Containers list</h5>
      <div className="card-body">
        <ul className="list-group">
          {containers?.map((c) => (
            <Line key={c.id} container={c} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default List;
