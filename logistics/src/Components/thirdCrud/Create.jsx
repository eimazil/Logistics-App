import { useState, useContext, useEffect } from "react";
import DataContext from "../../Contexts/DataContext";
import ThirdContext from "../../Contexts/ThirdContext";
import capacities from "../../data/capacity";
import { v4 as uuidv4 } from "uuid";

function Create() {
  const [capacity, setCapacity] = useState(0);
  const [title, setTitle] = useState("");

  const { setCreateData } = useContext(ThirdContext);
  const { makeMsg } = useContext(DataContext);

  const add = () => {
    if (capacity === null) {
      makeMsg("Choose container capacity", "error");
      return;
    }
    setCreateData({
      // id_number: title + "-" + uuidv4(),
      title: title,
      capacity: parseInt(capacity),
      left_capacity: parseInt(capacity),
    });
    setTitle("");
    setCapacity(0);
  };

  useEffect(() => {
    if (capacity === 2) {
      setTitle("S");
    }
    if (capacity === 4) {
      setTitle("M");
    }
    if (capacity === 6) {
      setTitle("L");
    }
  }, [capacity]);

  return (
    <div className="card m-4">
      <h5 className="card-header">New Container</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Choose capacity</label>
          <select
            className="form-select"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          >
            <option value={0} disabled>
              Choose from list
            </option>
            {capacities.map((t) => (
              <option key={t.id} value={t.c}>
                {t.s} - {t.c} boxes
              </option>
            ))}
          </select>
        </div>
        <button onClick={add} type="button" className="btn btn-outline-success">
          Add
        </button>
      </div>
    </div>
  );
}

export default Create;
