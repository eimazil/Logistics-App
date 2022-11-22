import { useContext } from "react";
import FirstContext from "../../Contexts/FirstContext";

function Modal() {
  const { modalData, setModalData } = useContext(FirstContext);
  if (null === modalData) {
    return null;
  }

  return (
    <div className="modal">
      <div onClick={() => setModalData(null)} className="modal-overlay"></div>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Container Contents</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body">
            {modalData[1].map((b) => {
              return (
                <div
                  key={b.box_id}
                  className="line__content d-flex flex-row gap-2"
                >
                  <div className="col-3 col-sm-4 col-lg-5 margin-right-30px">
                    <h5>{b.box_title}</h5>
                    {b.image ? (
                      <img
                        className="col-12"
                        src={b.image}
                        alt={`${b.title}`}
                      ></img>
                    ) : (
                      <span className="no-image">No image</span>
                    )}
                  </div>
                  <div className="col-7 col-sm-7 col-lg-6 d-flex flex-colum align-items-center">
                    <div className="d-flex flex-column gap-1">
                      <span>Weight: {b.weight} kg</span>
                      <span>
                        Flamable: {b.flammability === 1 ? "Yes" : "No"}
                      </span>
                      <span>
                        Perishable: {b.perishable === 1 ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
