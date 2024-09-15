import axios from "axios";
import Loading from "./loading";

const Modal = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    props.setInterest();
  };
  return (
    <>
      {props.show && (
        <>
          <div
            className="wrapper"
            onClick={() => {
              props.setshow(false);
            }}
          >
            Modal
          </div>
          <div
            id="demo-modal"
            className="modal"
            style={{
              zIndex: "999",
            }}
          >
            <div className="modal__content">
              <div className="header-modal-content">
                <span
                  className="material-icons"
                  style={{ cursor: "pointer" }}
                  onClick={() => props.setshow(false)}
                >
                  close
                </span>
              </div>
              <div className="modal-body-top">
                <h4>Update {props.tag}</h4>
                <form action="" className="form-lg-sec" onSubmit={handleSubmit}>
                  <div className="each-form-lg-sect">
                    <div className="main-form-eeach-sec">
                      <span htmlFor="">Type</span>
                      <input
                        type="text"
                        name=""
                        id=""
                        value={props.type}
                        onChange={(e) => {
                          props.settype(e.target.value);
                        }}
                      />
                    </div>
                    <div className="main-form-eeach-sec">
                      <span htmlFor="">Interest</span>
                      <input
                        type="text"
                        name=""
                        id=""
                        value={props.interest}
                        onChange={(e) => {
                          props.setinterest(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <button
                    className="save-btn-changes"
                    disabled={props.loader}
                    style={{
                      background: props.loader === false && "rgb(111, 0, 255)",
                    }}
                  >
                    {props.loader ? <Loading /> : "Save Changes"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
