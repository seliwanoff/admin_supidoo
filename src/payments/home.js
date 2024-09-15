import sech from "../assets/images/search-lg.svg";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import OtherHeader from "../components/otherheader";
import { useNavigate } from "react-router";
import Pagination from "../components/pagination";
import mark from "../assets/images/mycheck.svg";
import LoaderDate from "../components/loaderData";
import empty from "../assets/images/emptyadmin.svg";
import US from "../assets/images/EU.svg";
import NGN from "../assets/images/ngnnigeria.jpg";
import EU from "../assets/images/usds.svg";
import currencyPairCheck from "../components/logoCurrency";
import AmountCheck from "../components/amountcheck";
let PageSize = 20;

const PaymentHome = () => {
  const [order, setOrder] = useState("ASC");
  const [selectedIndex, setselectedIndex] = useState(0);
  const navigate = useNavigate();
  const [isStatus, setisStatus] = useState(false);
  const [isSort, setisSort] = useState(false);
  const [isRequest, setisRequest] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");
  const [selectedstatus, setselectedstatus] = useState("All");
  const [selectedindexstatus, setselectedindexstatus] = useState(0);
  const [selectedsort, setselectedsort] = useState("Recent");
  const [selectedindexsort, setselectedindexsort] = useState(0);
  const [selectedcurrency, setselectedcurrency] = useState("");
  const [isloading, setisloading] = useState(true);
  const [ltterOfcredit, setletterofCredit] = useState([]);
  const [tradeOfCredit, setTradeOfCredit] = useState([]);
  const [defaultcur, setdefault] = useState(1);

  const [tab, settab] = useState("Factoring");
  const [stat, setstat] = useState([]);
  const [selectedcountry, setselectedcountry] = useState("All");
  const [selectedindexcountry, setselectedindexcountry] = useState(0);
  const [isCountry, setisCountry] = useState(false);

  const [cur, setcur] = useState("NGN");
  const [selectedcurindex, setselectedcurindex] = useState(0);
  const [currencciess] = useState([
    {
      img: EU,
      name: "GBP",
      title: " British Pounds",
    },
    {
      img: NGN,
      name: "NGN",
      title: "NG Naira",
    },
    {
      img: US,
      name: "EUR",
      title: "Euro",
    },
  ]);
  const currency = ["All", "Pending", "Completed", "Rejected"];

  const filtercontant = data.filter((item) =>
    item?.business?.name?.match(search)
  );
  const filterofcredit = ltterOfcredit.filter((item) =>
    item?.username?.match(search)
  );
  console.log(tradeOfCredit);
  const filterTradeofCredit = tradeOfCredit.filter((item) =>
    item?.username?.match(search)
  );

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filtercontant.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filtercontant]);
  //  console.log(currentTableData);

  // Function to filter data based on payType
  const filterDataByPayType = (payType) => {
    return currentTableData.filter((item) => item.payType === payType);
  };

  const sameCurrencyData = filterDataByPayType("sameCurrency");
  const crossBorderFxData = filterDataByPayType("crossBorderFx");
  const currentTableDataFinance = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterofcredit.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filterofcredit]);

  const currentTableDataTradeOfCrdit = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterTradeofCredit.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filterTradeofCredit]);
  const status = ["All", "Incoming", "Processing", "Completed"];
  const country = ["All", "Rejected", "Processing", "Completed"];
  const [transaction, setTransactiion] = useState([]);

  const sort = [
    "Recent",
    "Oldest",
    "Smallest tenure",
    "Largest tenure",
    "Lowest amount",
    "Highest amount",
  ];
  const requestType = ["All", "Shipping", "Inventory", "Cashflow"];

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get("/v1/admin/transaction/transfer_request/all?status=Pending")
        .then((res) => {
          //  console.log(res);
          setletterofCredit(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchUser();
  }, []);

  useEffect(() => {
    // Function to fetch data for status 'pending'
    const fetchData = async (status) => {
      try {
        const response = await axios.get(
          `admin/getwithraw${
            selectedcountry === "All"
              ? ""
              : selectedcountry === "Completed"
              ? "?status=2"
              : selectedcountry === "Processing"
              ? "?status=1"
              : "?status=0"
          }`
        );
        console.log(response);
        setTradeOfCredit(response.data.data.data);
        setisloading(false);
      } catch (error) {
        console.error(`Error fetching ${status} data:`, error);
        return [];
      }
    };

    // Fetch data for both statuses
    const fetchAllData = async () => {
      try {
        const pendingData = await fetchData("Pending");
        const processingData = await fetchData("Processing");
        // Concatenate both arrays of data
        const combined = [...pendingData, ...processingData];
        //console.log(combined);
        setTradeOfCredit(combined);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call function to fetch data when component mounts
    fetchAllData();
  }, [selectedstatus, selectedcountry]); // Empty

  useEffect(() => {
    const fetchBusiness = async () => {
      await axios
        .get("/v1/admin/transaction/fx_transfer/all?status=Pending")
        .then((res) => {
          // console.log(res);
          setData(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchBusiness();
  }, []);
  const goToDetails = (items, p) => {
    if (p === "Credit Lines") {
      navigate(`/transfer/request/${items.id}`, {
        state: {
          ...items,
        },
      });
    } else {
      navigate(`/payment/${items.id}`, {
        state: {
          ...items,
          customtype: p,
        },
      });
    }
  };
  useEffect(() => {
    const fetchStat = async () => {
      if (tab === "Factoring") {
        await axios
          .get(`/v1/admin/get-finance-invoice-stats?currency=${cur}`)
          .then((res) => {
            setstat(res.data.data);
            //console.log(res)
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (tab === "Letter of credit") {
        await axios
          .get(`/v1/admin/get-finance-credit-line-stats?currency=${cur}`)
          .then((res) => {
            setstat(res.data.data);
            console.log(res);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        await axios
          .get(`v1/admin/get-finance-working-capital-stats?currency=${cur}`)
          .then((res) => {
            //  console.log(res);
            setstat(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    fetchStat();
  }, []);
  const searchStat = async (value, tabs) => {
    if (tabs === "Factoring") {
      await axios
        .get(`/v1/admin/get-finance-invoice-stats?currency=${value}`)
        .then((res) => {
          setstat(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (tabs === "Letter of credit") {
      await axios
        .get(`/v1/admin/get-finance-credit-line-stats?currency=${value}`)
        .then((res) => {
          setstat(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      await axios
        .get(`v1/admin/get-finance-working-capital-stats?currency=${value}`)
        .then((res) => {
          setstat(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const sorting = (col, index) => {
    setselectedIndex(index);
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      //    console.log(sorted);
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };
  useEffect(() => {
    const fetchTransaction = async () => {
      await axios
        .get("admin/withdrawstatics")
        .then((res) => {
          setTransactiion(res.data);
          //setisloadingtransaction(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchTransaction();
  }, []);

  return (
    <>
      <div className="main">
        <OtherHeader title={"New Payments"} />
        <div className="info-cl">
          {/**
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
          ***/}

          <div className="each-card">
            <div className="main-card-each">
              <div className="innercard">
                <h5>Total Withdraw</h5>
                <div className="stat-line">
                  <span>{transaction.numberOfAllwithraw}</span>
                </div>
              </div>
            </div>
            <div className="main-card-each">
              <div className="innercard">
                <h5>Completed Withdraw</h5>
                <div className="stat-line">
                  <span>{transaction.numberOfActivewithraw}</span>
                </div>
              </div>
            </div>
            <div className="main-card-each">
              <div className="innercard">
                <h5>Processing Referral</h5>
                <div className="stat-line">
                  <span>{transaction.numberOfprocessingwithraw}</span>
                </div>
              </div>
            </div>
            <div className="main-card-each">
              <div className="innercard">
                <h5>Rejected Withdraw</h5>
                <div className="stat-line">
                  <span>{transaction.numberOfRejectedwithraw}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-cl2">
          <ul className="tp-head-list">
            {/**
            <li
              onClick={() => {
                settab("Factoring");
                searchStat(currencciess[defaultcur].name, "Factoring");
              }}
              style={{
                borderBottom: tab === "Factoring" ? "3px solid #6F00FF" : "",
              }}
            >
              Cross-border Payments
            </li>

            <li
              onClick={() => {
                settab("LocalPayment");
                searchStat(currencciess[defaultcur].name, "LocalPayment");
              }}
              style={{
                borderBottom: tab === "LocalPayment" ? "3px solid #6F00FF" : "",
              }}
            >
              Local Payments
            </li>
            <li
              onClick={() => {
                settab("Letter of credit");
                searchStat(currencciess[defaultcur].name, "Letter of credit");
              }}
              style={{
                borderBottom:
                  tab === "Letter of credit" ? "3px solid #6F00FF" : "",
              }}
            >
              Local Transfers
            </li>
            */}

            <li
              onClick={() => {
                settab("Trade credit");
                searchStat(currencciess[defaultcur].name, "Trade credit");
              }}
              style={{
                borderBottom: tab === "Trade credit" ? "3px solid #6F00FF" : "",
              }}
            >
              Wallet Funding
            </li>
          </ul>
          {isloading && (
            <div className="loadingdata">
              {" "}
              <LoaderDate />{" "}
            </div>
          )}
          {isloading === false && tab === "Factoring" && (
            <div className="lg-card">
              <div
                style={{
                  padding: "24px 24px 12px 24px",
                  color: "#344054",
                  fontSize: "18px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  //styleName: body/large/medium;
                }}
              ></div>
              <div
                className="md-cl"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="search-dl">
                  <div
                    className="search-l"
                    style={{
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                      padding: "10px 14px 10px 14px",
                      background: "#ECEFF3",

                      borderRadius: "8px",
                      width: "320px",
                    }}
                  >
                    <img src={sech} alt="" />
                    <input
                      type="text"
                      placeholder="Search by customer name"
                      value={search}
                      onChange={(e) => setsearch(e.target.value)}
                      style={{
                        outline: "none",
                        border: "none",
                        background: "#ECEFF3",
                        width: "100%",
                        height: "30px",
                      }}
                    />
                  </div>
                </div>
                <div className="search-ls">
                  <div
                    className="eacl-lft-filter"
                    onClick={() => setisCountry(!isCountry)}
                  >
                    {isCountry && (
                      <div className="fixed-fliterbox">
                        <div className="inner_fixed_col">
                          <div className="main_fix_filter">
                            {country.map((date, index) => (
                              <div
                                className="filter_each_none"
                                style={{
                                  background:
                                    selectedindexcountry === index
                                      ? "#F4F0FF"
                                      : "",
                                  borderRadius: "8px",
                                }}
                                key={index}
                                onClick={() => {
                                  setselectedindexcountry(index);
                                  setselectedcountry(date);
                                }}
                              >
                                <span> {date} </span>
                                {selectedindexcountry === index && (
                                  <>
                                    <img src={mark} alt="" />
                                  </>
                                )}{" "}
                              </div>
                            ))}{" "}
                          </div>
                        </div>
                      </div>
                    )}
                    <span className="type">Status</span>

                    <div
                      style={{
                        display: "flex",
                        gap: "2px",
                        color: "#344054",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "19.6px",
                        alignItems: "center",
                      }}
                    >
                      {selectedcountry}
                      <span className="material-icons">expand_more</span>
                    </div>
                  </div>

                  <div className="eacl-lft-filter">
                    <span
                      className="type"
                      style={{
                        color: "#98A2B3",
                        fontWeight: "400",
                        lineHeight: "19.6px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                      onClick={() => setselectedcountry("All")}
                    >
                      Clear filter
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ overflow: "auto" }} className="scroll_design_lab">
                <table className="table  row-datatable">
                  <thead className="table-head">
                    <tr>
                      <th onClick={() => sorting("name", 0)}>
                        Transaction ID
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 0
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 0
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      <th onClick={() => sorting("email", 1)}>
                        Account name{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 1
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 1
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>

                      <th onClick={() => sorting("phoneNumber", 2)}>
                        Bank{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      <th onClick={() => sorting("phoneNumber", 2)}>
                        Account number{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      <th onClick={() => sorting("createdAt", 9)}>
                        Received
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 3
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 3
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      <th onClick={() => sorting("country", 4)}>
                        Date{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 4
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 4
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      <th onClick={() => sorting("country", 4)}>
                        Status{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 4
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 4
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>

                      <th
                        style={{
                          opacity: "0",
                          visibility: "0",
                        }}
                      >
                        Status{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color: order === "ASC" ? "#873BFF" : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color: order === "DSC" ? "#873BFF" : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="table-head" style={{ width: "100%" }}>
                    {currentTableDataTradeOfCrdit.map((user, index) => (
                      <tr
                        key={index}
                        className="each_row"
                        onClick={() => goToDetails(user, "Working Capital")}
                      >
                        <td
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div className="profile-d-icon">
                            {user?.username?.slice(0, 2)}
                          </div>
                          <div className="name-avater-tag">
                            <span> {user?.username} </span>
                            <span className="business_name">{user?.ref}</span>
                          </div>
                        </td>

                        <td> {user?.accountname}</td>
                        <td>{user.bankname}</td>
                        <td>{user.accountnumber}</td>
                        <td>
                          {currencyPairCheck("NGN")}
                          {AmountCheck(user?.amount)}
                        </td>

                        <td>
                          {new Date(user.created_at).toDateString()}{" "}
                          {new Date(user.created_at).toLocaleTimeString()}{" "}
                        </td>
                        <td
                          style={{
                            color:
                              user.status === "2"
                                ? "green"
                                : user.status === "1"
                                ? "pink"
                                : "crimson",
                          }}
                        >
                          {user.status === "2"
                            ? "Completed"
                            : user.status === "1"
                            ? "Pending"
                            : "Rejected"}{" "}
                        </td>

                        <td
                          className="view_account"
                          style={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: "600",
                          }}
                          onClick={() => goToDetails(user, "Working Capital")}
                        >
                          View
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="page-container">
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={data.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            </div>
          )}{" "}
          {/** Local Payment */}
          {isloading === false && tab === "LocalPayment" && (
            <div className="lg-card">
              <div
                style={{
                  padding: "24px 24px 12px 24px",
                  color: "#344054",
                  fontSize: "18px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  //styleName: body/large/medium;
                }}
              >
                {sameCurrencyData.length} Local Payments
              </div>
              <div
                className="md-cl"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="search-dl">
                  <div
                    className="search-l"
                    style={{
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                      padding: "10px 14px 10px 14px",
                      background: "#ECEFF3",

                      borderRadius: "8px",
                      width: "320px",
                    }}
                  >
                    <img src={sech} alt="" />
                    <input
                      type="text"
                      placeholder="Search by customer name"
                      value={search}
                      onChange={(e) => setsearch(e.target.value)}
                      style={{
                        outline: "none",
                        border: "none",
                        background: "#ECEFF3",
                        width: "100%",
                        height: "30px",
                      }}
                    />
                  </div>
                </div>
                <div className="search-ls">
                  <div
                    className="eacl-lft-filter"
                    onClick={() => setisSort(!isSort)}
                  >
                    {isSort && (
                      <div className="fixed-fliterbox">
                        <div className="inner_fixed_col">
                          <div className="main_fix_filter">
                            {sort.map((statuss, index) => (
                              <div
                                className="filter_each_none"
                                style={{
                                  background:
                                    selectedindexsort === index
                                      ? "#F4F0FF"
                                      : "",
                                  borderRadius: "8px",
                                }}
                                key={index}
                                onClick={() => {
                                  setselectedindexsort(index);
                                  setselectedsort(statuss);
                                }}
                              >
                                <span> {statuss} </span>
                                {selectedindexsort === index && (
                                  <>
                                    <img src={mark} alt="" />
                                  </>
                                )}{" "}
                              </div>
                            ))}{" "}
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="type">Sort </span>

                    <div
                      style={{
                        display: "flex",
                        gap: "2px",
                        color: "#344054",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "19.6px",
                        alignItems: "center",
                      }}
                    >
                      {selectedsort}
                      <span className="material-icons">expand_more</span>
                    </div>
                  </div>
                  {/**
                  <div
                    className="eacl-lft-filter"
                    onClick={() => setisRequest(!isRequest)}
                  >
                    {isRequest && (
                      <div className="fixed-fliterbox">
                        <div className="inner_fixed_col">
                          <div className="main_fix_filter">
                            {requestType.map((statuss, index) => (
                              <div
                                className="filter_each_none"
                                style={{
                                  background:
                                    selectedindexrequest === index
                                      ? "#F4F0FF"
                                      : "",
                                  borderRadius: "8px",
                                }}
                                key={index}
                                onClick={() => {
                                  setselectedindexrequest(index);
                                  setselectedrequest(statuss);
                                }}
                              >
                                <span> {statuss} </span>
                                {selectedindexrequest === index && (
                                  <>
                                    <img src={mark} alt="" />
                                  </>
                                )}{" "}
                              </div>
                            ))}{" "}
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="type">Request type </span>

                    <div
                      style={{
                        display: "flex",
                        gap: "2px",
                        color: "#344054",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "19.6px",
                        alignItems: "center",
                      }}
                    >
                      {selectedrequest}
                      <span className="material-icons">expand_more</span>
                    </div>
                  </div>
                    */}
                  <div
                    className="eacl-lft-filter"
                    onClick={() => setisStatus(!isStatus)}
                  >
                    {isStatus && (
                      <div className="fixed-fliterbox">
                        <div className="inner_fixed_col">
                          <div className="main_fix_filter">
                            {status.map((statuss, index) => (
                              <div
                                className="filter_each_none"
                                style={{
                                  background:
                                    selectedindexstatus === index
                                      ? "#F4F0FF"
                                      : "",
                                  borderRadius: "8px",
                                }}
                                key={index}
                                onClick={() => {
                                  setselectedindexstatus(index);
                                  setselectedstatus(statuss);
                                }}
                              >
                                <span> {statuss} </span>
                                {selectedindexstatus === index && (
                                  <>
                                    <img src={mark} alt="" />
                                  </>
                                )}{" "}
                              </div>
                            ))}{" "}
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="type">Status :</span>

                    <div
                      style={{
                        display: "flex",
                        gap: "2px",
                        color: "#344054",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "19.6px",
                        alignItems: "center",
                      }}
                    >
                      {selectedstatus}
                      <span className="material-icons">expand_more</span>
                    </div>
                  </div>
                  <div className="eacl-lft-filter">
                    <span
                      className="type"
                      style={{
                        color: "#98A2B3",
                        fontWeight: "400",
                        lineHeight: "19.6px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      Clear filter
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ overflow: "auto" }} className="scroll_design_lab">
                <table className="table  row-datatable">
                  <thead className="table-head">
                    <tr>
                      <th onClick={() => sorting("name", 0)}>
                        Transaction ID
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 0
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 0
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      <th onClick={() => sorting("email", 1)}>
                        Recipient{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 1
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 1
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>

                      <th onClick={() => sorting("phoneNumber", 2)}>
                        Sent{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      <th onClick={() => sorting("createdAt", 9)}>
                        Received
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 3
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 3
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      <th onClick={() => sorting("country", 4)}>
                        Date{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 4
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 4
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>

                      <th
                        style={{
                          opacity: "0",
                          visibility: "0",
                        }}
                      >
                        Status{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color: order === "ASC" ? "#873BFF" : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color: order === "DSC" ? "#873BFF" : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="table-head" style={{ width: "100%" }}>
                    {sameCurrencyData.map((user, index) => (
                      <tr
                        key={index}
                        className="each_row"
                        onClick={() => goToDetails(user, "Factoring")}
                      >
                        <td
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div className="profile-d-icon">
                            {user?.business?.name?.slice(0, 2)}
                          </div>
                          <div className="name-avater-tag">
                            <span> {user?.business?.name} </span>
                            <span className="business_name">{user?._id}</span>
                          </div>
                        </td>

                        <td> {user?.AccountName}</td>

                        <td>
                          {currencyPairCheck(user.currency)}
                          {AmountCheck(user?.amount)}
                        </td>
                        <td>
                          {currencyPairCheck(user.quoteCurrency)}
                          {AmountCheck(user?.quoteAmount)}
                        </td>
                        <td>
                          {new Date(user.createdAt).toDateString()}{" "}
                          {new Date(user.createdAt).toLocaleTimeString()}{" "}
                        </td>

                        <td
                          className="view_account"
                          style={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: "600",
                          }}
                          onClick={() => {
                            navigate(`/finance/${user._id}`);
                          }}
                        >
                          View
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="page-container">
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={data.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            </div>
          )}
          {isloading === false && tab === "Letter of credit" && (
            <div className="lg-card">
              <div
                style={{
                  padding: "24px 24px 12px 24px",
                  color: "#344054",
                  fontSize: "18px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  //styleName: body/large/medium;
                }}
              >
                {currentTableDataFinance.length} Local Transfers
              </div>
              <div
                className="md-cl"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  className="search-dl"
                  style={{
                    width: "100%",
                  }}
                >
                  <div
                    className="search-l"
                    style={{
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                      padding: "10px 14px 10px 14px",
                      background: "#ECEFF3",

                      borderRadius: "8px",
                      width: "320px",
                    }}
                  >
                    <img src={sech} alt="" />
                    <input
                      type="text"
                      placeholder="Search by customer names"
                      value={search}
                      onChange={(e) => setsearch(e.target.value)}
                      style={{
                        outline: "none",
                        border: "none",
                        background: "#ECEFF3",
                        width: "100%",
                        height: "30px",
                      }}
                    />
                  </div>
                </div>
                <div className="search-ls">
                  <div
                    className="eacl-lft-filter"
                    onClick={() => setisSort(!isSort)}
                  >
                    {isSort && (
                      <div className="fixed-fliterbox">
                        <div className="inner_fixed_col">
                          <div className="main_fix_filter">
                            {sort.map((statuss, index) => (
                              <div
                                className="filter_each_none"
                                style={{
                                  background:
                                    selectedindexsort === index
                                      ? "#F4F0FF"
                                      : "",
                                  borderRadius: "8px",
                                }}
                                key={index}
                                onClick={() => {
                                  setselectedindexsort(index);
                                  setselectedsort(statuss);
                                }}
                              >
                                <span> {statuss} </span>
                                {selectedindexsort === index && (
                                  <>
                                    <img src={mark} alt="" />
                                  </>
                                )}{" "}
                              </div>
                            ))}{" "}
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="type">Sort </span>

                    <div
                      style={{
                        display: "flex",
                        gap: "2px",
                        color: "#344054",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "19.6px",
                        alignItems: "center",
                      }}
                    >
                      {selectedsort}
                      <span className="material-icons">expand_more</span>
                    </div>
                  </div>

                  <div
                    className="eacl-lft-filter"
                    onClick={() => setisStatus(!isStatus)}
                  >
                    {isStatus && (
                      <div className="fixed-fliterbox">
                        <div className="inner_fixed_col">
                          <div className="main_fix_filter">
                            {status.map((statuss, index) => (
                              <div
                                className="filter_each_none"
                                style={{
                                  background:
                                    selectedindexstatus === index
                                      ? "#F4F0FF"
                                      : "",
                                  borderRadius: "8px",
                                }}
                                key={index}
                                onClick={() => {
                                  setselectedindexstatus(index);
                                  setselectedstatus(statuss);
                                }}
                              >
                                <span> {statuss} </span>
                                {selectedindexstatus === index && (
                                  <>
                                    <img src={mark} alt="" />
                                  </>
                                )}{" "}
                              </div>
                            ))}{" "}
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="type">Status :</span>

                    <div
                      style={{
                        display: "flex",
                        gap: "2px",
                        color: "#344054",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "19.6px",
                        alignItems: "center",
                      }}
                    >
                      {selectedstatus}
                      <span className="material-icons">expand_more</span>
                    </div>
                  </div>
                  <div className="eacl-lft-filter">
                    <span
                      className="type"
                      style={{
                        color: "#98A2B3",
                        fontWeight: "400",
                        lineHeight: "19.6px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      Clear filter
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ overflow: "auto" }} className="scroll_design_lab">
                <table className="table  row-datatable">
                  <thead className="table-head">
                    <tr>
                      <th onClick={() => sorting("user['firstName']", 0)}>
                        Name
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 0
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 0
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      <th onClick={() => sorting("email", 1)}>
                        Recipient{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 1
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 1
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      <th onClick={() => sorting("email", 1)}>
                        Bank{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 1
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 1
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      <th onClick={() => sorting("phoneNumber", 2)}>
                        Amount{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      {/**
                      <th onClick={() => sorting("phoneNumber", 2)}>
                        ID{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                          </th>*/}

                      <th onClick={() => sorting("createdAt", 9)}>
                        Date
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 3
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 3
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      {/**

                      <th>
                        Tenure{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color: order === "ASC" ? "#873BFF" : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color: order === "DSC" ? "#873BFF" : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      {/**
                      <th onClick={() => sorting("status", 5)}>
                        Status{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 5
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 5
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
*/}
                      <th
                        style={{
                          opacity: "0",
                          visibility: "0",
                        }}
                      >
                        Status{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color: order === "ASC" ? "#873BFF" : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color: order === "DSC" ? "#873BFF" : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  {currentTableDataFinance.length > 0 && (
                    <tbody className="table-head" style={{ width: "100%" }}>
                      {currentTableDataFinance.map((user, index) => (
                        <tr
                          key={index}
                          className="each_row"
                          onClick={() => goToDetails(user, "Credit Lines")}
                        >
                          <td
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <div className="profile-d-icon">
                              {user?.business?.name?.slice(0, 2)}
                            </div>
                            <div className="name-avater-tag">
                              <span> {user?.business?.name} </span>
                              <span className="business_name">
                                {user?.business?.registrationNumber}
                              </span>
                            </div>
                          </td>

                          <td> {user?.AccountName} </td>
                          <td> {user?.BankName} </td>

                          <td>
                            {currencyPairCheck(user.currency)}
                            {AmountCheck(user.amount)}{" "}
                          </td>
                          <td>
                            {" "}
                            {new Date(user.createdAt).toDateString()}{" "}
                            {new Date(user.createdAt).toLocaleTimeString()}{" "}
                          </td>

                          <td
                            className="view_account"
                            style={{
                              textAlign: "center",
                              display: "flex",
                              justifyContent: "center",
                              fontWeight: "600",
                            }}
                            onClick={() => {
                              navigate(`/finance/${user._id}`);
                            }}
                          >
                            View
                          </td>
                        </tr>
                      ))}{" "}
                    </tbody>
                  )}
                  {currentTableDataFinance.length === 0 && (
                    <div className="empty_lg">
                      <img src={empty} alt="" />
                      <div className="bg_lg_dm">
                        <h4>No Finance Transaction</h4>
                        <span>Finance will show here.</span>
                      </div>
                    </div>
                  )}
                </table>

                <div className="page-container">
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={ltterOfcredit.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            </div>
          )}{" "}
          {isloading === false && tab === "Trade credit" && (
            <div className="lg-card">
              <div
                style={{
                  padding: "24px 24px 12px 24px",
                  color: "#344054",
                  fontSize: "18px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  //styleName: body/large/medium;
                }}
              >
                {currentTableDataTradeOfCrdit.length} Wallet Funding
              </div>
              <div
                className="md-cl"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  className="search-dl"
                  style={{
                    width: "100%",
                  }}
                >
                  <div
                    className="search-l"
                    style={{
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                      padding: "10px 14px 10px 14px",
                      background: "#ECEFF3",

                      borderRadius: "8px",
                      width: "320px",
                    }}
                  >
                    <img src={sech} alt="" />
                    <input
                      type="text"
                      placeholder="Search by customer name"
                      value={search}
                      onChange={(e) => setsearch(e.target.value)}
                      style={{
                        outline: "none",
                        border: "none",
                        background: "#ECEFF3",
                        width: "100%",
                        height: "30px",
                      }}
                    />
                  </div>
                </div>
                <div className="search-ls">
                  <div
                    className="eacl-lft-filter"
                    onClick={() => setisSort(!isSort)}
                  >
                    {isSort && (
                      <div className="fixed-fliterbox">
                        <div className="inner_fixed_col">
                          <div className="main_fix_filter">
                            {sort.map((statuss, index) => (
                              <div
                                className="filter_each_none"
                                style={{
                                  background:
                                    selectedindexsort === index
                                      ? "#F4F0FF"
                                      : "",
                                  borderRadius: "8px",
                                }}
                                key={index}
                                onClick={() => {
                                  setselectedindexsort(index);
                                  setselectedsort(statuss);
                                }}
                              >
                                <span> {statuss} </span>
                                {selectedindexsort === index && (
                                  <>
                                    <img src={mark} alt="" />
                                  </>
                                )}{" "}
                              </div>
                            ))}{" "}
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="type">Sort </span>

                    <div
                      style={{
                        display: "flex",
                        gap: "2px",
                        color: "#344054",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "19.6px",
                        alignItems: "center",
                      }}
                    >
                      {selectedsort}
                      <span className="material-icons">expand_more</span>
                    </div>
                  </div>

                  <div
                    className="eacl-lft-filter"
                    onClick={() => setisStatus(!isStatus)}
                  >
                    {isStatus && (
                      <div className="fixed-fliterbox">
                        <div className="inner_fixed_col">
                          <div className="main_fix_filter">
                            {currency.map((statuss, index) => (
                              <div
                                className="filter_each_none"
                                style={{
                                  background:
                                    selectedindexstatus === index
                                      ? "#F4F0FF"
                                      : "",
                                  borderRadius: "8px",
                                }}
                                key={index}
                                onClick={() => {
                                  setselectedindexstatus(index);
                                  setselectedstatus(statuss);
                                  setselectedcurrency(statuss);
                                }}
                              >
                                <span> {statuss} </span>
                                {selectedindexstatus === index && (
                                  <>
                                    <img src={mark} alt="" />
                                  </>
                                )}{" "}
                              </div>
                            ))}{" "}
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="type">Currency :</span>

                    <div
                      style={{
                        display: "flex",
                        gap: "2px",
                        color: "#344054",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "19.6px",
                        alignItems: "center",
                      }}
                    >
                      {selectedstatus}
                      <span className="material-icons">expand_more</span>
                    </div>
                  </div>
                  <div className="eacl-lft-filter">
                    <span
                      className="type"
                      style={{
                        color: "#98A2B3",
                        fontWeight: "400",
                        lineHeight: "19.6px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      Clear filter
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ overflow: "auto" }} className="scroll_design_lab">
                <table className="table  row-datatable">
                  <thead className="table-head">
                    <tr>
                      <th onClick={() => sorting("user['firstName']", 0)}>
                        Name
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 0
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 0
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>

                      <th onClick={() => sorting("phoneNumber", 2)}>
                        Amount{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      <th onClick={() => sorting("phoneNumber", 2)}>
                        ID{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 2
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>

                      <th onClick={() => sorting("createdAt", 9)}>
                        Date
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 3
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 3
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>

                      <th onClick={() => sorting("country", 4)}>
                        Wallet{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 4
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 4
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      {/**
                      <th>
                        Tenure{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color: order === "ASC" ? "#873BFF" : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color: order === "DSC" ? "#873BFF" : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                      */}
                      <th onClick={() => sorting("status", 5)}>
                        Status{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color:
                                order === "ASC" && selectedIndex === 5
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color:
                                order === "DSC" && selectedIndex === 5
                                  ? "#873BFF"
                                  : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>

                      <th
                        style={{
                          opacity: "0",
                          visibility: "0",
                        }}
                      >
                        Status{" "}
                        <div className="sort_icon-con">
                          <span
                            className="material-icons up-arrwo"
                            style={{
                              color: order === "ASC" ? "#873BFF" : "#667085",
                            }}
                          >
                            arrow_drop_up
                          </span>

                          <span
                            className="material-icons down-arrow"
                            style={{
                              color: order === "DSC" ? "#873BFF" : "#667085",
                            }}
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  {currentTableDataTradeOfCrdit.length > 0 && (
                    <tbody className="table-head" style={{ width: "100%" }}>
                      {currentTableDataTradeOfCrdit.map((user, index) => (
                        <tr
                          key={index}
                          className="each_row"
                          onClick={() => goToDetails(user, "Working Capital")}
                        >
                          <td
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <div className="profile-d-icon">
                              {user?.username?.slice(0, 2)}
                            </div>
                            <div className="name-avater-tag">
                              <span> {user?.username} </span>
                            </div>
                          </td>

                          <td>
                            {currencyPairCheck("NGN")}
                            {AmountCheck(user.amount)}{" "}
                          </td>
                          <td>{user.ref}</td>
                          <td>
                            {" "}
                            {new Date(user.create_at).toDateString()}{" "}
                            {new Date(user.created_at).toLocaleTimeString()}{" "}
                          </td>
                          <td> {user.currency} Wallet</td>
                          {/** <td>{user.tenure} Days</td>*/}
                          <td
                            style={{
                              color:
                                user?.status === "Pending"
                                  ? "#F04438"
                                  : user?.status === "Processing"
                                  ? "#F04438"
                                  : "#12B76A",
                            }}
                          >
                            {user.status === "Processing"
                              ? "NOT COMPLETED"
                              : user.status === "Pending"
                              ? "PENDING"
                              : "Completed"}
                          </td>

                          <td
                            className="view_account"
                            onClick={() => {
                              navigate(`/finance/${user._id}`);
                            }}
                          >
                            View
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}{" "}
                  {currentTableDataTradeOfCrdit.length === 0 && (
                    <div className="empty_lg">
                      <img src={empty} alt="" />
                      <div className="bg_lg_dm">
                        <h4>No Trade credit Transaction</h4>
                        <span>Finance will show here.</span>
                      </div>
                    </div>
                  )}
                </table>

                <div className="page-container">
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={tradeOfCredit.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentHome;
