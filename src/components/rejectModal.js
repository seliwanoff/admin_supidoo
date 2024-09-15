import { useEffect, useState } from "react";
import "../style/index.css";
import pick from "../assets/images/pick.svg";

import Modal from "react-modal";
import Loading from "./loading";

const RejectModal = (props) => {
  const [show, setshow] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(-1);
  const [selectedReason, setselectedReason] = useState("");
  const [isdisabled, setisdisabled] = useState(true);
  //console.log(props.loader);
  const closeModal = () => {
    props.setmodal(false);
  };
  useEffect(() => {
    if (selectedReason !== "") {
      setisdisabled(false);
    } else {
      setisdisabled(true);
    }
  }, [selectedReason]);
  const reasons = [
    "Document is blurry",
    "Document number is not visible",
    "Incorrect document",
    "Name is not visible",
  ];
  const customStyles = {
    content: {
      //  top: "50%",
      // inset: "50% ",
      //  left: "50%",
      //  right: "auto",
      //  bottom: "auto",
      // marginRight: "-50%",
      // transform: "translate(-50%, -50%)",
      position: "relative",
    },
  };

  return (
    <>
      <div>
        <Modal
          isOpen={props.show}
          ariaHideApp={false}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <span className="material-icons" onClick={closeModal}>
            close
          </span>
          <form className="form_w_gl">
            <h3 className="reaseon_gl">Give reasons for rejection</h3>
            <div className="form_lg_hj">
              <input
                name=""
                id=""
                className="select_option"
                placeholder="Pick reason"
                readOnly
                value={selectedReason}
                onClick={() => {
                  setshow(true);
                }}
              />
              <div className="or_cl">OR</div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="textarea_message_info"
                placeholder="Enter reason"
                onChange={(e) => {
                  setselectedReason(e.target.value);
                  props.setreason(e.target.value);
                }}
              ></textarea>
            </div>
            <button
              className="btn-submit"
              type="button"
              onClick={() => props.rejectHandler()}
              style={{
                background: isdisabled === false ? "#6F00FF" : "#ebe4ff",
                color: isdisabled === false ? "#fff" : "#bfa6ff",
                padding: "16px 24px 16px 24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              disabled={isdisabled}
            >
              {props.loader ? <Loading /> : "SEND"}
            </button>
          </form>
        </Modal>
        {show === true && (
          <Modal
            ariaHideApp={false}
            isOpen={show}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <span
              className="material-icons"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setshow(false);
              }}
            >
              arrow_back
            </span>
            <div className="form_w_gl">
              <h3 className="reaseon_gl">Pick a reason</h3>
              <div className="reason_each_mg_lf">
                {reasons.map((reason, index) => (
                  <div
                    className="reason_mian"
                    style={{
                      background: selectedIndex === index ? "#F4F0FF" : "",
                    }}
                    key={index}
                    onClick={() => {
                      setselectedReason(reason);
                      props.setreason(reason);
                      setselectedIndex(index);
                      setshow(false);
                    }}
                  >
                    {reason}
                    {selectedIndex === index && (
                      <>
                        <img src={pick} alt="" />
                      </>
                    )}{" "}
                  </div>
                ))}{" "}
              </div>
            </div>
          </Modal>
        )}{" "}
      </div>
    </>
  );
};

export default RejectModal;
