import axios from "axios";
import Loading from "./loading";
import AdminRole from "./AdminRole";
import { useState } from "react";

const AddAdminModal = (props) => {
  const [show, setshow] = useState(false);
  const [selecteditems, setselecteditems] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setInterest(selecteditems);

    // props.setinterest(selecteditems)
  };
  return (
    <>
      <AdminRole
        show={show}
        setshow={setshow}
        selecteditems={selecteditems}
        setselecteditems={setselecteditems}
      />
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
            <div
              className="modal__content"
              style={{
                background: "#F6F6F6",
              }}
            >
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
                <h4>Add new member</h4>
                <form action="" className="form-lg-sec" onSubmit={handleSubmit}>
                  <div className="each-form-lg-sect">
                    <div
                      className="main-form-eeach-sec"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="text"
                        name=""
                        id=""
                        value={props.firstname}
                        onChange={(e) => {
                          props.setfirstname(e.target.value);
                        }}
                        placeholder="First name"
                      />
                    </div>
                    <div
                      className="main-form-eeach-sec"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="text"
                        name=""
                        id=""
                        value={props.lastname}
                        onChange={(e) => {
                          props.setlastname(e.target.value);
                        }}
                        placeholder="Last name"
                      />
                    </div>
                    <div
                      className="main-form-eeach-sec"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="email"
                        name=""
                        id=""
                        value={props.email}
                        onChange={(e) => {
                          props.setemail(e.target.value);
                        }}
                        placeholder="Email Address"
                      />
                    </div>
                    <div
                      className="main-form-eeach-sec"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="tel"
                        name=""
                        id=""
                        value={props.phone}
                        onChange={(e) => {
                          props.setphone(e.target.value);
                        }}
                        placeholder="Phone"
                      />
                    </div>
                    <div
                      className="main-form-eeach-sec"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="password"
                        name=""
                        id=""
                        value={props.password}
                        onChange={(e) => {
                          props.setpassword(e.target.value);
                        }}
                        placeholder="Password"
                      />
                    </div>
                    <div
                      className="main-form-eeach-sec"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      onClick={() => setshow(true)}
                    >
                      <input
                        type="text"
                        name=""
                        id=""
                        value={selecteditems}
                        placeholder="Select admin role"
                        readOnly
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
                    {props.loader ? <Loading /> : "Add Member"}
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

export default AddAdminModal;
