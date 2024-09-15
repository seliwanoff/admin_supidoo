import sech from "../assets/images/search-lg.svg";

// import {useNavigate} from "react-router";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import OtherHeader from "../components/otherheader";
import angledown from "../assets/images/angle-down.svg";
import arrowup from "../assets/images/arrow-up2.svg";
import { useNavigate } from "react-router";
import Pagination from "../components/pagination";
import mark from "../assets/images/mycheck.svg";
import LoaderDate from "../components/loaderData";
import empty from "../assets/images/emptyadmin.svg";
import US from "../assets/images/EU.svg";
import USD from "../assets/images/US.svg";
import NGN from "../assets/images/ngnnigeria.jpg";
import EU from "../assets/images/GB.svg";
import successmark from "../assets/images/bluesuccess.svg";
import { changeFoemat } from "../components/amountFormat";
import currencyPairCheck from "../components/logoCurrency";
import AmountCheck from "../components/amountcheck";
let PageSize = 20;

const FinanceHome = () => {
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
  const [selectedrequest, setselectedrequest] = useState("All");
  const [selectedindexrequest, setselectedindexrequest] = useState(0);
  const [isloading, setisloading] = useState(true);
  const [ltterOfcredit, setletterofCredit] = useState([]);
  const [tradeOfCredit, setTradeOfCredit] = useState([]);
  const [defaultcur, setdefault] = useState(1);
  const [isdrop, setisdrop] = useState(false);

  const [tab, settab] = useState("Factoring");
  const [stat, setstat] = useState([]);
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
    {
      img: USD,
      name: "USD",
      title: "Dollar",
    },
  ]);

  const filtercontant = data.filter((item) =>
    item?.business?.user?.firstName?.toLowerCase()?.match(search?.toLowerCase())
  );
  const filterofcredit = ltterOfcredit.filter((item) =>
    item?.business?.name?.toLowerCase()?.match("")
  );
  const filterTradeofCredit = tradeOfCredit.filter((item) =>
    item?.business?.name?.toLowerCase()?.match(search?.toLowerCase())
  );
  // console.log(filterTradeofCredit);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filtercontant.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filtercontant]);

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
        .get(`/v1/admin/get-all-finance-credit-line?page=-1&currency=${cur}`)
        .then((res) => {
          setletterofCredit(res.data.data.reverse());
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchUser();
  }, [cur]);
  useEffect(() => {
    const fetchTradeOfCrdit = async () => {
      await axios
        .get(`/v1/admin/get-all-finance-trade-credit?page=-1&currency=${cur}`)
        .then((res) => {
          //  console.log(res);
          setTradeOfCredit(res.data.data.reverse());
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchTradeOfCrdit();
  }, []);

  useEffect(() => {
    const fetchBusiness = async () => {
      await axios
        .get(`/v1/admin/get-all-finance-invoice?page=-1&currency=${cur}`)
        .then((res) => {
          // console.log(res);
          setData(res.data.data.reverse());
          setisloading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchBusiness();
  }, []);
  const goToDetails = (items, p) => {
    navigate(`/finance/${items._id}`, {
      state: {
        ...items,
        customtype: p,
      },
    });
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
            // console.log(res);
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

  return (
    <>
      <div className="main">
        <OtherHeader title={"Finance"} />
        <div className="info-cl">
          <div
            className="overview"
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                width: "80%",
              }}
            >
              <h4
                style={{
                  margin: "0px",
                  padding: "0px",
                }}
              >
                Overview
              </h4>
              <div
                className="drop-stat"
                style={{
                  width: "100%",
                  maxWidth: "150px",
                  position: "relative",
                }}
              >
                <span className="all-time">All time</span>
                <img src={angledown} alt="" />
              </div>
            </div>

            <div
              className="drop-stat"
              style={{
                width: "100%",
                maxWidth: "150px",
                position: "relative",
                cursor: "pointer",
                padding: "16px",
                borderRadius: "30px",
                border: "1px solid #D0D5DD",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={() => setisdrop(!isdrop)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src={currencciess[defaultcur].img}
                  alt=""
                  style={{
                    width: "20px",
                  }}
                />

                <span
                  className="all-time"
                  style={{
                    color: "#101828",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "19.6px",
                  }}
                >
                  {currencciess[defaultcur].title}
                </span>
              </div>
              {isdrop && (
                <div className="drop_filter_currency">
                  <div
                    style={{
                      padding: "0px 16px ",
                      display: "flex",
                      gap: "8px",
                      flexDirection: "column",
                    }}
                  >
                    {currencciess.map((res, index) => (
                      <div
                        key={index}
                        className="fill-left-currency"
                        style={{
                          cursor: "pointer",
                          padding: "8px",
                          background: defaultcur === index && " #F4F0FF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderRadius: "8px",
                        }}
                        onClick={() => {
                          setdefault(index);
                          setisdrop(false);
                          searchStat(currencciess[index].name, tab);
                          setcur(currencciess[index].name);
                          setselectedcurindex(index);
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <img src={res.img} alt="" style={{ width: "25px" }} />
                          <div
                            style={{
                              display: "grid",
                            }}
                          >
                            <span className="name_cur">{res.title}</span>
                            <span
                              style={{
                                fontWeight: "400",
                                fontSize: "12px",
                                lineHeight: "16.2px",
                                letterSpacing: "2%",
                                color: "#667085",
                              }}
                            >
                              {res.name}
                            </span>
                          </div>
                        </div>
                        {defaultcur === index && (
                          <img src={successmark} alt="" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <span className="material-icons">expand_more</span>
            </div>
          </div>

          <div className="each-card">
            <div className="main-card-each">
              <div className="innercard">
                <h5>total requested amount</h5>
                <div className="stat-line">
                  <span>
                    {currencyPairCheck(currencciess[defaultcur].name)}
                    {AmountCheck(stat?.totalRequestedAmount)}
                  </span>
                </div>
              </div>
            </div>
            <div className="main-card-each">
              <div className="innercard">
                <h5>paid out</h5>
                <div className="stat-line">
                  <span>
                    {currencyPairCheck(currencciess[defaultcur].name)}
                    {AmountCheck(stat?.totalPaidOut)}
                  </span>
                </div>
              </div>
            </div>
            <div className="main-card-each">
              <div className="innercard">
                <h5>Pending</h5>
                <div className="stat-line">
                  <span>
                    {" "}
                    {currencyPairCheck(currencciess[defaultcur].name)}
                    {AmountCheck(stat?.totalPending)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-cl2">
          <ul className="tp-head-list">
            <li
              onClick={() => {
                settab("Factoring");
                searchStat(currencciess[defaultcur].name, "Factoring");
              }}
              style={{
                borderBottom: tab === "Factoring" ? "3px solid #6F00FF" : "",
              }}
            >
              Factoring
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
              Credit Line
            </li>
            <li
              onClick={() => {
                settab("Trade credit");
                searchStat(currencciess[defaultcur].name, "Trade credit");
              }}
              style={{
                borderBottom: tab === "Trade credit" ? "3px solid #6F00FF" : "",
              }}
            >
              Working Capital
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

              <div style={{ overflow: "auto" }}>
                <table className="table  row-datatable">
                  <thead className="table-head">
                    <tr>
                      <th onClick={() => sorting("name", 0)}>
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
                        Email address{" "}
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
                      </th>{" "}
                      <th onClick={() => sorting("phoneNumber", 2)}>
                        Invoice ID{" "}
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
                        End Customer{" "}
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
                  <tbody className="table-head" style={{ width: "100%" }}>
                    {currentTableData.map((user, index) => (
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
                            {user.business.name?.slice(0, 2)}
                          </div>
                          <div className="name-avater-tag">
                            <span> {user?.business?.name} </span>
                            <span className="business_name">
                              {user?.business?.user?.firstName}{" "}
                              {user?.business?.user?.lastName}
                            </span>
                          </div>
                        </td>

                        <td> {user?.business?.user?.email} </td>

                        <td>
                          {currencyPairCheck(user.currency)}
                          {AmountCheck(user?.requestedAmount)}
                        </td>
                        <td>{user?._id}</td>
                        <td>
                          {new Date(user.createdAt).toDateString()}{" "}
                          {new Date(user.createdAt).toLocaleTimeString()}{" "}
                        </td>
                        <td>{user?.businessName}</td>
                        <td
                          style={{
                            color:
                              user?.status === "PENDING"
                                ? "#F04438"
                                : user?.status === "SUBMITTED"
                                ? "#F04438"
                                : user?.status === "REJECTED"
                                ? "#F04438"
                                : "#12B76A",
                          }}
                        >
                          {user?.status}{" "}
                        </td>

                        <td
                          className="view_account"
                          onClick={() => goToDetails(user, "Factoring")}
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
          {isloading === false && tab === "Letter of credit" && (
            <div className="lg-card">
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

              <div style={{ overflow: "auto" }}>
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
                        Email address{" "}
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
                  {currentTableDataFinance.length > 0 && (
                    <tbody className="table-head" style={{ width: "100%" }}>
                      {currentTableDataFinance.map((user, index) => (
                        <tr
                          key={index}
                          className="each_row"
                          onClick={() => goToDetails(user, "Credit Line")}
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
                                {user.business?.user?.firstName}{" "}
                                {user.business?.user?.lastName}
                              </span>
                            </div>
                          </td>

                          <td> {user?.business?.user?.email} </td>

                          <td>
                            {" "}
                            {currencyPairCheck(user.currency)}
                            {AmountCheck(user.requestedAmount)}{" "}
                          </td>
                          <td>{user._id}</td>
                          <td>
                            {" "}
                            {new Date(user.createdAt).toDateString()}{" "}
                            {new Date(user.createdAt).toLocaleTimeString()}{" "}
                          </td>

                          <td>{user?.tenure} Days</td>
                          <td
                            style={{
                              color:
                                user?.status === "PENDING"
                                  ? "#F04438"
                                  : user?.status === "REJECTED"
                                  ? "#F04438"
                                  : "#12B76A",
                            }}
                          >
                            {user.status}{" "}
                          </td>

                          <td
                            className="view_account"
                            onClick={() => goToDetails(user, "Credit Line")}
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

              <div style={{ overflow: "auto" }}>
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
                        Email address{" "}
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
                        End Customer{" "}
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
                      {currentTableDataTradeOfCrdit?.map((user, index) => (
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
                              {user?.business?.name?.slice(0, 2)}
                            </div>
                            <div className="name-avater-tag">
                              <span> {user?.business?.name} </span>
                              <span className="business_name">
                                {user?.business?.user?.firstName}{" "}
                                {user?.business?.user?.lastName}
                              </span>
                            </div>
                          </td>

                          <td> {user?.business?.user?.email} </td>

                          <td>
                            {" "}
                            {currencyPairCheck(user.currency)}
                            {AmountCheck(user.requestedAmount)}{" "}
                          </td>
                          <td>{user._id}</td>
                          <td>
                            {" "}
                            {new Date(user.createdAt).toDateString()}{" "}
                            {new Date(user.createdAt).toLocaleTimeString()}{" "}
                          </td>
                          <td> {user?.businessName}</td>
                          <td>{user.tenure} Days</td>
                          <td
                            style={{
                              color:
                                user?.status === "PENDING"
                                  ? "#F04438"
                                  : user?.status === "REJECTED"
                                  ? "#F04438"
                                  : "#12B76A",
                            }}
                          >
                            {user.status}{" "}
                          </td>

                          <td
                            className="view_account"
                            onClick={() => goToDetails(user, "Working Capital")}
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

export default FinanceHome;
