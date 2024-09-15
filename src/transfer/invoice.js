// import {useNavigate} from "react-router";
// import {useEffect} from "react";
// import axios from "axios";
import OtherHeader from "../components/otherheader";
import user from "../assets/images/markiconstr.svg";
import document from "../assets/images/document-text.svg";
import loader from "../assets/images/load.svg";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import empty from "../assets/images/emptyadmin.svg";
import axios, { all } from "axios";
import sendfunds from "../assets/images/sendfunds.svg";
import rejectimg from "../assets/images/cancelsuccess.svg";
import checkbox from "../assets/images/marksuccess.svg";
import Loading from "../components/loading";
import factoring from "../assets/images/factoring.svg";

const InvoiceFlexPayDetails = () => {
  // const [users, setuser] = useState([]);
  const { state } = useLocation();
  // console.log(state)
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, settab] = useState("bank");
  const [loans, setLoans] = useState([]);

  const [allbusiness, setallbusiness] = useState([]);
  const [loader, setloader] = useState(false);
  const [success, setsucess] = useState(false);
  const [fail, setfail] = useState(false);
  const [message, setmessage] = useState("");
  const [idloan, setidloan] = useState("");

  useEffect(() => {
    if (fail) {
      let timer = setTimeout(() => {
        setfail(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [fail]);
  useEffect(() => {
    if (success) {
      let timer = setTimeout(() => {
        setsucess(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [success]);
  useEffect(() => {
    const fetchLoanDetails = async () => {
      await axios
        .get(
          `/v1/admin/loan/finance/${state._id}?financeType=${
            state.customtype === "Working Capital"
              ? "TradeCredit"
              : state.customtype === "Credit Line"
              ? "CreditLine"
              : "FinanceInvoice"
          }`
        )
        .then((res) => {
          // console.log(res)
          setLoans(res.data.data?.loans);
          setidloan(res.data.data?._id);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchLoanDetails();
  }, []);
  const filterloan = loans?.filter((item) =>
    item?.paymentStatus?.match("UNPAID")
  );

  const filterloanrepaid = loans?.filter((item) =>
    item?.paymentStatus?.match("REPAID")
  );
  let firstloan = filterloan?.filter((item, index) => {
    return index === 0;
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      if (state.customtype === "Working Capital") {
        await axios
          .get(`/v1/admin/get-single-finance-trade-credit/${state._id}`)
          .then((res) => {
            // console.log(res)
            setallbusiness(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (state.customtype === "Credit Line") {
        await axios
          .get(`/v1/admin/get-single-finance-credit-line/${state._id}`)
          .then((res) => {
            //  console.log(res)
            setallbusiness(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        await axios
          .get(`/v1/admin/flex/get-invoice/${id}`)
          .then((res) => {
            console.log(res);
            setallbusiness(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };

    fetchTransaction();
  }, [state.customtype, state._id]);

  const startVerification = async (value) => {
    if (state.customtype === "Factoring") {
      const data = {
        status: value,
      };
      await axios
        .put(`/v1/admin/changeFinanceInvoiceStatus/${id}`, data)
        .then((res) => {
          if (state.customtype === "Working Capital") {
            axios
              .get(`/v1/admin/get-single-finance-trade-credit/${state._id}`)
              .then((res) => {
                setallbusiness(res.data.data);
              })
              .catch((e) => {
                console.log(e);
              });
          } else if (state.customtype === "Credit Line") {
            axios
              .get(`/v1/admin/get-single-finance-credit-line/${state._id}`)
              .then((res) => {
                //  console.log(res)
                setallbusiness(res.data.data);
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            axios
              .get(`/v1/admin/get-single-finance-invoice/${state._id}`)
              .then((res) => {
                // console.log(res)
                setallbusiness(res.data.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (state.customtype === "Working Capital") {
      const data = {
        status: value,
      };
      await axios
        .put(`/v1/admin/changeFinanceTradeCreditStatus/${id}`, data)
        .then(() => {
          axios
            .get(`/v1/admin/get-single-finance-trade-credit/${state._id}`)
            .then((res) => {
              setallbusiness(res.data.data);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (state.customtype === "Credit Line") {
      const data = {
        status: value,
      };
      await axios
        .put(`/v1/admin/changeFinanceCreditLineStatus/${id}`, data)
        .then((res) => {
          axios
            .get(`/v1/admin/get-single-finance-credit-line/${state._id}`)
            .then((res) => {
              //console.log(res)
              setallbusiness(res.data.data);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const RepayNow = async () => {
    setloader(true);
    await axios
      .post(`/v1/admin/loan/repay/${idloan}/${firstloan[0]?._id}`)
      .then((res) => {
        setsucess(true);
        setfail(false);
        setmessage(res.data.message);
        axios
          .get(
            `/v1/admin/loan/finance/${state._id}?financeType=${
              state.customtype === "Working Capital"
                ? "TradeCredit"
                : state.customtype === "Credit Line"
                ? "CreditLine"
                : "FinanceInvoice"
            }`
          )
          .then((res) => {
            setLoans(res.data.data?.loans);
          });
        setloader(false);
      })
      .catch((e) => {
        setsucess(false);
        setfail(true);
        setmessage(
          e.response?.data.message ? e.response?.data.message : "An error occur"
        );
        setloader(false);
      });
  };

  return (
    <>
      <div className="main">
        <OtherHeader title={"BACK TO PAY"} arrow={"keyboard_backspace"} />

        <div className="info-cl">
          <div className="overview">
            <h4
              style={{
                margin: "0px",
                padding: "0px",
              }}
            >
              Request details
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
                minHeight: "790px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {fail && (
                <div
                  className="success"
                  style={{
                    background: "#FCFCFD",
                    border: " 1px solid #D0D5DD",

                    boxSizing: "border-box",
                    zIndex: "9999",
                    width: "100%",
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
                          textAlign: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        Access Denied
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
                      {state?.business?.name}{" "}
                    </span>
                    <span className="business_name">
                      {allbusiness?.firstName} {allbusiness?.business?.lastName}
                    </span>
                  </div>
                </div>
                <div
                  className="status_user"
                  style={{
                    color:
                      allbusiness.status === "APPROVED"
                        ? "#12b76a"
                        : allbusiness?.status === "COMPLETED"
                        ? "#12b76a"
                        : "",
                  }}
                >
                  {allbusiness.status}
                </div>
              </div>
              <div
                className="verify_account"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {allbusiness.status === "SUBMITTED" && (
                  <div
                    className="user_verify"
                    style={{
                      width: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => startVerification("PROCESSING")}
                  >
                    <img src={user} alt="" />
                    Start Verfication
                  </div>
                )}
                {allbusiness.status === "PROCESSING" && (
                  <div
                    className="user_verify"
                    style={{
                      width: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => startVerification("APPROVED")}
                  >
                    <img src={user} alt="" />
                    Approve Request
                  </div>
                )}
                {allbusiness.status === "REJECTED" && (
                  <div
                    className="user_verify"
                    style={{
                      width: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => startVerification("PROCESSING")}
                  >
                    <img src={user} alt="" />
                    Approve Request
                  </div>
                )}
                {allbusiness.status === "APPROVED" && (
                  <div
                    className="user_verify"
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      color: "crimson",
                    }}
                    onClick={() => startVerification("REJECTED")}
                  >
                    Reject Request
                  </div>
                )}
                {allbusiness?.status !== "COMPLETED" && (
                  <>
                    <div
                      className="user_verify"
                      style={{
                        width: "100%",
                        color: "#98A2B3",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/finance/fundrequest", {
                          state: {
                            ...allbusiness,
                            customtype: state.customtype,
                          },
                        });
                      }}
                    >
                      <img src={sendfunds} alt="" />
                      Disbursed Payment
                    </div>
                  </>
                )}
              </div>

              {state.customtype !== "Factoring" &&
                allbusiness?.status !== "COMPLETED" && (
                  <>
                    <div
                      className="user_verify"
                      style={{
                        width: "100%",
                        color: "#98A2B3",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate("/finance/changeterm", {
                          state: {
                            ...allbusiness,
                            customtype: state.customtype,
                          },
                        })
                      }
                    >
                      <img src={sendfunds} alt="" />
                      Change Terms
                    </div>

                    <div className="user_balance"></div>
                  </>
                )}
              <div style={{ marginTop: "-20px" }} className="details-d_tl">
                <div className="md-details-col">
                  <div className="details_cl_tl">
                    {state.customtype} details
                  </div>
                  <div
                    className="each_details_tl"
                    style={{
                      borderBottom: "1px solid #E7E9FB",
                      paddingBottom: "30px",
                    }}
                  >
                    <div className="each_main_tl">
                      <div className="each_d_lt">Request Amount</div>
                      <span className="d-lt-a">
                        {state.currency === "NGN"
                          ? "₦"
                          : state.currency === "EUR"
                          ? "€"
                          : state.currency === "USD"
                          ? "$"
                          : "£"}
                        {state.customtype === "Factoring"
                          ? parseFloat(
                              allbusiness?.totalAmount
                            ).toLocaleString()
                          : parseFloat(state.requestedAmount).toLocaleString()}
                      </span>
                    </div>
                    {state.customtype === "Factoring" && (
                      <>
                        <div className="each_main_tl">
                          <div className="each_d_lt">Invoice Title</div>
                          <span className="d-lt-a">
                            {allbusiness?.invoiceTitle}
                          </span>
                        </div>
                        <div className="each_main_tl">
                          <div className="each_d_lt">Issue Date</div>
                          <span className="d-lt-a">
                            {new Date(state?.issueDate).toDateString()}
                          </span>
                        </div>
                        {/**
                    <div className="each_main_tl">
                      <div className="each_d_lt">Payment Link</div>
                      <span className="d-lt-a">

                        {allbusiness?.paymentLink}
                      </span>
                    </div>
                    */}

                        <div className="each_main_tl">
                          <div className="each_d_lt">Due Date</div>
                          <span className="d-lt-a">
                            {new Date(allbusiness?.dueDate).toDateString()}
                          </span>
                        </div>
                      </>
                    )}
                    {allbusiness?.loanAmount !== undefined &&
                      allbusiness?.loanAmount !== null && (
                        <div className="each_main_tl">
                          <div className="each_d_lt">Approved Amount</div>
                          <span className="d-lt-a">
                            {state.currency === "NGN"
                              ? "₦"
                              : state.currency === "EUR"
                              ? "€"
                              : "£"}
                            {allbusiness?.loanAmount}
                          </span>
                        </div>
                      )}

                    {state.customtype === "Working Capital" &&
                      allbusiness?.purchaseOrder && (
                        <>
                          <div className="each_main_tl">
                            <div className="each_d_lt">Contract Amount</div>
                            <span className="d-lt-a">
                              {state.currency === "NGN"
                                ? "₦"
                                : state.currency === "EUR"
                                ? "€"
                                : "£"}
                              {state.contractAmount}
                            </span>
                          </div>
                          <div className="each_main_tl">
                            <div className="each_d_lt">Contract Type</div>
                            <span className="d-lt-a">{state.contractType}</span>
                          </div>
                        </>
                      )}
                    {state.customtype === "Credit Line" && (
                      <>
                        <div className="each_main_tl">
                          <div className="each_d_lt">Request Title</div>
                          <span className="d-lt-a">{state.requestTitle}</span>
                        </div>
                      </>
                    )}
                    {state.customtype !== "Factoring" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Repayment Structure</div>
                        <span className="d-lt-a">
                          {state.repaymentStructure}
                        </span>
                      </div>
                    )}
                    {state.customtype !== "Factoring" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Request Date</div>
                        <span className="d-lt-a">
                          {new Date(state.createdAt).toDateString()}{" "}
                          {new Date(state.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                    {state.customtype === "Factoring" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Invoice Status</div>
                        <span className="d-lt-a">
                          {allbusiness?.invoice?.paymentStatus}
                        </span>
                      </div>
                    )}
                    {state.customtype !== "Factoring" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Payment Status</div>
                        <span className="d-lt-a">
                          {allbusiness?.paymentStatus}
                        </span>
                      </div>
                    )}
                    {state.customtype === "Working Capital" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Repay Date</div>
                        <span className="d-lt-a">
                          {new Date(state.createdAt).toDateString()}{" "}
                          {new Date(state.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                    {state?.customtype !== "Factoring" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Tenure</div>
                        <span className="d-lt-a">{state.tenure} Days</span>
                      </div>
                    )}
                    {state.customtype === "Working Capital" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">
                          Interest (
                          {parseFloat(allbusiness?.interestRate * 100)}%)
                        </div>
                        <span className="d-lt-a">
                          {state.currency === "NGN"
                            ? "₦"
                            : state.currency === "EUR"
                            ? "€"
                            : "£"}
                          {parseFloat(
                            allbusiness?.interestAmount
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {/**  <div className="each_main_tl">
                      <div className="each_d_lt">Fee</div>
                      <span className="d-lt-a">0.0s</span>
                    </div> */}
                  </div>
                  {state.customtype === "Working Capital" && (
                    <div className="each_main_tl">
                      <div className="each_d_lt">Type</div>
                      <span className="d-lt-a">{allbusiness?.type}</span>
                    </div>
                  )}
                  {state.customtype === "Credit Line" && (
                    <>
                      <div className="details_cl_tl">Other Details</div>

                      <div
                        className="each_details_tl"
                        style={{ paddingBottom: "30px" }}
                      >
                        <div className="each_main_tl">
                          <div className="each_d_lt">Annual Sales Revenue</div>
                          <span className="d-lt-a">
                            {state.currency === "NGN"
                              ? "₦"
                              : state.currency === "EUR"
                              ? "€"
                              : "£"}
                            {parseFloat(state.annualRevenue).toLocaleString()}
                          </span>
                        </div>
                        <div className="each_main_tl">
                          <div className="each_d_lt">Annual Turnover</div>
                          <span className="d-lt-a">
                            {state.currency === "NGN"
                              ? "₦"
                              : state.currency === "EUR"
                              ? "€"
                              : "£"}
                            {parseFloat(state.annualTurnOver).toLocaleString()}
                          </span>
                        </div>
                        {/**
                        <div className="each_main_tl">
                          <div
                            className="each_d_lt"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            {state.userType} bank
                          </div>
                          <span className="d-lt-a">
                            {state?.advisingBank
                              ? state?.advisingBank.name
                              : "Nill"}
                          </span>
                        </div>

                        <div className="each_main_tl">
                          <div
                            className="each_d_lt"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            {state.userType} account
                          </div>
                          <span className="d-lt-a">
                            {state.advisingBank
                              ? state.advisingBank?.accountNumber
                              : "Nill"}
                          </span>
                        </div>
                        */}
                      </div>
                    </>
                  )}
                  {state.customtype === "Factoring" && (
                    <>
                      <div
                        className="details_cl_tl"
                        style={{
                          textTransform: "capitalize",
                        }}
                      >
                        {allbusiness?.invoice?.userType} Details
                      </div>

                      <div
                        className="each_details_tl"
                        style={{ paddingBottom: "30px" }}
                      >
                        <div className="each_main_tl">
                          <div className="each_d_lt">Firstname</div>
                          <span className="d-lt-a">
                            {allbusiness?.firstName} {allbusiness?.lastName}
                          </span>
                        </div>
                        <div className="each_main_tl">
                          <div className="each_d_lt">Email</div>
                          <span className="d-lt-a">{allbusiness?.email}</span>
                        </div>
                        <div className="each_main_tl">
                          <div className="each_d_lt">Phone Number</div>
                          <span className="d-lt-a">
                            {allbusiness?.phoneNumber}
                          </span>
                        </div>
                        <div className="each_main_tl">
                          <div className="each_d_lt">User Type</div>
                          <span className="d-lt-a">
                            {allbusiness?.userType}
                          </span>
                        </div>
                        {/**
                        <div className="each_main_tl">
                          <div
                            className="each_d_lt"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            {state.userType} bank
                          </div>
                          <span className="d-lt-a">
                            {state?.advisingBank
                              ? state?.advisingBank.name
                              : "Nill"}
                          </span>
                        </div>

                        <div className="each_main_tl">
                          <div
                            className="each_d_lt"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            {state.userType} account
                          </div>
                          <span className="d-lt-a">
                            {state.advisingBank
                              ? state.advisingBank?.accountNumber
                              : "Nill"}
                          </span>
                        </div>
                        */}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-right-col-cf">
              <ul className="tp-head-list">
                {/**
                <li
                  onClick={() => settab("kyc")}
                  style={{
                    borderBottom: tab === "kyc" ? "3px solid #6F00FF" : "",
                  }}
                >
                  Document
                </li>
                */}
                {state?.customtype === "Working Capital" && (
                  <li
                    onClick={() => settab("bank")}
                    style={{
                      borderBottom: tab === "bank" ? "3px solid #6F00FF" : "",
                    }}
                  >
                    {allbusiness?.userType
                      ? allbusiness?.userType
                      : "Receiver Details"}
                  </li>
                )}
                {state?.customtype === "Factoring" && (
                  <li
                    onClick={() => settab("bank")}
                    style={{
                      borderBottom: tab === "bank" ? "3px solid #6F00FF" : "",
                    }}
                  >
                    Invoice Details
                  </li>
                )}

                {state.customtype !== "Factoring" && (
                  <li
                    onClick={() => {
                      if (allbusiness.isAdminApproved?.status === "APPROVED")
                        settab("repay");
                    }}
                    style={{
                      borderBottom: tab === "repay" ? "3px solid #6F00FF" : "",
                    }}
                  >
                    Repayment
                  </li>
                )}
              </ul>
              <div
                className="main_tp_lig"
                style={{
                  minHeight: "670px !important",
                }}
              >
                {tab === "kyc" && (
                  <>
                    {state.customtype === "Factoring" && (
                      <>
                        <div
                          className="prof_ad_rf"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (allbusiness?.invoiceDocument) {
                              navigate("/finance/document", {
                                state: {
                                  image: allbusiness?.invoiceDocument?.url,
                                  type: "invoice",
                                  id: state._id,
                                  name: "Invoice",
                                },
                              });
                            }
                          }}
                        >
                          <div className="left-ttl-c">
                            <span className="typ_lg_vg">Invoice</span>
                          </div>
                          <div className="each_sec_lg_vg">
                            <div className="lg-md-lf-glv">
                              <img src={document} alt="" />
                              Invoice
                            </div>
                            {state?.invoiceDocument?.url ? (
                              <span className="material-icons">
                                navigate_next
                              </span>
                            ) : (
                              "Not uploaded"
                            )}

                            <div className="loader">
                              <img
                                src={
                                  allbusiness?.invoiceDocument?.status ===
                                  "APPROVED"
                                    ? checkbox
                                    : allbusiness.invoiceDocument?.status ===
                                      "REJECTED"
                                    ? rejectimg
                                    : loader
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="prof_ad_rf"
                          onClick={() => {
                            navigate("/finance/document", {
                              state: {
                                image: allbusiness?.agreement?.url,
                                type: "agreement",
                                id: state._id,
                                name: "Invoice",
                              },
                            });
                          }}
                        >
                          <div className="left-ttl-c">
                            <span className="typ_lg_vg">
                              Customer Agreement
                            </span>
                          </div>

                          <div
                            className="each_sec_lg_vg"
                            style={{
                              border: "1px solid #e7e9fb",
                            }}
                          >
                            <div className="lg-md-lf-glv">
                              <img src={document} alt="" />
                              Customer Agreement
                            </div>
                            {allbusiness?.agreement?.url ? (
                              <span className="material-icons">
                                navigate_next
                              </span>
                            ) : (
                              "Not uploaded"
                            )}
                            <div className="loader">
                              <img
                                src={
                                  allbusiness.agreement?.status === "APPROVED"
                                    ? checkbox
                                    : allbusiness.agreement?.status ===
                                      "REJECTED"
                                    ? rejectimg
                                    : loader
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {state.customtype !== "Factoring" && (
                      <>
                        <div
                          className="prof_ad_rf"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="left-ttl-c">
                            {/**
                            <span className="typ_lg_vg">
                              {state.customtype}
                            </span>
                            */}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              className="left-ttl-c"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                              }}
                            >
                              <span
                                className="typ_lg_vg"
                                style={{
                                  fontWeight: "600",
                                }}
                              >
                                Document Status
                              </span>
                              <span className="typ_lg_vg">
                                {allbusiness?.isSubmitted
                                  ? allbusiness?.isSubmitted.status
                                  : "Not Submitted"}
                              </span>
                            </div>
                            {allbusiness?.isSubmitted && (
                              <div
                                className="left-ttl-c"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "4px",
                                }}
                              >
                                <span
                                  className="typ_lg_vg"
                                  style={{
                                    fontWeight: "600",
                                  }}
                                >
                                  Submitted Date
                                </span>
                                <span className="typ_lg_vg">
                                  {new Date(
                                    allbusiness?.isSubmitted.date
                                  ).toDateString()}
                                </span>
                              </div>
                            )}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              className="left-ttl-c"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                              }}
                            >
                              <span
                                className="typ_lg_vg"
                                style={{
                                  fontWeight: "600",
                                }}
                              >
                                Loan Status
                              </span>
                              <span className="typ_lg_vg">
                                {allbusiness?.isAdminApproved
                                  ? allbusiness?.isAdminApproved.status
                                  : "Not Approved"}
                              </span>
                            </div>

                            <div
                              className="left-ttl-c"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                              }}
                            >
                              <span
                                className="typ_lg_vg"
                                style={{
                                  fontWeight: "600",
                                }}
                              >
                                Approval Date
                              </span>
                              <span className="typ_lg_vg">
                                {new Date(
                                  allbusiness?.isAdminApproved?.adminDate
                                ).toDateString()}
                              </span>
                            </div>
                          </div>

                          {/**
                          {
                            allbusiness?.uploadDocuments &&  <>


                          <div className="each_sec_lg_vg"
                           onClick={() => {
                                if(allbusiness?.uploadDocuments?.LetterOfCredit?.url){


                                navigate("/finance/document", {
                                  state: {
                                    image:allbusiness?.uploadDocuments?.LetterOfCredit?.url,
                                    type: 'LetterOfCredit',
                                    id: state._id,
                                    name: allbusiness.customtype === "Credit Line" ? 'LetterOfCredit' : "TradeCredit",

                                  },
                                });
                                }
                              }}>

                            <div className="lg-md-lf-glv">
                              <img src={document} alt="" />
                              LOC.pdf - 4 MB
                            </div>



                            {
                                allbusiness?.uploadDocuments?.LetterOfCredit?.url ?  <span className="material-icons">
                                navigate_next
                              </span> : 'Not uploaded'
                              }
                            <div className="loader">
                                <img src={allbusiness.uploadDocuments?.LetterOfCredit?.status === 'APPROVED' ? checkbox : allbusiness.uploadDocuments?.LetterOfCredit?.status === 'REJECTED' ? rejectimg : loader } alt="" />

                            </div>
                          </div>
                          </>
                          }
                            */}
                        </div>

                        <div className="prof_ad_rf">
                          {allbusiness?.cashFlowSupport && (
                            <>
                              <div
                                className="left-ttl-c"
                                style={{
                                  marginTop: "20px",
                                }}
                              >
                                <span className="typ_lg_vg">
                                  Recommended Documents
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: "-20px",
                                }}
                              >
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.cashFlowSupport
                                        ?.managementAccount?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.cashFlowSupport
                                              ?.managementAccount?.url,
                                          type: "managementAccount",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Management Account
                                  </div>
                                  {allbusiness?.cashFlowSupport
                                    ?.managementAccount?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness.cashFlowSupport
                                          ?.managementAccount?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.cashFlowSupport
                                              ?.managementAccount?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.cashFlowSupport?.agreement
                                        ?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.cashFlowSupport
                                              ?.agreement?.url,
                                          type: "agreement",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Agreement
                                  </div>
                                  {allbusiness?.cashFlowSupport?.agreement
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.cashFlowSupport?.agreement
                                          ?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.cashFlowSupport
                                              ?.agreement?.status === "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.cashFlowSupport
                                        ?.bankStatement?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.cashFlowSupport
                                              ?.bankStatement?.url,
                                          type: "bankStatement",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Bank Statement
                                  </div>
                                  {allbusiness?.cashFlowSupport?.bankStatement
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.cashFlowSupport
                                          ?.bankStatement?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.cashFlowSupport
                                              ?.bankStatement?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {allbusiness?.inventoryDocuments && (
                            <>
                              <div
                                className="left-ttl-c"
                                style={{
                                  marginTop: "20px",
                                }}
                              >
                                <span className="typ_lg_vg">
                                  Recommended Documents
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: "-20px",
                                }}
                              >
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.inventoryDocuments?.agreement
                                        ?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.inventoryDocuments
                                              ?.agreement?.url,
                                          type: "agreement",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Agreement
                                  </div>
                                  {allbusiness?.inventoryDocuments?.agreement
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness.inventoryDocuments
                                          ?.agreement?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.inventoryDocuments
                                              ?.agreement?.status === "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>

                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.inventoryDocuments?.invoice
                                        ?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.inventoryDocuments
                                              ?.invoice?.url,
                                          type: "invoice",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Invoice
                                  </div>
                                  {allbusiness?.inventoryDocuments?.invoice
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.inventoryDocuments?.invoice
                                          ?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.inventoryDocuments
                                              ?.invoice?.status === "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {allbusiness?.shippingDocuments && (
                            <>
                              <div
                                className="left-ttl-c"
                                style={{
                                  marginTop: "20px",
                                }}
                              >
                                <span className="typ_lg_vg">
                                  Recommended Documents
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: "-20px",
                                }}
                              >
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.shippingDocuments
                                        ?.commercialInvoice?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.shippingDocuments
                                              ?.commercialInvoice?.url,
                                          type: "commercialInvoice",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Commercial Invoice
                                  </div>
                                  {allbusiness?.shippingDocuments
                                    ?.commercialInvoice?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness.shippingDocuments
                                          ?.commercialInvoice?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.shippingDocuments
                                              ?.commercialInvoice?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.shippingDocuments?.airWayBill
                                        ?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.shippingDocuments
                                              ?.airWayBill?.url,
                                          type: "airWayBill",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    AirWay Bill
                                  </div>
                                  {allbusiness?.shippingDocuments?.airWayBill
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.shippingDocuments
                                          ?.airWayBill?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.shippingDocuments
                                              ?.airWayBill?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.shippingDocuments?.insurance
                                        ?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.shippingDocuments
                                              ?.insurance?.url,
                                          type: "insurance",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Insurance Certificate
                                  </div>
                                  {allbusiness?.shippingDocuments?.insurance
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.shippingDocuments
                                          ?.insurance?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.shippingDocuments
                                              ?.insurance?.status === "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {allbusiness?.shippingDocuments && (
                            <>
                              <div
                                className="left-ttl-c"
                                style={{
                                  marginTop: "20px",
                                }}
                              >
                                <span className="typ_lg_vg">
                                  Other Documents
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: "-20px",
                                }}
                              >
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.shippingDocuments
                                        ?.certificateOfOrigin.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.shippingDocuments
                                              ?.certificateOfOrigin?.url,
                                          type: "certificateOfOrigin",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Certificate of Origin
                                  </div>
                                  {allbusiness?.shippingDocuments
                                    ?.certificateOfOrigin?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}

                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.shippingDocuments
                                          ?.certificateOfOrigin?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.shippingDocuments
                                              ?.certificateOfOrigin?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.shippingDocuments
                                        ?.packingList?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.shippingDocuments
                                              ?.packingList?.url,
                                          type: "packingList",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Packing List
                                  </div>
                                  {allbusiness?.shippingDocuments?.packingList
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.shippingDocuments
                                          ?.packingList?.status === "APPROVED"
                                          ? checkbox
                                          : state?.shippingDocuments
                                              ?.packingList?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.shippingDocuments
                                        ?.inspectionCertificate?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.shippingDocuments
                                              ?.inspectionCertificate?.url,
                                          type: "inspectionCertificate",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Certificate of Inspection
                                  </div>
                                  {allbusiness?.shippingDocuments
                                    ?.inspectionCertificate?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.shippingDocuments
                                          ?.inspectionCertificate?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : state?.shippingDocuments
                                              ?.inspectionCertificate
                                              ?.status === "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {allbusiness?.purchaseOrder && (
                            <>
                              <div
                                className="left-ttl-c"
                                style={{
                                  marginTop: "20px",
                                }}
                              >
                                <span className="typ_lg_vg">
                                  Recommended Documents
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: "-20px",
                                }}
                              >
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.purchaseOrder?.bankStatement
                                        ?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.purchaseOrder
                                              ?.bankStatement?.url,
                                          type: "bankStatement",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Bank Statement
                                  </div>
                                  {allbusiness?.purchaseOrder?.bankStatement
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}

                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.purchaseOrder
                                          ?.bankStatement?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.purchaseOrder
                                              ?.bankStatement?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.purchaseOrder
                                        ?.boardResolution?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.purchaseOrder
                                              ?.boardResolution?.url,
                                          type: "boardResolution",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Board Resolution
                                  </div>
                                  {allbusiness?.purchaseOrder?.boardResolution
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.purchaseOrder
                                          ?.boardResolution?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.purchaseOrder
                                              ?.boardResolution?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.purchaseOrder
                                        ?.pastPurchaseOrder?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.purchaseOrder
                                              ?.pastPurchaseOrder?.url,
                                          type: "pastPurchaseOrder",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Past Purchase Order
                                  </div>
                                  {allbusiness?.purchaseOrder?.pastPurchaseOrder
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.purchaseOrder
                                          ?.pastPurchaseOrder?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.purchaseOrder
                                              ?.pastPurchaseOrder?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.purchaseOrder?.purchaseOrder
                                        ?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.purchaseOrder
                                              ?.purchaseOrder?.url,
                                          type: "purchaseOrder",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Purchase Order
                                  </div>
                                  {allbusiness?.purchaseOrder?.purchaseOrder
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.purchaseOrder
                                          ?.purchaseOrder?.status === "APPROVED"
                                          ? checkbox
                                          : state?.purchaseOrder?.purchaseOrder
                                              ?.status === "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.purchaseOrder?.vendorLetter
                                        ?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.purchaseOrder
                                              ?.vendorLetter?.url,
                                          type: "vendorLetter",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Vendor Letter
                                  </div>
                                  {allbusiness?.purchaseOrder?.vendorLetter
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.purchaseOrder?.vendorLetter
                                          ?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.purchaseOrder
                                              ?.vendorLetter?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.purchaseOrder
                                        ?.contractAgreement?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.purchaseOrder
                                              ?.contractAgreement?.url,
                                          type: "contractAgreement",
                                          id: state._id,
                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Contract Agreement
                                  </div>
                                  {allbusiness?.purchaseOrder?.contractAgreement
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.purchaseOrder
                                          ?.contractAgreement?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.purchaseOrder
                                              ?.contractAgreement?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {allbusiness?.uploadDocuments &&
                            state.customtype === "Credit Line" && (
                              <>
                                <div
                                  className="left-ttl-c"
                                  style={{
                                    marginTop: "20px",
                                  }}
                                >
                                  <span className="typ_lg_vg">
                                    Recommended Documents
                                  </span>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginTop: "-20px",
                                  }}
                                >
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderBottomLeftRadius: "0px",
                                      borderBottomRightRadius: "0px",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments
                                          ?.bankStatement?.url
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.bankStatement?.url,
                                            type: "bankStatement",
                                            id: state._id,
                                            name: "letterOfCredit",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Bank Statement
                                    </div>
                                    {allbusiness?.uploadDocuments?.bankStatement
                                      ?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}

                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.bankStatement?.status ===
                                          "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.bankStatement?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loader
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderRadius: "0px",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments
                                          ?.boardResolution?.url
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.boardResolution?.url,
                                            type: "boardResolution",
                                            id: state._id,
                                            name: "LetterOfCredit",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Board Resolution
                                    </div>
                                    {allbusiness?.uploadDocuments
                                      ?.boardResolution?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.boardResolution?.status ===
                                          "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.boardResolution?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loader
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderRadius: "0px",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments
                                          ?.contractAgreement?.url
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.contractAgreement?.url,
                                            type: "contractAgreement",
                                            id: state._id,
                                            name: "LetterOfCredits",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Contract Agreement
                                    </div>
                                    {allbusiness?.uploadDocuments
                                      ?.contractAgreement?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.contractAgreement?.status ===
                                          "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.contractAgreement?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loader
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderRadius: "0px",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments
                                          ?.managementAccounts?.url
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.managementAccounts?.url,
                                            type: "managementAccount",
                                            id: state._id,
                                            name: "LetterOfCredit",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Management Account
                                    </div>
                                    {allbusiness?.uploadDocuments
                                      ?.managementAccounts?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.managementAccounts?.status ===
                                          "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.managementAccounts?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loader
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>

                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderTopLeftRadius: "0px",
                                      borderTopRightRadius: "0px",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments
                                          ?.schedulingExistingLoan?.url
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.schedulingExistingLoan?.url,
                                            type: "schedulingExistingLoan",
                                            id: state._id,
                                            name: "LetterOfCredit",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Scheduling Exisiting Loan
                                    </div>
                                    {allbusiness?.uploadDocuments
                                      ?.schedulingExistingLoan?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.schedulingExistingLoan?.status ===
                                          "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.schedulingExistingLoan
                                                ?.status === "REJECTED"
                                            ? rejectimg
                                            : loader
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          {allbusiness?.uploadDocuments &&
                            state.customtype !== "Credit Line" && (
                              <>
                                <div
                                  className="left-ttl-c"
                                  style={{
                                    marginTop: "20px",
                                  }}
                                >
                                  <span className="typ_lg_vg">
                                    Recommended Documents
                                  </span>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginTop: "-20px",
                                  }}
                                >
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderBottomLeftRadius: "0px",
                                      borderBottomRightRadius: "0px",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments
                                          ?.commercialInvoice?.url
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.commercialInvoice?.url,
                                            type: "commercialInvoice",
                                            id: state._id,
                                            name:
                                              state.customtype === "Credit Line"
                                                ? "LetterOfCredit"
                                                : "TradeCredit",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Commercial Invoice
                                    </div>
                                    {allbusiness?.uploadDocuments
                                      ?.commercialInvoice?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness.uploadDocuments
                                            ?.commercialInvoice?.status ===
                                          "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.commercialInvoice?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loader
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderRadius: "0px",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments?.airWayBill
                                          ?.url
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.airWayBill?.url,
                                            type: "airWayBill",
                                            id: state._id,
                                            name:
                                              state.customtype === "Credit Line"
                                                ? "LetterOfCredit"
                                                : "TradeCredit",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      AirWay Bill
                                    </div>
                                    {allbusiness?.uploadDocuments?.airWayBill
                                      ?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.airWayBill?.status === "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.airWayBill?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loader
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderTopLeftRadius: "0px",
                                      borderTopRightRadius: "0px",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments?.insurance
                                          ?.url
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.insurance?.url,
                                            type: "insurance",
                                            id: state._id,
                                            name:
                                              state.customtype === "Credit Line"
                                                ? "LetterOfCredit"
                                                : "TradeCredit",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Insurance Certificate
                                    </div>
                                    {allbusiness?.uploadDocuments?.insurance
                                      ?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.insurance?.status === "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.insurance?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loader
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                        </div>
                        {allbusiness?.uploadDocuments &&
                          state.customtype !== "Credit Line" && (
                            <>
                              <div
                                className="left-ttl-c"
                                style={{
                                  marginTop: "20px",
                                }}
                              >
                                <span className="typ_lg_vg">
                                  Other Documents
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: "-20px",
                                }}
                              >
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.uploadDocuments
                                        ?.certificateOfOrigin?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.uploadDocuments
                                              ?.certificateOfOrigin?.url,
                                          type: "certificateOfOrigin",
                                          id: state._id,
                                          name:
                                            state.customtype === "Credit Line"
                                              ? "LetterOfCredit"
                                              : "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Certificate of Origin
                                  </div>
                                  {allbusiness?.uploadDocuments
                                    ?.certificateOfOrigin?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}

                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.uploadDocuments
                                          ?.certificateOfOrigin?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.uploadDocuments
                                              ?.certificateOfOrigin?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.uploadDocuments?.packingList
                                        ?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.uploadDocuments
                                              ?.packingList?.url,
                                          type: "packingList",
                                          id: state._id,
                                          name:
                                            state.customtype === "Credit Line"
                                              ? "LetterOfCredit"
                                              : "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Packing List
                                  </div>
                                  {allbusiness?.uploadDocuments?.packingList
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.uploadDocuments
                                          ?.packingList?.status === "APPROVED"
                                          ? checkbox
                                          : state?.uploadDocuments?.packingList
                                              ?.status === "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.uploadDocuments
                                        ?.inspectionCertificate?.url
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.uploadDocuments
                                              ?.inspectionCertificate?.url,
                                          type: "inspectionCertificate",
                                          id: state._id,
                                          name:
                                            state.customtype === "Credit Line"
                                              ? "LetterOfCredit"
                                              : "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Certificate of Inspection
                                  </div>
                                  {allbusiness?.uploadDocuments
                                    ?.inspectionCertificate?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.uploadDocuments
                                          ?.inspectionCertificate?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : state?.uploadDocuments
                                              ?.inspectionCertificate
                                              ?.status === "REJECTED"
                                          ? rejectimg
                                          : loader
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                      </>
                    )}
                  </>
                )}
                {tab === "bank" && (
                  <>
                    {state.customtype === "Working Capital" && (
                      <div className="section_modl_lg">
                        <div className="bank-detail-other">
                          <div className="level-bank-details">
                            <span>Name</span>
                            <div>
                              {allbusiness?.firstName} {allbusiness?.lastName}
                            </div>
                          </div>
                          <div className="level-bank-details">
                            <span>Email</span>
                            <div>{allbusiness?.email}</div>
                          </div>
                          <div className="level-bank-details">
                            <span>Phone Number</span>
                            <div>{allbusiness?.phoneNumber}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {state.customtype === "Factoring" &&
                      allbusiness?.invoiceItems?.map((res, index) => (
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
                                <div className="head-tg">{res.itemName}</div>
                                <span
                                  className="small-tg"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  Quantity : {res.quantity} Price Per Unit :{" "}
                                  {allbusiness?.currency === "NGN"
                                    ? "₦"
                                    : allbusiness?.currency === "USD"
                                    ? "$"
                                    : allbusiness?.currency === "EUR"
                                    ? "€"
                                    : "£"}
                                  {parseFloat(
                                    res.pricePerUnit
                                  ).toLocaleString()}
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
                                {allbusiness?.currency === "NGN"
                                  ? "₦"
                                  : allbusiness?.currency === "USD"
                                  ? "$"
                                  : allbusiness?.currency === "EUR"
                                  ? "€"
                                  : "£"}
                                {parseFloat(
                                  res.pricePerUnit * res.quantity
                                ).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                )}
                {tab === "repay" && (
                  <>
                    <div
                      className="section_modl_lg"
                      style={{
                        position: "relative",
                      }}
                    >
                      {success && (
                        <div
                          className="success"
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            zIndex: "9999",
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
                      {fail && (
                        <div
                          className="success"
                          style={{
                            background: "#FCFCFD",
                            border: " 1px solid #D0D5DD",

                            boxSizing: "border-box",
                            zIndex: "9999",
                            width: "100%",
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
                      <div className="bank-detail-other">
                        <div className="level-bank-details">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <span>
                              Repayment({filterloanrepaid?.length}/
                              {loans?.length})
                            </span>
                            <span>
                              {parseFloat(
                                filterloanrepaid?.length / loans?.length
                              ).toFixed(2) * 100}
                              % Complete
                            </span>
                          </div>
                          <div
                            style={{
                              position: "relative",
                              background: "#EAECF0",
                              borderRadius: "20px",
                              width: "100%",
                              height: "16px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                background: "#12B76A",
                                width: `calc(${parseFloat(
                                  filterloanrepaid.length / loans.length
                                ).toFixed(2)} * 100%)`,
                                height: "100%",
                                borderRadius: "20px",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="level-bank-details">
                          <span>Next Payment</span>
                          <div>
                            {filterloan.length > 0 ? (
                              <>
                                {" "}
                                {state.currency === "NGN"
                                  ? "₦"
                                  : state.currency === "EUR"
                                  ? "€"
                                  : "£"}
                                {firstloan?.map((item) => item?.amount)}
                              </>
                            ) : (
                              "Repaid fully"
                            )}
                          </div>
                        </div>
                        <div className="level-bank-details">
                          <span>Next Payment In</span>
                          <div>
                            {filterloan.length > 0
                              ? firstloan?.map((item) =>
                                  new Date(item?.dueDate).toDateString()
                                )
                              : "Repaid fully."}
                          </div>
                        </div>
                        <div className="level-bank-details">
                          <span>Repayment Structure</span>
                          <div>{allbusiness?.repaymentStructure}</div>
                        </div>
                        {filterloan?.length > 0 && (
                          <button
                            className="repay-for"
                            disabled={loader}
                            type="button"
                            onClick={RepayNow}
                          >
                            {loader ? <Loading /> : "Repay"}
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {tab === "goods" && (
                  <>
                    <div
                      className="section_modl_lg"
                      style={{
                        border: "1px solid #e7e9fb",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="bank-detail-other">
                        <div className="level-bank-details">
                          <span>Supplier Details</span>
                          <div>
                            {state?.typesOfGoods ? state.typesOfGoods : "nill"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceFlexPayDetails;
