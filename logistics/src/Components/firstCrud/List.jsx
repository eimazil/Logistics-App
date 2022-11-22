import { useContext } from "react";
import FirstContext from "../../Contexts/FirstContext";
import Line from "./Line";

function List() {
  const { containers } = useContext(FirstContext);

  return (
    <div className="card m-4">
      <h5 className="card-header">Containers list</h5>
      <div className="card-body">
        <ul className="list-group">
          {containers?.map((c, i) => (
            <Line key={c[1][0].id} container={c} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default List;
