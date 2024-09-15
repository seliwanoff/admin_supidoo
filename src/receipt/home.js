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
import axios from "axios";
import Loading from "../components/loading";
import tradereceipt from "../assets/images/receipttrade.svg";

const Receipt = () => {
  // const navigate = useNavigate();
  const { state } = useLocation();
  const [loader, setloader] = useState(false);
  const [isdisable, setisdisable] = useState(true);
  const [amount, setamount] = useState(
    state?.loanAmount !== "" ? state.loanAmount : state.requestedAmount
  );
  const [success, setsucess] = useState(false);
  const [fail, setfail] = useState(false);
  const [message, setmessage] = useState("");
  const [date, setdate] = useState(new Date());
  const navigate = useNavigate();
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
        amount: amount,
      };

      await axios
        .post(`/v1/admin/sendFinanceFundToTradeCredit/${state._id}`, data)
        .then((res) => {
          console.log(res);
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
              : "An Error occur"
          );
        });
    } else if (state.customtype === "Credit Line") {
      setloader(true);
      e.preventDefault();
      const data = {
        amount: amount,
      };

      await axios
        .post(`/v1/admin/sendFinanceFundToCreditLine/${state._id}`, data)
        .then((res) => {
          console.log(res);
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
              : "An Error occur"
          );
        });
    } else if (state.customtype === "Factoring") {
      setloader(true);
      e.preventDefault();
      const data = {
        amount: amount,
        dueDate: new Date(date),
      };

      await axios
        .post(`/v1/admin/sendFinanceFundToFinanceInvoice/${state._id}`, data)
        .then((res) => {
          console.log(res);
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
              : "An Error occur"
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
          <title>View Receipt</title>
        </Helmet>

        <SerHeader header={"View Receipt"} />
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
            <div
              onSubmit={submitHandler}
              className="form-general-layout new-form"
              style={{
                boxSizing: "border-box",
                position: "relative",
                background: "#ffffff",
              }}
            >
              <div className="my_head_tag_b">
                <img src={tradereceipt} alt="" />
                <span className="receipt_tag">REceipt</span>
              </div>
              <div className="secd-tag-bd">
                <div className="mid-tag-bd-lg">
                  <div className="centered_tag">
                    <div className="inner_md_tag">
                      <h3 className="h3-tp-mg">Receipt</h3>
                      <span className="effective_date">
                        Effective :{" "}
                        {new Date(state.transactionDate).toDateString()}
                      </span>
                    </div>
                  </div>
                  <div
                    className="each_tab_fil"
                    style={{
                      borderBottom: "1px solid #D7DDEA",
                    }}
                  >
                    <div
                      className="each_fil_tag_lg"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <span className="each_first_tag_label">STATUS</span>
                      <span
                        className="status_label_tg"
                        style={{
                          color: "#12B76A",
                        }}
                      >
                        {state.status}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      borderBottom: "1px solid #D7DDEA",
                      paddingBottom: "20px",
                    }}
                  >
                    <div className="each_fil_tag_lg">
                      <span className="each_first_tag_label">
                        Transaction Amount
                      </span>
                      <span className="status_label_tg">
                        {state.currency === "NGN"
                          ? "₦"
                          : state.currency === "EUR"
                          ? "€"
                          : state.currency === "USD"
                          ? "$"
                          : "£"}
                        {state.amount}
                      </span>
                    </div>
                    <div className="each_fil_tag_lg">
                      <span className="each_first_tag_label">
                        Recipient Receive
                      </span>
                      <span className="status_label_tg">
                        {state.currency === "NGN"
                          ? "₦"
                          : state.currency === "EUR"
                          ? "€"
                          : state.currency === "USD"
                          ? "$"
                          : "£"}
                        {state.amount}
                      </span>
                    </div>
                    <div className="each_fil_tag_lg">
                      <span className="each_first_tag_label">Fee</span>
                      <span className="status_label_tg">
                        {state.currency === "NGN"
                          ? "₦"
                          : state.currency === "EUR"
                          ? "€"
                          : state.currency === "USD"
                          ? "$"
                          : "£"}{" "}
                        {state.PaymentType === "credit"
                          ? 0
                          : state?.transactionFee}
                      </span>
                    </div>
                    <div className="each_fil_tag_lg">
                      <span className="each_first_tag_label">Type</span>
                      <span className="status_label_tg">
                        {state.TransactionType === "WalletCredit"
                          ? "Wallet Credit"
                          : state.TransactionType}
                      </span>
                    </div>
                    <div className="each_fil_tag_lg">
                      <span className="each_first_tag_label">Time</span>
                      <span className="status_label_tg">
                        {new Date(state.transactionDate).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div className="each_fil_tag_lg">
                      <span className="each_first_tag_label">Sender</span>
                      <span className="status_label_tg">
                        {state.accountName}
                      </span>
                    </div>
                    <div className="each_fil_tag_lg">
                      <span className="each_first_tag_label">Recipient</span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                        }}
                        className="status_label_tg"
                      >
                        <span className="">{state.business.name}</span>
                        <span className="nw_lt_fg">
                          {state?.accountNumber} . {state?.bankName}
                        </span>
                      </div>
                    </div>
                    <div className="each_fil_tag_lg">
                      <span className="each_first_tag_label">Note</span>
                      <span className="status_label_tg">none</span>
                    </div>
                    <div className="each_fil_tag_lg">
                      <span className="each_first_tag_label">Reference</span>
                      <span
                        className="status_label_tg"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {state.TransactionReference}
                      </span>
                    </div>
                  </div>
                  <div className="footer_lg">
                    <span>
                      If you have questions for us, please call a representative
                      at <span style={{ color: "#6F00FF" }}>08030303030</span>{" "}
                      or send a mail to{" "}
                      <span style={{ color: "#6F00FF" }}>me@tradevu.com.</span>{" "}
                      Thanks for using TradeVu
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
