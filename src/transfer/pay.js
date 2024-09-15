import sech from "../assets/images/search-lg.svg";

// import {useNavigate} from "react-router";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import OtherHeader from "../components/otherheader";
import angledown from "../assets/images/angle-down.svg";
import arrowup from "../assets/images/arrow-up2.svg";
import { useNavigate } from "react-router";
import flexinvice from "../assets/images/flexinvoice.svg";

import Pagination from "../components/pagination";
import mark from "../assets/images/mycheck.svg";
import LoaderDate from "../components/loaderData";
import empty from "../assets/images/emptyadmin.svg";
import US from "../assets/images/EU.svg";
import NGN from "../assets/images/ngnnigeria.jpg";
import EU from "../assets/images/usds.svg";
import successmark from "../assets/images/bluesuccess.svg";
import { changeFoemat } from "../components/amountFormat";
import currencyPairCheck from "../components/logoCurrency";
import AmountCheck from "../components/amountcheck";
let PageSize = 20;

const TransferPay = () => {
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
  ]);
  const [dataf, setDataf] = useState([]);
  useEffect(() => {
    const fetchBusiness = async () => {
      await axios
        .get("/v1/admin/flex/get-all-invoice")
        .then((res) => {
          //console.log(res)
          setDataf(res.data.data);
          setisloading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchBusiness();
  }, []);
  const filtercontant = data.filter((item) =>
    item?.business?.name?.match(search)
  );
  const filterofcredit = ltterOfcredit.filter((item) =>
    item?.business?.name?.match(search)
  );
  const filterTradeofCredit = tradeOfCredit.filter((item) =>
    item?.business?.user?.firstName?.match(search)
  );

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filtercontant.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filtercontant]);
  //  console.log(currentTableData);

  // Function to filter data based on payType
  // const filterDataByPayType = (payType) => {
  //   return currentTableData.filter((item) => item.payType === payType);
  // };
  //console.log(currentTableData);

  // Separate data by payType
  // const sameCurrencyData = filterDataByPayType("sameCurrency");
  // const crossBorderFxData = filterDataByPayType("crossBorderFx");
  // console.log(crossBorderFxData);
  const filtercontantinvoice = dataf.filter((item) =>
    item?.business?.name?.match(search)
  );
  const currentTableDataInvoice = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filtercontantinvoice.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filtercontantinvoice]);
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
  const [sameCurrencyData, setsameCurrency] = useState([]);
  const [crossBorderFxData, setcrossFx] = useState([]);
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
        .get("/v1/admin/transaction/transfer_request/all")
        .then((res) => {
          //  console.log(res);
          setletterofCredit(res.data.data.reverse());
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchTradeOfCrdit = async () => {
      await axios
        .get("/v1/admin/get-all-finance-trade-credit")
        .then((res) => {
          //  console.log(res);
          setTradeOfCredit(res.data.data);
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
        .get("/v1/admin/transaction/fx_transfer/all")
        .then((res) => {
          // console.log(res);
          setData(res.data.data);
          setisloading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchBusiness();
  }, []);
  useEffect(() => {
    const fetchBusiness = async () => {
      await axios
        .get("/v1/admin/transaction/fx_transfer/all?payType=sameCurrency")
        .then((res) => {
          // console.log(res);
          setsameCurrency(res.data.data);
          setisloading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchBusiness();
  }, []);
  useEffect(() => {
    const fetchBusiness = async () => {
      await axios
        .get("/v1/admin/transaction/fx_transfer/all?payType=crossBorderFx")
        .then((res) => {
          // console.log(res);
          setcrossFx(res.data.data);
          setisloading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchBusiness();
  }, []);
  const goToDetails = (items, p) => {
    if (p === "Credit Lines") {
      navigate(`/transfer/request/${items._id}`, {
        state: {
          ...items,
        },
      });
    } else {
      navigate(`/payment/${items._id}`, {
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
            //  console.log(res);
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
        <OtherHeader title={"Pay"} />

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
                settab("Invoices");
                searchStat(currencciess[defaultcur].name, "Invoices");
              }}
              style={{
                borderBottom: tab === "Invoices" ? "3px solid #6F00FF" : "",
              }}
            >
              Invoices
            </li>
            {/**
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
            */}
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
              >
                {crossBorderFxData.length} Cross-border Payemnts
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
                      <th>
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
                    {crossBorderFxData.map((user, index) => (
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
                          {user?._id}
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
                          style={{
                            color:
                              user.status === "Success"
                                ? "rgb(18, 183, 106)"
                                : "#f04438",
                          }}
                        >
                          {user.status === "Success" ? "COMPLETED" : "PENDING"}
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
                      <th>
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
                          {user?._id}
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
                          style={{
                            color:
                              user.status === "Success"
                                ? "rgb(18, 183, 106)"
                                : "#f04438",
                          }}
                        >
                          {user.status === "Success" ? "COMPLETED" : "PENDING"}
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
          {isloading === false && tab === "Invoices" && (
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
                      placeholder="Search"
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

                      <th onClick={() => sorting("createdAt", 9)}>
                        Issue Date
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
                      <th onClick={() => sorting("createdAt", 9)}>
                        Due Date
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
                        Items{" "}
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
                  {currentTableDataInvoice.length > 0 && (
                    <tbody className="table-head" style={{ width: "100%" }}>
                      {currentTableDataInvoice.map((user, index) => (
                        <tr
                          key={index}
                          className="each_row"
                          onClick={() => {
                            navigate(`/pay/invoice/${user?._id}`, {
                              state: {
                                ...user,
                                customtype: "Factoring",
                              },
                            });
                          }}
                        >
                          <td
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <img src={flexinvice} alt="" />
                            <div className="name-avater-tag">
                              <span> {user?.business?.name} </span>
                              <span className="business_name">
                                {user?.business?.registrationNumber}
                              </span>
                            </div>
                          </td>

                          <td> {user?.email}</td>

                          <td>
                            {currencyPairCheck(user.currency)}
                            {AmountCheck(
                              user.totalAmount !== null ? user?.totalAmount : 0
                            )}
                          </td>
                          <td>{new Date(user?.issueDate).toDateString()}</td>
                          <td>{new Date(user?.dueDate).toDateString()}</td>
                          <td>{user?.invoiceItems?.length}</td>

                          <td
                            style={{
                              color:
                                user?.paymentStatus === "PENDING"
                                  ? "#F04438"
                                  : user?.paymentStatus === "UNPAID"
                                  ? "#F04438"
                                  : "#12B76A",
                            }}
                          >
                            {user?.paymentStatus}{" "}
                          </td>

                          <td
                            className="view_account"
                            onClick={() => {
                              navigate(`/flex/${user._id}`);
                            }}
                          >
                            View
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}{" "}
                  {currentTableDataInvoice.length === 0 && (
                    <div className="empty_lg">
                      <img src={empty} alt="" />
                      <div className="bg_lg_dm">
                        <h4>No Flex Finance Transaction</h4>
                        <span>Finance will show here.</span>
                      </div>
                    </div>
                  )}
                </table>

                <div className="page-container">
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={dataf.length}
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
                {currentTableDataFinance.length} Local Transfer
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
                254 FX New Payments
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
                        Recipient{" "}
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
                          <td>
                            {" "}
                            {user.firstName} {user.lastName}{" "}
                          </td>
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

export default TransferPay;
