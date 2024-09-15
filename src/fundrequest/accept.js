import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import SerHeader from "../components/SerHeader";
//import "../style/slider.css";
//import '../style/main.css'
//import info from '../asset/images/iconinfo.svg'
import US from "../assets/images/EU.svg";
import NGN from "../assets/images/ngnnigeria.jpg";
import EU from "../assets/images/usds.svg";
import GB from "../assets/images/GB.svg";
import axios from "axios";
import Loading from "../components/loading";

const Transfer = () => {
  // const navigate = useNavigate();
  const { state } = useLocation();
  const [loader, setloader] = useState(false);
  const [isdisable, setisdisable] = useState(true);
  const [amount, setamount] = useState(
    state?.loanAmount !== undefined ? state.loanAmount : state.requestedAmount
  );
  const [success, setsucess] = useState(false);
  const [fail, setfail] = useState(false);
  const [message, setmessage] = useState("");
  const [date, setdate] = useState(new Date());
  const [allbusiness, setallbusiness] = useState([]);
  const navigate = useNavigate();
  // console.log(state);
  useEffect(() => {
    if (success) {
      let timer = setTimeout(() => {
        setsucess(false);
        navigate(-1);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  });
  useEffect(() => {
    if (fail) {
      let timer = setTimeout(() => {
        setfail(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  });
  useEffect(() => {
    const fetchTransaction = async () => {
      if (state.customtype === "Working Capital") {
        await axios
          .get(`/v1/admin/get-single-finance-trade-credit/${state._id}`)
          .then((res) => {
            //   console.log(res)
            setallbusiness(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (state.customtype === "Credit Line") {
        await axios
          .get(`/v1/admin/get-single-finance-credit-line/${state._id}`)
          .then((res) => {
            // console.log(res);
            setallbusiness(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        await axios
          .get(`/v1/admin/get-single-finance-invoice/${state._id}`)
          .then((res) => {
            //console.log(res);
            setallbusiness(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };

    fetchTransaction();
  }, [state?.customtype, state._id]);

  useEffect(() => {
    if (amount !== "") {
      setisdisable(false);
    } else {
      setisdisable(true);
    }
  }, [setisdisable, amount]);
  const submitHandler = async (e) => {
    if (state.customtype === "Working Capital") {
      setloader(true);
      e.preventDefault();
      const data = {
        amount:
          allbusiness.loanAmount === undefined
            ? allbusiness.requestedAmount
            : allbusiness.loanAmount,
      };

      await axios
        .post(`/v1/admin/sendFinanceFundToTradeCredit/${state._id}`, data)
        .then((res) => {
          //  y.log(res);
          setsucess(true);
          setmessage(res.data.message);
          setloader(false);
          setfail(false);
        })
        .catch((e) => {
          console.log(e);
          setfail(true);
          setloader(false);
          setsucess(false);
          setmessage(
            e.response?.data.message
              ? e.response?.data.message
              : "Sorry, Something went wrong"
          );
        });
    } else if (state.customtype === "Credit Line") {
      setloader(true);
      e.preventDefault();
      const data = {
        amount:
          allbusiness.loanAmount === undefined
            ? allbusiness.requestedAmount
            : allbusiness.loanAmount,
      };

      await axios
        .post(`/v1/admin/sendFinanceFundToCreditLine/${state._id}`, data)
        .then((res) => {
          //  console.log(res);
          setsucess(true);
          setmessage(res.data.message);
          setloader(false);
          setfail(false);
        })
        .catch((e) => {
          console.log(e);
          setfail(true);
          setloader(false);
          setsucess(false);
          setmessage(
            e.response?.data.message
              ? e.response?.data.message
              : "Sorry, Something went wrong"
          );
        });
    } else if (state.customtype === "Factoring") {
      setloader(true);
      e.preventDefault();
      const data = {
        amount: state.requestedAmount,
        dueDate: new Date(date),
      };

      await axios
        .post(`/v1/admin/sendFinanceFundToFinanceInvoice/${state._id}`, data)
        .then((res) => {
          // console.log(res);
          setsucess(true);
          setmessage(res.data.message);
          setloader(false);
          setfail(false);
        })
        .catch((e) => {
          console.log(e);
          setfail(true);
          setloader(false);
          setsucess(false);
          setmessage(
            e.response?.data.message
              ? e.response?.data.message
              : "Sorry, Something went wrong"
          );
        });
    }
  };

  return (
    <div className="h-100 w-100 ">
      <div
        className=""
        style={{
          maxWidth: "2000px",
          width: "100%",
          margin: "0px auto",
          boxSizing: "border-box",
        }}
      >
        <Helmet>
          <title>Factoring Request</title>
        </Helmet>

        <SerHeader header={"Approve factoring request"} />
      </div>
      <div
        style={{
          height: "100%",
          maxWidth: "2000px",
          margin: "0px auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          className=" "
          style={{
            margin: "0px auto",
            paddingLeft: "30px",
            paddingRight: "30px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",

              justifyContent: "center",
            }}
          >
            <form
              onSubmit={submitHandler}
              className="form-general-layout"
              style={{
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              {success && (
                <div
                  className="success"
                  style={{
                    width: "100%",
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "32px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      color: "#101828",
                      fontWeight: "600",
                      fontSize: "24px",
                      lineHeight: "32.4px",
                    }}
                  >
                    Send funds to supplier
                  </div>
                  <span
                    style={{
                      color: "#667085",
                      fontWeight: "500",
                      lineHeight: "24px",
                      fontSize: "1rem",
                      letterSpacing: "2%",
                    }}
                  >
                    Confirm amount below
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "32px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      width: "100%",
                    }}
                  >
                    <span
                      htmlFor=""
                      style={{
                        fontSize: "14px",
                        lineHeight: "19.6px",
                        fontWeight: "600",
                        color: "#101828",
                      }}
                    >
                      Amount
                    </span>
                    <div
                      className=""
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            maxWidth: "110px",
                            borderRadius: "8px",
                            border: "none",
                            outline: "none",
                            background: "",
                            padding: "8px 16px 8px 16px",
                            backgroundColor: "#ECEFF3",
                            letterSpacing: "2%",
                            fontWeight: "500",
                            fontSize: "16px",
                            display: "flex",
                            gap: "4px",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          {" "}
                          <img
                            src={
                              state.currency === "NGN"
                                ? NGN
                                : state.currency === "EUR"
                                ? US
                                : state.currency === "GBP"
                                ? GB
                                : EU
                            }
                            alt=""
                            width={25}
                          />{" "}
                          {state.currency}
                        </div>
                        <input
                          type="text"
                          name=""
                          id=""
                          value={
                            allbusiness.loanAmount === undefined
                              ? allbusiness.requestedAmount
                              : allbusiness.loanAmount
                          }
                          readOnly
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            border: "none",
                            height: "40px",
                            outline: "none",
                            background: "",
                            padding: "8px 16px 8px 16px",
                            backgroundColor: "#ECEFF3",
                            letterSpacing: "2%",
                            fontWeight: "500",
                            fontSize: "16px",
                          }}
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                  </div>

                  {state.customtype === "Factoring" && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          width: "100%",
                        }}
                      >
                        <span
                          htmlFor=""
                          style={{
                            fontSize: "14px",
                            lineHeight: "19.6px",
                            fontWeight: "600",
                            color: "#101828",
                          }}
                        >
                          Due Date
                        </span>
                        <div
                          className=""
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                            }}
                          >
                            <input
                              type="date"
                              name=""
                              id=""
                              value={date}
                              onChange={(e) => {
                                setdate(e.target.value);
                              }}
                              style={{
                                width: "100%",
                                borderRadius: "8px",
                                border: "none",
                                height: "40px",
                                outline: "none",
                                background: "",
                                padding: "8px 16px 8px 16px",
                                backgroundColor: "#ECEFF3",
                                letterSpacing: "2%",
                                fontWeight: "500",
                                fontSize: "16px",
                              }}
                              placeholder="Enter Due Date"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="">
                    <button
                      disabled={isdisable}
                      style={{
                        maxWidth: "280px",
                        width: "100%",
                        background: isdisable ? "#EBE4FF" : "#6F00FF",
                        padding: "16px 24px 16px 24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "none",
                        outline: "none",
                        minHeight: "46px",
                        borderRadius: "8px",
                        fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "2%",
                        fontWeight: "600",
                        color: isdisable ? "#BFA6FF" : "#ffff",
                      }}
                    >
                      {loader === true ? <Loading /> : "Send funds"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
