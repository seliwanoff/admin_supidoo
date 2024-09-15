import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import SerHeader from "../components/SerHeader";

// import "../style/slider.css";
// import '../style/main.css'
// import info from '../asset/images/iconinfo.svg'
import US from "../assets/images/EU.svg";
import NGN from "../assets/images/ngnnigeria.jpg";
import EU from "../assets/images/usds.svg";
import USs from "../assets/images/US.svg";
import axios from "axios";
import Loading from "../components/loading";

const RecordPayment = () => {
  // const navigate = useNavigate();
  const { state } = useLocation();
  const [loader, setloader] = useState(false);
  const [isdisable, setisdisable] = useState(true);
  const [amount, setamount] = useState("");
  const [bankName, setbankName] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const [AccountName, setaccountName] = useState("");
  // const [date, setDate] = useState(new Date())

  const [success, setsucess] = useState(false);
  const [fail, setfail] = useState(false);
  const [message, setmessage] = useState("");
  const [selectedstructure, setstructure] = useState("");
  const navigate = useNavigate();
  const [allbusiness, setallbusiness] = useState([]);
  //console.log(selectedstructure);
  const structures = ["30", "60", "90"];
  const structuresm = ["Bullet", "InterestFirst", "FullPayment"];
  function changeStructure(m) {
    if (m === "FullPayment") {
      return "Full Payment";
    } else if (m === "InterestFirst") {
      return "Interest First";
    } else {
      return m;
    }
  }
  //console.log(changeStructure(selectedstructure));
  useEffect(() => {
    setamount(state.amountRemaining);
  }, [state.amountRemaining, setamount]);
  // console.log(state);

  useEffect(() => {
    if (success) {
      let timer = setTimeout(() => {
        navigate(-1);
        setsucess(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
    if (fail) {
      let timer = setTimeout(() => {
        setfail(false);
        // navigate(-1)
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  });

  useEffect(() => {
    if (
      amount !== "" &&
      bankName !== "" &&
      accountNumber !== "" &&
      AccountName !== ""
    ) {
      setisdisable(false);
    } else {
      setisdisable(true);
    }
  }, [setisdisable, amount, bankName, accountNumber, AccountName]);
  // console.log(state);
  const submitHandler = async (e) => {
    e.preventDefault();

    setloader(true);
    e.preventDefault();
    const data = {
      amount: amount.toString(),
      fundRequestId: state?._id,
      BankName: bankName,
      AccountNumber: accountNumber,
      AccountName: AccountName,
    };
    // console.log(data)
    await axios
      .post(`/v1/admin/transaction/fund_request/record_payment`, data)
      .then((res) => {
        // console.log(res);
        setsucess(true);
        setmessage("Record payement successfully");
        setloader(false);
      })
      .catch((e) => {
        console.log(e);
        setfail(true);
        setloader(false);
        setmessage(
          e.response?.data.message
            ? e.response?.data.message
            : "Sorry, Something went wrong"
        );
      });
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
          <title>Record Payment</title>
        </Helmet>

        <SerHeader header={"Record Payment"} />
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
                maxWidth: "592px",
              }}
            >
              {success && (
                <div className="success" style={{ width: "100%" }}>
                  <div className="lg-success">
                    <div className="ech-lg-hm">
                      <div className="main-sucees">Success</div>
                      <span style={{ fontSize: "12px" }}>{message} </span>
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
                      style={{ background: "#F9FAFB" }}
                    >
                      <div className="main-sucees" style={{ color: "#344054" }}>
                        Failed
                      </div>
                      <span style={{ color: "#344054" }}>{message} </span>
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
                    Record Payment
                  </div>
                  <span
                    style={{
                      color: "#667085",
                      fontWeight: "400",
                      lineHeight: "24px",
                      fontSize: "1rem",
                      letterSpacing: "2%",
                    }}
                  >
                    Enter payment received details.
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
                              state?.currency === "NGN"
                                ? NGN
                                : state?.currency === "EUR"
                                ? US
                                : state?.currency === "USD"
                                ? USs
                                : EU
                            }
                            alt=""
                            width={25}
                          />{" "}
                          {state?.currency}
                        </div>
                        <input
                          type="number"
                          name=""
                          id=""
                          readOnly={state.type === "complete" ? true : false}
                          value={amount}
                          onChange={(e) => {
                            setamount(e.target.value);
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
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                  </div>
                  {/**
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
                      Date
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
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                          value={date}
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            border: "none",
                            height: "46px",
                            outline: "none",
                            background: "",
                            padding: "8px 16px 8px 16px",
                            backgroundColor: "#ECEFF3",
                            letterSpacing: "2%",
                            fontWeight: "500",
                            fontSize: "16px",
                          }}
                          placeholder="Enter Structure"
                        />
                      </div>
                    </div>
                  </div>
                  */}
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
                      Sender Details
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
                          type="text"
                          name=""
                          id=""
                          onChange={(e) => {
                            setbankName(e.target.value);
                          }}
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            border: "none",
                            height: "46px",
                            outline: "none",
                            background: "",
                            padding: "8px 16px 8px 16px",
                            backgroundColor: "#ECEFF3",
                            letterSpacing: "2%",
                            fontWeight: "500",
                            fontSize: "16px",
                          }}
                          value={bankName}
                          placeholder="Enter Bank"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        width: "100%",
                        marginTop: "10px",
                      }}
                    >
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
                            type="text"
                            name=""
                            id=""
                            onChange={(e) => {
                              setaccountNumber(e.target.value);
                            }}
                            value={accountNumber}
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                              border: "none",
                              height: "46px",
                              outline: "none",
                              background: "",
                              padding: "8px 16px 8px 16px",
                              backgroundColor: "#ECEFF3",
                              letterSpacing: "2%",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                            placeholder="Enter Account Number"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        width: "100%",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexDirection: "column",
                          marginTop: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <input
                            type="text"
                            name=""
                            id=""
                            onChange={(e) => {
                              setaccountName(e.target.value);
                            }}
                            value={AccountName}
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                              border: "none",
                              height: "46px",
                              outline: "none",
                              background: "",
                              padding: "8px 16px 8px 16px",
                              backgroundColor: "#ECEFF3",
                              letterSpacing: "2%",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                            placeholder="Enter Account Name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

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
                      {loader === true ? <Loading /> : "Send funds"}{" "}
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

export default RecordPayment;
