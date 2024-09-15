import Header from "../components/header";
import React, { PureComponent } from "react";

import Greetings from "../components/greetings";
import angledown from "../assets/images/angle-down.svg";
import arrowup from "../assets/images/arrow-up2.svg";
import letter from "../assets/images/requestletter.svg";
import factoring from "../assets/images/factoring.svg";
import credit from "../assets/images/tradecredit.svg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import LoaderDate from "../components/loaderData";
import NG from "../assets/images/nig.svg";
import trendinflow from "../assets/images/trend.svg";
import trendoutflow from "../assets/images/trendout.svg";
import { Link } from "react-router-dom";
import depositimage from "../assets/images/depositwallet.svg";
import chart from "../assets/images/charts.svg";
import CurrencyModal from "../components/currencymodal";
import US from "../assets/images/EU.svg";
import EU from "../assets/images/usds.svg";
import GB from "../assets/images/GB.svg";
import check from "../assets/images/Checkbox.svg";
import arrow_right from "../assets/images/arrow-right.svg";

import { changeFoemat } from "../components/amountFormat";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../components/loader";
import CurrencyModal2 from "../components/cureencymodal2";
import CurrencyModal3 from "../components/currencymodal3";
import CurrencyModal1 from "../components/currencymodal1";
import currencyPairCheck from "../components/logoCurrency";
import AmountCheck from "../components/amountcheck";

const DashboardHome = () => {
  const selector = useSelector((state) => state.stats);
  const selectoruser = useSelector((state) => state.users);
  const [totalcount] = useState(4200);
  const [tiles, settiles] = useState([]);
  const [metrics, setmetrics] = useState([]);
  const [selectedcurrenncy, setdefaultcurrency] = useState("NGN");
  const [selectedcurrenncy2, setdefaultcurrency2] = useState("NGN");
  const [selectedcurrenncy3, setdefaultcurrency3] = useState("NGN");

  const [selecteditems, setselecteditems] = useState([]);
  const [selecteditems2, setselecteditems2] = useState([]);
  const [selecteditems3, setselecteditems3] = useState([]);

  const [type, settype] = useState("1");

  const [show, setshow] = useState(false);
  const [show2, setshow2] = useState(false);
  const [show3, setshow3] = useState(false);

  const [items, settotalbysources] = useState([]);
  const [lists, setlists] = useState([]);
  const [loans, settotalloans] = useState([]);
  const [selectedindex, setselectedindex] = useState(0);
  const [showtime, setshowtime] = useState(false);
  const [selectedtime, setselectedtime] = useState("All time");
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [transactionlist, settransactionlist] = useState([]);
  const [sectionloader, setsectionloader] = useState(true);
  const [sectionloader2, setsectionloader2] = useState(true);

  const times = [
    "All time",
    "Past year",
    "Past month",
    "Past week",
    "Past 24 hours",
  ];

  const getChangesDate = (index) => {
    if (index == 1) {
      const currentDate = new Date();
      setstartDate(currentDate);

      // Calculate the date from one year ago
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
      setendDate(oneYearAgo);
    } else if (index == 2) {
      const currentDate = new Date();
      setstartDate(currentDate);

      // Calculate the date from one month ago
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);
      setendDate(oneMonthAgo);
    } else if (index == 3) {
      const currentDate = new Date();
      setstartDate(currentDate);
      // Calculate the date from one week ago
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(currentDate.getDate() - 7);
      setendDate(oneWeekAgo);
    } else if (index == 4) {
      const currentDate = new Date();
      setstartDate(currentDate);

      // Calculate the date from 24 hours ago
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(currentDate.getHours() - 24);
      setendDate(twentyFourHoursAgo);
    }
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const sorter = (a, b) => {
    return months.indexOf(a.month) - months.indexOf(b.month);
  };
  lists.sort(sorter);

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
          //  setFinance(res.data.data?.reverse()?.slice(0, 5));
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
        .get("admin/withdrawstatics")
        .then((res) => {
          console.log(res);
          setFinance(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchTototalPayment();
  }, []);
  useEffect(() => {
    const fetchTiles = async () => {
      await axios
        .get(`admin/userstatistic`)
        .then((res) => {
          settiles(res.data);
          setsectionloader(false);
        })
        .catch((e) => {
          console.log(e);
          setsectionloader(false);
        });
    };
    fetchTiles();
  }, []);
  useEffect(() => {
    const Metrics = async () => {
      if (selectedindex === 0) {
        await axios
          .get(`/v1/admin/transaction/metrics?currency=${selectedcurrenncy}`)
          .then((res) => {
            setmetrics(res.data.data);
            settotalbysources(res.data.data.totalBySource);
            setsectionloader2(false);
          })
          .catch((e) => {
            console.log(e);
            setsectionloader2(false);
          });
      } else {
        await axios
          .get(
            `/v1/admin/transaction/metrics?currency=${selectedcurrenncy}&startDate=${new Date(
              endDate
            ).toISOString()}&endDate=${new Date(startDate).toISOString()}`
          )
          .then((res) => {
            setmetrics(res.data.data);
            settotalbysources(res.data.data.totalBySource);
            setsectionloader2(false);
          })
          .catch((e) => {
            console.log(e);
            setsectionloader2(false);
          });
      }
    };
    Metrics();
  }, [selectedindex, startDate, endDate]);
  // console.log(items);
  useEffect(() => {
    const fetchChart = async () => {
      if (selectedindex === 0) {
        await axios
          .get(`/v1/admin/dashboard/charts?currency=${selectedcurrenncy}`)
          .then((res) => {
            settransactionlist(res.data.data.transactionHistory);
            setlists(res.data.data.loanHistory);
            settotalloans(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        await axios
          .get(
            `/v1/admin/dashboard/charts?currency=${selectedcurrenncy}&startDate=${new Date(
              endDate
            ).toISOString()}&endDate=${new Date(startDate).toISOString()}`
          )
          .then((res) => {
            setlists(res.data.data.loanHistory);
            settotalloans(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    fetchChart();
  }, [selectedindex, startDate, endDate]);
  let listsgroup = lists.reduce((r, e) => {
    let alphabet = months[new Date(e.createdAt).getMonth()];
    if (!r[alphabet])
      r[alphabet] = {
        alphabet,
        record: [],
        totalAmount: 0, // Initialize totalAmount for each month
      };

    r[alphabet].record.push(e);
    r[alphabet].totalAmount += e.amount || 0; // Add the amount to totalAmount

    return r;
  }, {});
  let newlist = Object.values(listsgroup);
  let sortedList = Object.values(listsgroup).sort(
    (a, b) => months.indexOf(a.alphabet) - months.indexOf(b.alphabet)
  );

  let transactionlistgroup = transactionlist.reduce((r, e) => {
    let name = months[new Date(e.createdAt).getMonth()].slice(0, 3);
    if (!r[name])
      r[name] = {
        name,
        record: [],

        uv: 0,
        //amt:0// Initialize totalAmount for each month
      };

    r[name].record.push(e);
    r[name].uv += e.amount || 0; // Add the amount to totalAmount

    return r;
  }, {});
  let newlisttransaction = Object.values(transactionlistgroup);
  let sortedListtransaction = Object.values(transactionlistgroup).sort(
    (a, b) => months.indexOf(b.name) - months.indexOf(a.name)
  );

  items?.sort(function (a, b) {
    return b.amount - a.amount;
  });
  //console.log(items);
  function formatAmount(amount, divider) {
    if (amount / divider >= 1000000) {
      return ((amount * divider) / 1000000)?.toFixed(0) + "M";
    } else if (amount * divider >= 1000) {
      return ((amount * divider) / 1000)?.toFixed(0) + "K";
    } else if (amount / divider >= 100) {
      return ((amount * divider) / 100)?.toFixed(0) + "H";
    } else {
      return amount?.toFixed(0);
    }
  }

  useEffect(() => {
    const fetchTransaction = async () => {
      await axios
        .get("admin/refstatics")
        .then((res) => {
          setTransactiion(res.data);
          setisloadingtransaction(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchTransaction();
  }, []);
  function formatAmounts(amount) {
    if (amount >= 1000000) {
      return (amount / 1000000)?.toFixed(2) + "M";
    } else if (amount >= 1000) {
      return (amount / 1000)?.toFixed(2) + "K";
    } else {
      return amount.toFixed(2);
    }
  }
  useEffect(() => {
    const fetchBusiness = async () => {
      await axios
        .get("/getusers")
        .then((res) => {
          setBusiness(res.data.data.data?.slice(0, 5));
          setisloading(false);
        })
        .catch((e) => {
          console.log(e);
          setisloading(false);
        });
    };
    fetchBusiness();
  }, []);
  const sum = items?.reduce((accumulator, object) => {
    return accumulator + object.amount;
  }, 0);
  // console.log(sum);
  const getdetailbytype = async (name) => {
    if (selectedindex === 0) {
      await axios
        .get(`/v1/admin/transaction/metrics?currency=${name}`)
        .then((res) => {
          // console.log(res);
          // setmetrics(res.data.data);
          settotalbysources(res.data.data.totalBySource);
          setsectionloader2(false);
        })
        .catch((e) => {
          console.log(e);
          setsectionloader2(false);
        });
    } else {
      await axios
        .get(
          `/v1/admin/transaction/metrics?currency=${name}&startDate=${new Date(
            endDate
          ).toISOString()}&endDate=${new Date(startDate).toISOString()}`
        )
        .then((res) => {
          //   setmetrics(res.data.data);
          settotalbysources(res.data.data.totalBySource);
          setsectionloader2(false);
        })
        .catch((e) => {
          console.log(e);
          setsectionloader2(false);
        });
    }
  };
  const getChart = async (value) => {
    if (selectedindex === 0) {
      await axios
        .get(`/v1/admin/dashboard/charts?currency=${value}`)
        .then((res) => {
          settransactionlist(res.data.data.transactionHistory);
          setlists(res.data.data.loanHistory);
          settotalloans(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      await axios
        .get(
          `/v1/admin/dashboard/charts?currency=${value}&startDate=${new Date(
            endDate
          ).toISOString()}&endDate=${new Date(startDate).toISOString()}`
        )
        .then((res) => {
          setlists(res.data.data.loanHistory);
          settotalloans(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const getMain = async (value) => {
    if (selectedindex === 0) {
      await axios
        .get(`/v1/admin/transaction/metrics?currency=${value}`)
        .then((res) => {
          setmetrics(res.data.data);
          //  settotalbysources(res.data.data.totalBySource);
          setsectionloader2(false);
        })
        .catch((e) => {
          console.log(e);
          setsectionloader2(false);
        });
    } else {
      await axios
        .get(
          `/v1/admin/transaction/metrics?currency=${value}&startDate=${new Date(
            endDate
          ).toISOString()}&endDate=${new Date(startDate).toISOString()}`
        )
        .then((res) => {
          setmetrics(res.data.data);
          //  settotalbysources(res.data.data.totalBySource);
          setsectionloader2(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <>
      <div className="main">
        <Header />
        <CurrencyModal1
          setshow={setshow}
          show={show}
          setdefaultcurrency={setdefaultcurrency}
          setselecteditems={setselecteditems}
          getdetailbytype={getMain}

          // Metrics={fetchMetrics}
        />
        <CurrencyModal2
          setshow={setshow2}
          show={show2}
          setselecteditems={setselecteditems2}
          setdefaultcurrency={setdefaultcurrency2}
          getdetailbytype={getdetailbytype}
        />
        <CurrencyModal3
          setshow={setshow3}
          show={show3}
          setselecteditems={setselecteditems3}
          setdefaultcurrency={setdefaultcurrency3}
          getdetailbytype={getChart}
        />
        <div className="info-cl">
          <Greetings users={selectoruser} />
          {/**
          <div className="main_lg_th_lh_log_stat">
            <div className="each_section_sm_lg_stat">
              <div className="top_band_klg_state">
                <div className="main_transact_count">
                  <h5 className="total_tansact_stat">TOTAL transactions</h5>
                  <div
                    className="circular_currency_lg"
                    onClick={() => {
                      setshow(true);
                    }}
                  >
                    <div className="circular_logo_currency">
                      <img
                        height={24}
                        src={
                          selectedcurrenncy === "NGN"
                            ? NG
                            : selectedcurrenncy === "GBP"
                            ? GB
                            : selectedcurrenncy === "EUR"
                            ? US
                            : EU
                        }
                        alt=""
                      />
                    </div>
                    <span className="logo_name_sm">{selectedcurrenncy}</span>

                    <span
                      className="material-icons"
                      style={{
                        color: "#FBFAFF",
                        fontWeight: "400",
                      }}
                    >
                      expand_more
                    </span>
                  </div>
                </div>
                <div className="balance_lg_stat_cur">
                  {selectedcurrenncy === "NGN"
                    ? "₦"
                    : selectedcurrenncy === "USD"
                    ? "$"
                    : selectedcurrenncy === "EUR"
                    ? "€"
                    : "£"}

                  {AmountCheck(
                    parseFloat(metrics?.totalInflow) +
                      parseFloat(metrics?.totalOutflow)
                  )}
                </div>
              </div>
              <div className="bottom_band_tile_stat">
                <div className="each_stat_set_lg">
                  <span className="count_set_lg">
                    {selectedcurrenncy === "NGN"
                      ? "₦"
                      : selectedcurrenncy === "USD"
                      ? "$"
                      : selectedcurrenncy === "EUR"
                      ? "€"
                      : "£"}
                    {AmountCheck(metrics?.totalInflow)}
                  </span>
                  <img src={trendinflow} alt="" />
                </div>
                <div className="each_stat_set_lg">
                  <span className="count_set_lg">
                    {selectedcurrenncy === "NGN"
                      ? "₦"
                      : selectedcurrenncy === "USD"
                      ? "$"
                      : selectedcurrenncy === "EUR"
                      ? "€"
                      : "£"}{" "}
                    {AmountCheck(metrics?.totalOutflow)}
                  </span>
                  <img src={trendoutflow} alt="" />
                </div>
              </div>
            </div>
            <div
              className="each_section_sm_lg_stat"
              style={{
                width: "calc(100% - 728px)",
                background: "#ffffff",
                minWidth: "500px",
              }}
            >
              <div className="top_band_klg_state">
                <div className="main_transact_count">
                  <h5
                    className="total_tansact_stat"
                    style={{
                      color: "#667085",
                    }}
                  >
                    Transaction type
                  </h5>
                  <div
                    className="circular_currency_lg"
                    style={{
                      border: "1px solid #E7E9FB",
                      padding: "8px",
                    }}
                    onClick={() => {
                      setshow2(true);
                      // settype("2");
                    }}
                  >
                    <img
                      height={20}
                      src={
                        selectedcurrenncy2 === "NGN"
                          ? NG
                          : selectedcurrenncy2 === "GBP"
                          ? GB
                          : selectedcurrenncy2 === "EUR"
                          ? US
                          : EU
                      }
                      alt=""
                    />
                    <span
                      className="logo_name_sm"
                      style={{
                        color: "#101828",
                      }}
                    >
                      {selectedcurrenncy2}
                    </span>

                    <span
                      className="material-icons"
                      style={{
                        color: "#475467",
                        fontWeight: "400",
                      }}
                    >
                      expand_more
                    </span>
                  </div>
                </div>
                {items.length === 0 && <div className="centered">No Data</div>}
                {items.length !== 0 && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        width: "100%",
                      }}
                    >
                      <div
                        className="progress_step_lg"
                        style={{
                          width: "100%",
                        }}
                      >
                        {items?.map((res, index) => (
                          <div
                            className="each_progress_lg_steps"
                            key={index}
                            style={{
                              width: `${
                                index === 0
                                  ? "40%"
                                  : index === 1
                                  ? "30%"
                                  : index === 2
                                  ? "20%"
                                  : index === 3 && "10%"
                              }`,

                              //width: `calc(${Math.round(
                              //parseFloat(res.amount / parseFloat(sum))
                              //  )} * 100% + 25%)`,
                            }}
                          >
                            <div
                              className="progress_main_lg"
                              style={{
                                background:
                                  index === 3
                                    ? "#D9CDFF"
                                    : index === 1
                                    ? "#7D14FF"
                                    : index === 2
                                    ? "#A173FF"
                                    : "",
                              }}
                            ></div>
                            <span className="tag_step">
                              {res.name === "Wallet"
                                ? "Payments"
                                : res.name === "TradeCredit"
                                ? "Working Capital "
                                : res.name === "FinanceInvoice"
                                ? "Factoring"
                                : res.name === "CreditLine" && "Credit Line"}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          border: "1px solid #E7E9FB",
                        }}
                      ></div>
                      <div className="log-bar-chart">
                        {items?.map((res, index) => (
                          <div
                            className="each-hor-bar"
                            style={{
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                width:
                                  Math.round(parseFloat(res.amount / sum)) > 0
                                    ? `calc(${Math.round(
                                        parseFloat(res.amount / sum)
                                      )} * 100%)`
                                    : `calc(${parseFloat(
                                        res.amount / sum
                                      )} * 100%  + 1%)`,
                                background:
                                  index === 3
                                    ? "#D9CDFF"
                                    : index === 1
                                    ? "#7D14FF"
                                    : index === 2
                                    ? "#A173FF"
                                    : "#4e03af",
                                height: "8px",
                                borderRadius: "1px",
                              }}
                            ></div>
                            <span className="hor-count">{res.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div
              className="each_section_sm_lg_stat"
              style={{
                background: "#ffffff",
              }}
            >
              <div className="top_band_klg_state">
                <div className="main_transact_count">
                  <h5
                    className="total_tansact_stat"
                    style={{
                      color: "#667085",
                    }}
                  >
                    Last Transaction
                  </h5>
                  <Link to={"/"} className="link_to">
                    View all
                  </Link>
                </div>
                <div
                  style={{
                    border: "1px solid #E7E9FB",
                  }}
                ></div>
                <div className="top_wallet_stat_last">
                  <img
                    src={depositimage}
                    alt=""
                    style={{ marginTop: "10px" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <span className="wallettopup">
                      {metrics?.lastTransaction?.PaymentType === "credit"
                        ? "Wallet Top Up"
                        : metrics?.lastTransaction?.PaymentType === "debit"
                        ? "Wallet Debit"
                        : ""}
                    </span>
                    <span className="cardpayment">
                      {metrics?.lastTransaction?.accountNumber
                        ? "Transfer"
                        : metrics?.lastTransaction?.narration}
                    </span>
                  </div>
                </div>
                <div className="amount_recent">
                  {metrics?.lastTransaction?.PaymentType === "Debit"
                    ? "-"
                    : metrics?.lastTransaction?.PaymentType === "credit"
                    ? "-"
                    : ""}{" "}
                  {metrics?.lastTransaction?.currency === "NGN"
                    ? "₦"
                    : metrics.lastTransaction?.currency === "USD"
                    ? "$"
                    : metrics.lastTransaction?.currency === "EUR"
                    ? "€"
                    : metrics.lastTransaction?.currency === "GBP"
                    ? "£"
                    : ""}
                  {AmountCheck(metrics?.lastTransaction?.amount)}
                </div>
              </div>
              <div
                className="bottom_band_tile_stat"
                style={{
                  background: "#F4F0FF",
                  padding: "16px",
                }}
              >
                <div
                  className="each_stat_set_lg"
                  style={{
                    border: "none",
                    padding: "0px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div className="inital_name">
                      {metrics?.lastTransaction?.business?.name?.slice(0, 2)}
                    </div>
                    <div
                      className="tr_last_name"
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        width: "180px",
                        display: "flex",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {metrics?.lastTransaction?.business?.name}
                    </div>
                  </div>
                  <span className="tr_timer">
                    {new Date(metrics?.lastTransaction?.createdAt)
                      .toLocaleTimeString()
                      .split(":")
                      .slice(0, 2)
                      .join(":")}
                  </span>
                </div>
                <div
                  className="each_stat_set_lg"
                  style={{
                    background: "#D9CDFF",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  <span className="view_transactions_stat">
                    View Transaction
                  </span>
                  <img src={arrow_right} alt="" />
                </div>
              </div>
            </div>
          </div>
          */}
          <div
            style={{
              display: "flex",
              gap: "32px",
            }}
          >
            {sectionloader && <Loader />}
            {sectionloader === false && (
              <>
                <div className="tiles_contianer_stat">
                  <div className="each_tile_stat">
                    <div className="inner_stat_tile">
                      <h5 className="tag_top_lg">Total Referral</h5>
                      <span className="count_top_tg_lb">
                        {parseFloat(transaction?.numberOfAllReferal)
                          .toLocaleString()
                          .replace(/,/, " ")}
                      </span>
                    </div>
                  </div>
                  <div className="each_tile_stat">
                    <div className="inner_stat_tile">
                      <h5 className="tag_top_lg">Active Referral</h5>
                      <span className="count_top_tg_lb">
                        {parseFloat(transaction?.numberOfActiveReferal)
                          .toLocaleString()
                          .replace(/,/, " ")}
                      </span>
                    </div>
                  </div>
                  <div className="each_tile_stat">
                    <div className="inner_stat_tile">
                      <h5 className="tag_top_lg">Inactive Referral</h5>
                      <span className="count_top_tg_lb">
                        {parseFloat(transaction?.numberOfInactiveReferal)
                          .toLocaleString()
                          .replace(/,/, " ")}
                      </span>
                    </div>
                  </div>
                  <div className="each_tile_stat">
                    <div className="inner_stat_tile">
                      <h5 className="tag_top_lg">Total Withdraw</h5>
                      <span className="count_top_tg_lb">
                        {parseFloat(financess?.numberOfAllwithraw)
                          .toLocaleString()
                          .replace(/,/, " ")}
                      </span>
                    </div>
                  </div>
                  <div className="each_tile_stat">
                    <div className="inner_stat_tile">
                      <h5 className="tag_top_lg">Completed Withdraw </h5>
                      <span className="count_top_tg_lb">
                        {parseFloat(financess?.numberOfActivewithraw)
                          .toLocaleString()
                          .replace(/,/, " ")}
                      </span>
                    </div>
                  </div>
                  <div className="each_tile_stat">
                    {" "}
                    <div className="inner_stat_tile">
                      <h5 className="tag_top_lg">Processing Withdraw</h5>
                      <span className="count_top_tg_lb">
                        {parseFloat(financess.numberOfprocessingwithraw)
                          .toLocaleString()
                          .replace(/,/, " ")}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {sectionloader === false && (
              <>
                <div className="tiles_contianer_stat">
                  <div className="each_tile_stat">
                    <div className="inner_stat_tile">
                      <h5 className="tag_top_lg">Rejected Withdraw</h5>
                      <span className="count_top_tg_lb">
                        {parseFloat(financess?.numberOfRejectedwithraw)
                          .toLocaleString()
                          .replace(/,/, " ")}
                      </span>
                    </div>
                  </div>
                  <div className="each_tile_stat">
                    <div className="inner_stat_tile">
                      <h5 className="tag_top_lg">Total Users</h5>
                      <span className="count_top_tg_lb">
                        {parseFloat(tiles?.numberOfAllUser)
                          .toLocaleString()
                          .replace(/,/, " ")}
                      </span>
                    </div>
                  </div>
                  <div className="each_tile_stat">
                    <div className="inner_stat_tile">
                      <h5 className="tag_top_lg">Inactive Users</h5>
                      <span className="count_top_tg_lb">
                        {parseFloat(tiles?.numberOfInactiveUser)
                          .toLocaleString()
                          .replace(/,/, " ")}
                      </span>
                    </div>
                  </div>
                  <div className="each_tile_stat">
                    <div className="inner_stat_tile">
                      <h5 className="tag_top_lg">Active Users</h5>
                      <span className="count_top_tg_lb">
                        {parseFloat(tiles?.numberOfActiveUser)
                          .toLocaleString()
                          .replace(/,/, " ")}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/***
            {sectionloader2 && <Loader />}
            {sectionloader2 === false && (
              <>
                <div
                  style={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    background: "#ffffff",
                    padding: "16px",
                    borderRadius: "8px",
                    paddingBottom: "40px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <h5 className="tag_top_lg">Disbursal</h5>
                      <span
                        className="count_top_tg_lb"
                        style={{
                          fontWeight: "700px",
                          fontSize: "32px",
                        }}
                      >
                        {currencyPairCheck(selectedcurrenncy3)}
                        {AmountCheck(loans.totalLoans)}
                      </span>
                    </div>
                    <div
                      className="circular_currency_lg"
                      style={{
                        border: "1px solid #E7E9FB",
                        padding: "8px",
                      }}
                      onClick={() => {
                        setshow3(true);
                      }}
                    >
                      <img
                        height={22}
                        src={
                          selectedcurrenncy3 === "NGN"
                            ? NG
                            : selectedcurrenncy3 === "GBP"
                            ? GB
                            : selectedcurrenncy3 === "EUR"
                            ? US
                            : EU
                        }
                        alt=""
                      />
                      <span
                        className="logo_name_sm"
                        style={{
                          color: "#101828",
                        }}
                      >
                        {selectedcurrenncy3}
                      </span>

                      <span
                        className="material-icons"
                        style={{
                          color: "#475467",
                          fontWeight: "400",
                        }}
                      >
                        expand_more
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      minHeight: "254px",
                      position: "relative",
                    }}
                  >
                    <div className="side_fig_count">
                      <span>
                        {selectedcurrenncy3 === "NGN"
                          ? "₦"
                          : selectedcurrenncy3 === "USD"
                          ? "$"
                          : selectedcurrenncy3 === "EUR"
                          ? "€"
                          : "£"}
                        {formatAmount(loans.totalLoans, 1)}
                      </span>
                      <span>
                        {selectedcurrenncy3 === "NGN"
                          ? "₦"
                          : selectedcurrenncy3 === "USD"
                          ? "$"
                          : selectedcurrenncy3 === "EUR"
                          ? "€"
                          : "£"}
                        {formatAmount(loans.totalLoans, 0.75)}
                      </span>
                      <span>
                        {selectedcurrenncy3 === "NGN"
                          ? "₦"
                          : selectedcurrenncy3 === "USD"
                          ? "$"
                          : selectedcurrenncy3 === "EUR"
                          ? "€"
                          : "£"}
                        {formatAmount(loans.totalLoans, 0.5)}
                      </span>
                      <span>
                        {selectedcurrenncy3 === "NGN"
                          ? "₦"
                          : selectedcurrenncy3 === "USD"
                          ? "$"
                          : selectedcurrenncy3 === "EUR"
                          ? "€"
                          : "£"}
                        {formatAmount(loans.totalLoans, 0.25)}
                      </span>
                      <span>
                        {selectedcurrenncy3 === "NGN"
                          ? "₦"
                          : selectedcurrenncy3 === "USD"
                          ? "$"
                          : selectedcurrenncy3 === "EUR"
                          ? "€"
                          : "£"}
                        {formatAmount(loans.totalLoans, 0.125)}
                      </span>
                    </div>
                    <div className="side_line_chart"></div>
                    <div className="main_chart_fig">
                      {sortedList.length === 0 && (
                        <div className="centered">No Data</div>
                      )}
                      {sortedList.reverse()?.map((res, index) => (
                        <div className="each_bar_line" key={index}>
                          <div
                            className="inner_line_bar"
                            style={{
                              height: `calc(${parseFloat(
                                res.totalAmount / parseFloat(loans?.totalLoans)
                              ).toFixed(2)} * 100%)`,
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <div className="downward_line_chart"></div>
                    <div className="month_counnt_fig">
                      {sortedList.map((res, index) => (
                        <span>{res?.alphabet?.slice(0, 3)}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
              */}
          </div>
          <div
            style={{
              display: "flex",
              gap: "32px",
            }}
          >
            {/**
            <div className="insight_col">
              <h5 className="tag_top_lg">Transaction Insights</h5>
              {sortedListtransaction.length === 0 && (
                <div className="centered">No Data</div>
              )}
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={sortedListtransaction.reverse()}
                  margin={{
                    // top: 10,
                    //right: 30,
                    left: 20,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="0" />
                  <XAxis
                    dataKey="name"
                    style={{
                      color: "red",
                    }}
                    stroke="#98A2B3"
                    fontSize={12}
                  />
                  <YAxis color="red" stroke="#98A2B3" fontSize={12} />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#6F00FF"
                    fill="#e8d4f8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            */}
            <div
              className="bg-lg-info"
              style={{
                width: "100%",
                boxSizing: "border-box",
                marginRight: "50px",
              }}
            >
              <div
                className="each-lg-card-info"
                style={{
                  maxHeight: "500px",
                  overflow: "auto",
                  width: "100%",
                }}
              >
                <div className="head-title-lg">
                  <h5
                    style={{
                      fontWeight: "600px",
                      fontSize: "12px",
                      color: "#667085",
                    }}
                  >
                    new KYC
                  </h5>
                  <span className="view-all-lg">View all</span>
                </div>
                {isloading && <LoaderDate />}
                {isloading === false &&
                  business.map((res, index) => (
                    <div
                      className="main-lg-request"
                      style={{ cursor: "pointer" }}
                      key={index}
                      onClick={() =>
                        navigate(`/account/${res._id}`, {
                          state: {
                            ...res,
                          },
                        })
                      }
                    >
                      <div className="each-request">
                        <div className="img-name">
                          <img src={factoring} alt="" />
                          <div className="mytag-lg">
                            <div
                              className="head-tg"
                              style={{
                                fontWeight: "600px",
                                fontSize: "14px",
                                color: "#101828",
                              }}
                            >
                              {res?.username}
                            </div>
                            <span className="small-tg">{res?.email}</span>
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
                            {res?.email}{" "}
                          </div>
                          <span
                            className="small-tg"
                            style={{ textAlign: "right" }}
                          >
                            {new Date(res?.created_at).toDateString()}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
