import { useContext } from "react";
import FirstContext from "../../Contexts/FirstContext";

function Modal() {
  const { modalData, setModalData } = useContext(FirstContext);

  console.log(modalData);

  // useEffect(() => {
  //   if (null === modalData) {
  //     return;
  //   }
  //   setTitle(modalData.title);
  //   setFlammability(modalData.flammability);
  //   setPerishable(modalData.perishable);
  //   setContainerID(modalData.container_id);
  //   setPhotoPrint(modalData.image);
  // }, [modalData]);
  if (null === modalData) {
    return null;
  }

  return (
    <div className="modal">
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
                <div key={b.box_id} className="line__content d-flex flex-row">
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
                    <div>
                      <div>Flamable: {b.flammability === 1 ? "Yes" : "No"}</div>
                      <div>Perishable: {b.perishable === 1 ? "Yes" : "No"}</div>
                      <div>Container ID: {b.container_id}</div>
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
