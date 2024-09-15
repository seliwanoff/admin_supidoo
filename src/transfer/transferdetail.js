// import {useNavigate} from "react-router";
// import {useEffect} from "react";
// import axios from "axios";
import OtherHeader from "../components/otherheader";
import user from "../assets/images/iconuserverify.svg";
import US from "../assets/images/EU.svg";
import NGN from "../assets/images/ngnnigeria.jpg";
import EU from "../assets/images/usds.svg";
import document from "../assets/images/document-text.svg";
import loader from "../assets/images/load.svg";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import empty from "../assets/images/emptyadmin.svg";
import axios from "axios";
import factoring from "../assets/images/factoring.svg";
import emptywoman from "../assets/images/emptywoamn.svg";
import dot from "../assets/images/dotss.svg";
import checkbox from "../assets/images/marksuccess.svg";
import rejectimg from "../assets/images/cancelsuccess.svg";
import { ProgressBar } from "react-loader-spinner";
import deactivae from "../assets/images/deactivate.svg";
import currencyPairCheck from "../components/logoCurrency";
import AmountCheck from "../components/amountcheck";

const TransferDetails = () => {
  // const [users, setuser] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [tab, settab] = useState(localStorage.getItem("tab"));
  const [selectedstatusindex, setselectedstatusIndex] = useState(0);
  const [transaction, settransaction] = useState([]);
  const [selectedstatus, setselectedstatus] = useState();
  const [buyers] = useState([]);
  const [seller] = useState([]);
  const [success, setsucess] = useState(false);
  const [deletes, setdelete] = useState(false);
  const { id } = useParams();
  const [businessstatus, setbusinessstatus] = useState(state.status);
  const [wallets, setwallet] = useState([]);
  const [selectedwalletindex, setselectedwalletindex] = useState(0);
  const [isDrop, setisDrop] = useState(false);
  const [allbusiness, setallbusiness] = useState([]);
  const [hideprogressbar, sethideprogressbar] = useState(false);
  const [message, setmessage] = useState("");
  const [urladdress, setaddressurl] = useState("");

  useEffect(() => {
    if (success) {
      var timeout = setTimeout(() => {
        setsucess(false);
        //window.location.reload();
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });
  useEffect(() => {
    if (deletes) {
      var timeout = setTimeout(() => {
        setdelete(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });
  // console.log(state);

  useEffect(() => {
    const getBusinessDetails = async () => {
      await axios
        .get(`/v1/admin/transaction/get_single_transfer_request/${state._id}`)
        .then((res) => {
          console.log(res);
          setbusinessstatus(res.data.data?.status);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getBusinessDetails();
  }, [id]);
  const verifyBusiness = async () => {
    sethideprogressbar(true);

    await axios
      .post(`/v1/admin/transaction/approve_transfer_request/${state._id}`)
      .then((res) => {
        //  console.log(res);
        setsucess(true);
        setdelete(false);
        setmessage(res.data.message);
        sethideprogressbar(false);
        axios
          .get(`/v1/admin/transaction/get_single_transfer_request/${state._id}`)
          .then((res) => {
            //console.log(res)
            setbusinessstatus(res.data.data?.status);
          });
      })
      .catch((e) => {
        console.log(e);
        setsucess(false);
        setdelete(true);
        setmessage(e.response.data.message);
        sethideprogressbar(false);
      });
  };
  const RejectRequest = async () => {
    sethideprogressbar(true);

    await axios
      .post(`/v1/admin/transaction/reject_transfer_request/${state._id}`)
      .then((res) => {
        //  console.log(res);
        setsucess(true);
        setdelete(false);
        setmessage(res.data.message);
        sethideprogressbar(false);
        axios
          .get(`/v1/admin/transaction/get_single_transfer_request/${state._id}`)
          .then((res) => {
            //console.log(res)
            setbusinessstatus(res.data.data?.status);
          });
      })
      .catch((e) => {
        console.log(e);
        setsucess(false);
        setdelete(true);
        setmessage(e.response.data.message);
        sethideprogressbar(false);
      });
  };

  // console.log(state)

  const filtertransaction = transaction.filter((countrycodelists) =>
    countrycodelists.status.match(selectedstatus)
  );
  //const trasnactionstatus = ["", "pending", "success", "declined"];

  return (
    <>
      <div
        className="main"
        style={{
          position: "relative",
        }}
      >
        <OtherHeader
          title={"BACK TO TRANSACTION"}
          arrow={"keyboard_backspace"}
        />

        <div className="info-cl">
          <div className="overview">
            <h4
              style={{
                margin: "0px",
                padding: "0px",
                fontWeight: "500",
              }}
            >
              Transfer Request Details
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "30px",
            }}
          >
            <div
              className="main-info-con-rights"
              style={{
                padding: "0px",
                minHeight: "100%",
                position: "relative",
              }}
            >
              {success && (
                <div
                  className="success"
                  style={{ width: "100%", boxSizing: "border-box" }}
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
                    width: "100%",
                    boxSizing: "border-box",
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
                          fontSize: "14px",
                        }}
                      >
                        {message}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="top_head_cl" style={{ padding: "24px" }}>
                <div className="ip_v_lg">
                  <div
                    className="profile-d-icon"
                    style={{
                      height: "48px",
                      width: "48px",
                    }}
                  >
                    {state?.business?.name?.slice(0, 2)}
                  </div>
                  <div className="name-avater-tag" style={{ gap: "8px" }}>
                    <span
                      style={{
                        color: "#101828",
                        fontWeight: "500",
                        fontSize: "20px",
                        lineHeight: "24px",
                      }}
                    >
                      {state?.business?.name}
                    </span>
                    <span className="business_name">
                      {state?.firstName} {state?.lastName}
                    </span>
                  </div>
                </div>
                <div
                  className="status_user"
                  style={{
                    color: state.status === "Success" && "#12B76A",
                    textTransform: "uppercase",
                  }}
                >
                  {businessstatus === "Success" ? "Completed" : businessstatus}
                </div>
              </div>

              {businessstatus === "Pending" && (
                <div
                  className="verify_account"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                  }}
                >
                  <div
                    className="user_verify"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => verifyBusiness()}
                  >
                    <img src={user} alt="" />
                    Accept Request
                  </div>
                  <div
                    className="user_verify"
                    style={{
                      cursor: "pointer",
                      color: "#F04438",
                    }}
                    onClick={RejectRequest}
                  >
                    <img src={deactivae} alt="" />
                    Reject Request
                  </div>
                </div>
              )}
              {hideprogressbar && (
                <ProgressBar
                  height="40"
                  width=""
                  ariaLabel="progress-bar-loading"
                  wrapperClass="progress-bar-wrapper"
                  borderColor="#6f00ff"
                  barColor="#6f00ff"
                />
              )}

              <div style={{ marginTop: "-20px" }} className="details-d_tl">
                <div className="md-details-col">
                  <div className="details_cl_tl">Transfer Request Details</div>
                  <div
                    className="each_details_tl"
                    style={{
                      borderBottom: "1px solid #E7E9FB",
                      paddingBottom: "30px",
                    }}
                  >
                    <div className="each_main_tl">
                      <div className="each_d_lt">Recipient Receive</div>
                      <span className="d-lt-a">
                        {" "}
                        {currencyPairCheck(state.currency)}
                        {AmountCheck(state?.amount)}
                      </span>
                    </div>
                    <div className="each_main_tl">
                      <div className="each_d_lt">Fee</div>
                      <span className="d-lt-a">
                        {/** {state?.currency === "NGN"
                                  ? "₦"
                                  : state?.currency === "USD"
                                  ? "$"
                                  : state?.currency === "EUR"
                                  ? "€"
                                  : "£"} */}
                        {currencyPairCheck(state.currency)}
                        {AmountCheck(5)}
                      </span>
                    </div>

                    <div className="each_main_tl">
                      <div className="each_d_lt">Time</div>
                      <span className="d-lt-a">
                        {new Date(state?.createdAt).toDateString()}{" "}
                        {new Date(state?.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="each_main_tl">
                      <div className="each_d_lt">Reference</div>
                      <span className="d-lt-a">{state?._id}</span>
                    </div>
                  </div>
                  <div
                    className="each_details_tl"
                    style={{ paddingBottom: "30px" }}
                  >
                    <div className="details_cl_tl">Recipient Details</div>

                    <div className="each_main_tl">
                      <div className="each_d_lt">Name</div>
                      <span className="d-lt-a">{state?.AccountName}</span>
                    </div>
                    <div className="each_main_tl">
                      <div className="each_d_lt">Bank Name</div>
                      <span className="d-lt-a">{state?.BankName}</span>
                    </div>
                    {state?.AccountNumber && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Account Number</div>
                        <span className="d-lt-a">{state.AccountNumber} </span>
                      </div>
                    )}
                    {state.currency === "USD" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Routing Number</div>
                        <span className="d-lt-a">{state.RoutingNumber} </span>
                      </div>
                    )}

                    {state.currency === "GBP" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Sort Code</div>
                        <span className="d-lt-a">{state.SortCode} </span>
                      </div>
                    )}
                    {state.currency === "EUR" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">IBAN</div>
                        <span className="d-lt-a">{state.IBAN} </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-right-col-cf">
              <ul className="tp-head-list">
                <li
                  onClick={() => {
                    localStorage.setItem("tab", "transaction");
                    settab("transaction");
                  }}
                  style={{
                    borderBottom:
                      tab === "transaction" ? "3px solid #6F00FF" : "",
                  }}
                >
                  History
                </li>
                {/**
                <li
                  onClick={() => {
                    localStorage.setItem("tab", "buyers");

                    settab("buyers");
                  }}
                  style={{
                    borderBottom: tab === "buyers" ? "3px solid #6F00FF" : "",
                  }}
                >
                  Partners
                </li>
                {/**
                <li
                  onClick={() => {
                    localStorage.setItem("tab", "seller");

                    settab("seller");
                  }}
                  style={{
                    borderBottom: tab === "seller" ? "3px solid #6F00FF" : "",
                  }}
                >
                  Sellers
                </li>

                <li
                  onClick={() => {
                    if (
                      businessstatus === "PROCESSING" ||
                      businessstatus === "APPROVED"
                    ) {
                      localStorage.setItem("tab", "kyc");

                      settab("kyc");
                    } else {
                      setmessage("Pls change business status to processing");
                      setdelete(true);
                    }
                  }}
                  style={{
                    borderBottom: tab === "kyc" ? "3px solid #6F00FF" : "",
                  }}
                >
                  KYC
                </li>
                */}
              </ul>
              <div className="main_tp_lig">
                {tab === "transaction" && (
                  <>
                    {filtertransaction.length === 0 && (
                      <div className="emtty_transact">
                        <img src={empty} alt="" />
                        <div className="empty_info">
                          <h4>No transction yet</h4>
                          <div>This account hs no recent transaction.</div>
                        </div>
                      </div>
                    )}
                    {filtertransaction.length >= 1 &&
                      transaction?.map((res, index) => (
                        <div className="main-lg-request" key={index}>
                          <div className="each-request">
                            <div className="img-name">
                              <img src={factoring} alt="" />
                              <div
                                className="mytag-lg"
                                style={{
                                  gap: "0px",
                                }}
                              >
                                <div className="head-tg">
                                  {res?.name
                                    ? res.name
                                    : res.accountName
                                    ? res.accountName
                                    : res.narration}
                                </div>
                                <span
                                  className="small-tg"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  {res.TransactionType}
                                  <span
                                    className={"status_p"}
                                    style={{
                                      color:
                                        res.status === "Success"
                                          ? "green"
                                          : res.status === "Pending"
                                          ? "#f79009"
                                          : "crimson",
                                    }}
                                  >
                                    <img src={dot} alt="" /> {res.status}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="mytag-lg">
                              <div
                                className="head-tg"
                                style={{
                                  color: "#344054",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  lineHeight: "19.6px",
                                  textAlign: "right",
                                }}
                              >
                                {currencyPairCheck(res.currency)}
                                {AmountCheck(res.amount)}{" "}
                              </div>
                              <span
                                className="small-tg"
                                style={{ textAlign: "right" }}
                              >
                                {new Date(res.createdAt).toDateString()}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}{" "}
                  </>
                )}
                {tab === "buyers" && (
                  <>
                    {" "}
                    {buyers.length === 0 && (
                      <div className="emtty_transact">
                        <img src={emptywoman} alt="" />
                        <div
                          className="empty_info"
                          style={{ maxWidth: "311px" }}
                        >
                          <h4>Account doesn’t have any buyers yet</h4>
                          <div>
                            You’ll see buyers that this account has added to
                            their business here.
                          </div>
                        </div>
                      </div>
                    )}
                    {buyers.length >= 1 &&
                      buyers?.map((res, index) => (
                        <div className="main-lg-request" key={index}>
                          <div className="each-request">
                            <div className="img-name">
                              <img src={factoring} alt="" />
                              <div className="mytag-lg">
                                <div className="head-tg">
                                  {res.business.name}
                                </div>
                                <span
                                  className="small-tg"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  {res.TransactionType}
                                  <span
                                    className={"status_p"}
                                    style={{
                                      color:
                                        res.status === "success"
                                          ? "green"
                                          : res.status === "Pending"
                                          ? "#f79009"
                                          : "crimson",
                                    }}
                                  >
                                    <img src={dot} alt="" /> {res.status}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="mytag-lg">
                              <div
                                className="head-tg"
                                style={{
                                  color: "#667085",

                                  fontSize: "14px",
                                  fontWeight: "600",
                                  lineHeight: "19.6px",
                                  textAlign: "right",
                                  textTransform: "capitalize",
                                }}
                              >
                                3 orders
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}{" "}
                  </>
                )}
                {tab === "seller" && (
                  <>
                    {" "}
                    {seller.length === 0 && (
                      <div className="emtty_transact">
                        <img src={emptywoman} alt="" />
                        <div
                          className="empty_info"
                          style={{ maxWidth: "311px" }}
                        >
                          <h4>Account doesn’t have any seller yet</h4>
                          <div>
                            You’ll see sellers that this account has added to
                            their business here.
                          </div>
                        </div>
                      </div>
                    )}
                    {seller.length >= 1 &&
                      seller?.map((res, index) => (
                        <div className="main-lg-request" key={index}>
                          <div className="each-request">
                            <div className="img-name">
                              <img src={factoring} alt="" />
                              <div className="mytag-lg">
                                <div className="head-tg">
                                  {res.business.name}
                                </div>
                                <span
                                  className="small-tg"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  {res.TransactionType}
                                  <span
                                    className={"status_p"}
                                    style={{
                                      color:
                                        res.status === "success"
                                          ? "green"
                                          : res.status === "Pending"
                                          ? "#f79009"
                                          : "crimson",
                                    }}
                                  >
                                    <img src={dot} alt="" /> {res.status}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="mytag-lg">
                              <div
                                className="head-tg"
                                style={{
                                  color: "#667085",

                                  fontSize: "14px",
                                  fontWeight: "600",
                                  lineHeight: "19.6px",
                                  textAlign: "right",
                                  textTransform: "capitalize",
                                }}
                              >
                                3 orders
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}{" "}
                  </>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferDetails;
