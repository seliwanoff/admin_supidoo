import Header from "../components/header";

import Greetings from "../components/greetings";
import angledown from "../assets/images/angle-down.svg";
import arrowup from "../assets/images/arrow-up2.svg";
import letter from "../assets/images/requestletter.svg";
import factoring from "../assets/images/factoring.svg";
import credit from "../assets/images/tradecredit.svg";
import charts from "../assets/images/charts.svg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import LoaderDate from "../components/loaderData";

const Dashboard = () => {
  const selector = useSelector((state) => state.stats);
  const selectoruser = useSelector((state) => state.users);

  const navigate = useNavigate();

  const [financess, setFinance] = useState([]);
  const [transaction, setTransactiion] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [isloadingfinnace, setisloadfinance] = useState(true);
  const [isloadingtransaction, setisloadingtransaction] = useState(true);

  const [business, setBusiness] = useState([]);

  useEffect(() => {
    const fetcFinance = async () => {
      await axios
        .get("/v1/admin/finance-requests")
        .then((res) => {
          //console.log(res)
          setFinance(res.data.data?.reverse()?.slice(0,10));
          setisloadfinance(false);
        })
        .catch((e) => {
          console.log(e);
          setisloadfinance(false);
        });
    };
    fetcFinance();
  }, []);
  useEffect(() => {
    const fetchTototalPayment = async () => {
      await axios
        .get("/v1/admin/payment-volume")
        .then((res) => {
      //    setFinance(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchTototalPayment();
  }, []);
  useEffect(() => {
    const fetchTransaction = async () => {
      await axios
        .get("/v1/admin/get-recent-transactions")
        .then((res) => {
          setTransactiion(res.data.data?.reverse()?.slice(0,10));
          setisloadingtransaction(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchTransaction();
  }, []);
  useEffect(() => {
    const fetchBusiness = async () => {
      await axios
        .get("/v1/admin/get-all-businesses")
        .then((res) => {
          setBusiness(res.data.data?.slice(0,10));
          setisloading(false);
        })
        .catch((e) => {
          console.log(e);
          setisloading(false);
        });
    };
    fetchBusiness();
  }, []);

  return (
    <>
      <div className="main">
        <Header />
        <div className="info-cl">
          <Greetings  users={selectoruser}/>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "30px",
            }}
          >
            <div className="main-info-con">
              <div className="stat-con">
                <div className="overview">
                  <h4
                    style={{
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    Overview
                  </h4>
                  <div className="drop-stat">
                    <span className="all-time">All time</span>
                    <img src={angledown} alt="" />
                  </div>
                </div>
                <div className="stat-log-con">
                  <div className="main-card-each">
                    <div className="innercard">
                      <h5>transactions</h5>
                      <div className="stat-line">
                        <span> {selector.transactions} </span>
                       
                      </div>
                    </div>
                  </div>
                  <div className="main-card-each">
                    <div className="innercard">
                      <h5>requests</h5>
                      <div className="stat-line">
                        <span> {selector.finances} </span>
                       
                      </div>
                    </div>
                  </div>
                  <div className="main-card-each">
                    <div className="innercard">
                      <h5>customers</h5>
                      <div className="stat-line">
                        <span> {selector.users} </span>
                       
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ height: "500px" }}>
                  <img
                    src={charts}
                    alt=""
                    style={{
                      overflow: "hidden",
                      boxSizing: "border-box",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="main-info-con-right">
              <div className="head-title-lg">
                <h5>new requests</h5>
                <span className="view-all-lg">View all</span>
              </div>
              {isloadingfinnace && <LoaderDate />}
              {isloadingfinnace === false &&
                financess.map((res, index) => (
                  <div className="main-lg-request" key={index}>
                    <div className="each-request">
                      <div className="img-name">
                        {res.financeType === "tradecredit" ? (
                          <img src={factoring} alt="" />
                        ) : res.financeType === "letterofcredit" ? (
                          <img src={letter} alt="" />
                        ) : (
                          <img src={credit} alt="" />
                        )}

                        <div className="mytag-lg">
                          <div className="head-tg">Invoice</div>
                          <span
                            className="small-tg"
                            style={{ textTransform: "capitalize" }}
                          >
                            {res.financeType === 'tradecredit' ? 'Working Capital' : res.financeType === 'LetterOfCredit' ? 'Credit Line' : res.financeType}{" "}
                          </span>
                        </div>
                      </div>
                      <div className="mytag-lg">
                        <div
                          className="head-tg"
                          style={{
                            color: "#344054",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "19.6px",
                            textAlign: "right",
                          }}
                        >
                          {res.currency === "NGN"
                            ? "₦"
                            : res.currency === "USD"
                            ? "$"
                            : res.currency === "EUR"
                            ? "€"
                            : "£"}
                          {res.requestedAmount}{" "}
                        </div>
                        <span
                          className="small-tg"
                          style={{ textAlign: "right" }}
                        >
                          {new Date(res.updatedAt).toDateString()}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}{" "}
            </div>
          </div>
          <div className="bg-lg-info">
            <div className="each-lg-card-info">
              <div className="head-title-lg">
                <h5>new KYC</h5>
                <span className="view-all-lg">View all</span>
              </div>
              {isloading && <LoaderDate />}
              {isloading === false &&
                business.map((res, index) => (
                  <div
                    className="main-lg-request"
                    style={{ cursor: "pointer" }}
                    key={index}
                    onClick={() => navigate(`/account/${res._id}`,{
                      state: {
                        ...res
                      }
                    })}
                  >
                    <div className="each-request">
                      <div className="img-name">
                        <img src={factoring} alt="" />
                        <div className="mytag-lg">
                          <div className="head-tg">{res?.name}</div>
                          <span className="small-tg">
                            {res?.user?.firstName} {res?.user?.lastName}
                          </span>
                        </div>
                      </div>
                      <div className="mytag-lg">
                        <div
                          className="head-tg"
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            lineHeight: "16.2px",
                            color: "#344054",
                          }}
                        >
                          {res?.user?.email}{" "}
                        </div>
                        <span
                          className="small-tg"
                          style={{ textAlign: "right" }}
                        >
                          {new Date(res?.createdAt).toDateString()}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}{" "}
            </div>
            <div className="each-lg-card-info">
              <div className="head-title-lg">
                <h5>recent transactions</h5>
                <span className="view-all-lg">View all</span>
              </div>
              {isloadingtransaction && <LoaderDate />}
              {isloadingtransaction === false &&
                transaction.map((res, index) => (
                  <div className="main-lg-request" key={index}>
                    <div className="each-request">
                      <div className="img-name">
                        <img src={factoring} alt="" />
                        <div className="mytag-lg">
                          <div className="head-tg">{res?.accountName ? res.accountName : res.narration}</div>
                          <span className="small-tg">
                            {res.TransactionType}
                          </span>
                        </div>
                      </div>
                      <div className="mytag-lg">
                        <div
                          className="head-tg"
                          style={{
                            color: "#344054",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "19.6px",
                            textAlign: "right",
                          }}
                        >
                          {res.currency === "NGN"
                            ? "₦"
                            : res.currency === "USD"
                            ? "$"
                            : res.currency === "EUR"
                            ? "€"
                            : "£"}
                          {res.amount}{" "}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
