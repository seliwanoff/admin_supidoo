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
import LendingAgreement from "../components/lendingAgreement";
import SendAgreementHeader from "../components/SendAgreementHeader";
//import jsPDF from "jspdf";
const LenderAgreementContainer = () => {
  const handleDownload = () => {
    // alert();
    setisbtnclick(true);
    // Create a new jsPDF instance
  };
  const { state } = useLocation();
  // console.log(state);
  const [show, setmodal] = useState(false);
  const [show2, setmodal2] = useState(false);
  const [loader, setloader] = useState();
  const [reason, setreason] = useState("");
  const [success, setsucess] = useState(false);
  const [deletes, setdelete] = useState(false);
  const [message, setmessage] = useState("");
  const [selectedindex, setselectedindex] = useState(0);
  const [rejectloader, setrejectloader] = useState(false);
  const [isbtnclick, setisbtnclick] = useState(false);
  const navigate = useNavigate();
  // console.log(state);

  useEffect(() => {
    if (deletes || success) {
      var timeout = setTimeout(() => {
        setdelete(false);
        setsucess(false);
        navigate(`/finance/${state._id}`, {
          state: {
            ...state,
          },
        });
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });
  //  console.log(state);
  const acceptDocument = async () => {
    setloader(true);

    const data = {
      business: state.business?._id,
      financeType:
        state.customtype === "Credit Line" ? "CreditLine" : "TradeCredit",
      creditLine: state._id,
    };
    const datas = {
      business: state.business?._id,
      financeType:
        state.customtype === "Credit Line" ? "CreditLine" : "TradeCredit",
      tradeCredit: state._id,
    };
    const datass = {
      business: state.business?._id,
      financeType: "FinanceInvoice",
      financeInvoice: state._id,
    };
    await axios
      .post(
        `/v1/admin/sendAgreement`,
        state.customtype === "Credit Line"
          ? data
          : state.customtype === "Working Capital"
          ? datas
          : datass
      )
      .then((res) => {
        //  console.log(res);
        setmessage(res.data.message);
        setsucess(true);
        setdelete(false);
        setloader(false);
      })
      .catch((e) => {
        setmessage(
          e.response?.data.message ? e.response?.data.message : "An error occur"
        );
        setsucess(false);
        setdelete(true);
        setloader(false);
      });
  };

  return (
    <div className="">
      <SendAgreementHeader
        bill={"Review Request"}
        acceptDocument={acceptDocument}
        setloader={setloader}
        loader={loader}
        handleDownload={handleDownload}
      />

      <div
        className=""
        style={{
          display: "block",
        }}
      >
        <div className="choose_lg_mt">
          {success && (
            <div
              className="success"
              style={{
                maxWidth: "500px",
                width: "100%",
                margin: "0px auto ",
              }}
            >
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
                margin: "0px auto",
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
          <div className="lg_text_mg_nh">
            <h2>Send Lender’s Agreement</h2>
            <span>
              Customer will sign document before finance request is approved.
            </span>
          </div>
          <LendingAgreement
            data={state}
            isClick={isbtnclick}
            setisbtnclick={setisbtnclick}
          />
        </div>
      </div>
    </div>
  );
};

export default LenderAgreementContainer;
