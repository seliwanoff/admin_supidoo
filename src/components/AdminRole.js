import axios from "axios";
import Loading from "./loading";
import mark from "../assets/images/bluesuccess.svg";
import { useState } from "react";

const AdminRole = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    props.setInterest();
  };
  const paymentterms = ["super", "normal"];
  const [selectedindex, setselectedindex] = useState(0);

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
              zIndex: "99999",
            }}
          >
            <div
              className="modal__content"
              style={{
                background: "#F6F6F6",
                padding: "8px 24px",
                zIndex: "999999",
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
                <h4>Admin Role</h4>
                <div className="modal_drop_down">
                  {paymentterms.map((item, index) => (
                    <div
                      className="each_item_list"
                      key={index}
                      onClick={() => {
                        props.setselecteditems(item);
                        setselectedindex(index);
                        props.setshow(false);
                      }}
                      style={{
                        background:
                          selectedindex === index && "rgb(244, 240, 255)",
                        margin: "4px",
                        borderRadius: "8px",
                      }}
                    >
                      <span>{item}</span>
                      {selectedindex === index && <img src={mark} alt="" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminRole;
