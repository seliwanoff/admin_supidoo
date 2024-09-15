import { useLocation, useNavigate } from "react-router";
import HeaderAccept from "../components/headersAccept";
import RejectModal from "../components/rejectModal";
import { useState } from "react";
import PasswordModal from "../components/passwordModal";
import axios from "axios";
import { useEffect } from "react";
import SerHeader from "../components/SerHeader";
import proposed from "../assets/images/proposedorder.svg";
import check from "../assets/images/proposedcjeck.svg";
import currencyPairCheck from "../components/logoCurrency";
const ReviewDocuments = () => {
  const { state } = useLocation();
  console.log(state);
  const [show, setmodal] = useState(false);
  const [show2, setmodal2] = useState(false);
  const [loader, setloader] = useState();
  const [reason, setreason] = useState("");
  const [success, setsucess] = useState(false);
  const [deletes, setdelete] = useState(false);
  const [message, setmessage] = useState("");
  const [selectedindex, setselectedindex] = useState(0);
  const [rejectloader, setrejectloader] = useState(false);
  const navigate = useNavigate();
  const dataPlug = [
    {
      title: "Approve Initial Amount",
      subject: `Send a lender agreement for the requested  ${currencyPairCheck(
        state.currency
      )}${parseFloat(state.requestedAmount).toLocaleString()}`,
    },
    {
      title: "Propose Adjusted Offer",
      subject: "Recommend a new amount and agreement.",
    },
  ];
  const getToNextDocumentPage = async () => {
    if (selectedindex === 0) {
      navigate("/lender/agreement", {
        state: {
          ...state,
        },
      });
    } else {
      navigate("/finance/changeterm", {
        state: {
          ...state,
          change: true,
        },
      });
    }
  };
  useEffect(() => {
    if (deletes || success) {
      var timeout = setTimeout(() => {
        setdelete(false);
        setsucess(false);
        navigate(-1);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div className="">
      <SerHeader header={"Review Request"} />

      <div
        className="main_bd_lg"
        style={{
          display: "block",
        }}
      >
        {success && (
          <div className="success">
            <div className="lg-success">
              <div className="ech-lg-hm">
                <div className="main-sucees">Success</div>
                <span
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {message}
                </span>
              </div>
            </div>
          </div>
        )}

        {deletes && (
          <div
            className="success"
            style={{
              background: "#FCFCFD",
              border: " 1px solid #D0D5DD",
            }}
          >
            <div className="lg-success">
              <div
                className="ech-lg-hm"
                style={{
                  background: "#F9FAFB",
                }}
              >
                <div
                  className="main-sucees"
                  style={{
                    color: "#344054",
                  }}
                >
                  Failed
                </div>
                <span
                  style={{
                    color: "#344054",
                  }}
                >
                  {message}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="choose_lg_mt">
          <div className="lg_text_mg_nh">
            <h2>Choose funding decision</h2>
            <span>
              Select how to proceed with this request and send an agreement.
            </span>
          </div>
          <div className="proposed_lg_container">
            <div
              className="top_proposed_lg_bg"
              style={{
                padding: "4px",
              }}
            >
              {dataPlug?.map((item, index) => (
                <div
                  className="each_lg_proposed"
                  style={{
                    background: selectedindex === index ? "#F4F0FF" : "",
                    borderRadius: selectedindex === index ? "8px" : "",
                    position: "relative",
                    display:
                      state.customtype === "Factoring" && index === 0
                        ? "none"
                        : "",
                  }}
                  key={index}
                  onClick={() => {
                    setselectedindex(index);
                  }}
                >
                  <img src={proposed} alt="" />
                  <div className="text_proposed_lg">
                    <span className="lg_propsed_aproved">{item.title}</span>
                    <span className="main_text_lg_hn">{item.subject}</span>
                  </div>
                  {selectedindex === index ? (
                    <img
                      src={check}
                      alt=""
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "20px",
                      }}
                    />
                  ) : (
                    " "
                  )}
                </div>
              ))}
            </div>
            <button className="btn-lg-bgg" onClick={getToNextDocumentPage}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDocuments;
