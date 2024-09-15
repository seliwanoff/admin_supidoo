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
import AmountCheck from "../components/amountcheck";
import currencyPairCheck from "../components/logoCurrency";
import TransactionName from "../components/transactionNAme";
let PageSize = 40;

const ReferralsHome = () => {
  const [order, setOrder] = useState("ASC");
  const [selectedIndex, setselectedIndex] = useState(0);
  const [isStatus, setisStatus] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [isDate, setisDate] = useState(false);
  const [isCountry, setisCountry] = useState(false);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");
  const [selectedstatus, setselectedstatus] = useState("All");
  const [selectedindexstatus, setselectedindexstatus] = useState(0);
  const [selecteddate, setselecteddate] = useState("Recent");
  const [selectedindexdate, setselectedindexdate] = useState(-1);
  const [selectedcountry, setselectedcountry] = useState("All");
  const [selectedindexcountry, setselectedindexcountry] = useState(0);
  const [length, setlength] = useState(0);

  const filtercontant = data.filter((countrycodelists) =>
    countrycodelists.username?.match(search)
  );
  const [stat, setstat] = useState([]);

  //console.log(filtercontant)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filtercontant?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filtercontant]);
  //const [totalitem, setotal] = useState(20);
  const status = ["All", "Completed", "Pending", "Failed"];
  const date = ["Recent", "Past week", "Past month", "Past year"];
  const country = ["All", "Active", "Pending"];
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [transaction, setTransactiion] = useState([]);

  // console.log(selectedcountry);
  useEffect(() => {
    const fetchBusiness = async () => {
      await axios
        .get(
          `admin/getreferal${
            selectedcountry === "All"
              ? ""
              : selectedcountry === "Active"
              ? "?status=1"
              : "?status=0"
          }`
        )

        .then((res) => {
          // console.log(res);
          setData(res.data.data.data);
          setisloading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchBusiness();
  }, [setisloading, selectedstatus, selectedcountry, startDate, endDate]);
  const getChangesDate = (index) => {
    if (index == 3) {
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
    } else if (index == 1) {
      const currentDate = new Date();
      setstartDate(currentDate);
      // Calculate the date from one week ago
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(currentDate.getDate() - 7);
      setendDate(oneWeekAgo);
    } else if (index == 0) {
      const currentDate = new Date();
      setstartDate(currentDate);

      // Calculate the date from 24 hours ago
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(currentDate.getHours() - 24);
      setendDate(twentyFourHoursAgo);
    }
  };
  useEffect(() => {
    const fetchTransaction = async () => {
      await axios
        .get("admin/refstatics")
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
  useEffect(() => {
    const fetchStat = async () => {
      await axios
        .get("/v1/admin/get-businesses-stats")
        .then((response) => {
          // console.log(response)
          setstat(response.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchStat();
  }, []);
  const goToDetails = (items) => {
    navigate(`/transaction/home/${items._id}`, {
      state: {
        ...items,
      },
    });
  };

  const sorting = (col, index) => {
    setselectedIndex(index);
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      // console.log(sorted);
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder("ASC");
    }
  };

  return (
    <>
      <div className="main">
        <OtherHeader title={"Transactionss"} />

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
                <h5>Total referral</h5>
                <div className="stat-line">
                  <span>{transaction.numberOfAllReferal}</span>
                </div>
              </div>
            </div>
            <div className="main-card-each">
              <div className="innercard">
                <h5>Active Referral</h5>
                <div className="stat-line">
                  <span>{transaction.numberOfActiveReferal}</span>
                </div>
              </div>
            </div>
            <div className="main-card-each">
              <div className="innercard">
                <h5>Inactive Referral</h5>
                <div className="stat-line">
                  <span>{transaction.numberOfInactiveReferal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-cl2">
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
                    maxWidth: "320px",
                    width: "100%",
                  }}
                >
                  <img src={sech} alt="" />
                  <input
                    type="text"
                    placeholder="Search username"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    style={{
                      outline: "none",
                      border: "none",
                      background: "#ECEFF3",
                      width: "100%",
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

            <div style={{ overflow: "auto" }}>
              {isloading && <LoaderDate />}
              {isloading === false && (
                <table className="table  row-datatable">
                  <thead className="table-head">
                    <tr>
                      <th onClick={() => sorting("user['firstName']", 0)}>
                        Username
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
                      {/**
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
                      */}

                      <th onClick={() => sorting("type", 3)}>
                        Date{" "}
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
                        Refer{" "}
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
                    </tr>
                  </thead>
                  <tbody className="table-head" style={{ width: "100%" }}>
                    {currentTableData.map((user, index) => (
                      <tr key={index} className="each_row">
                        <td
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div className="name-avater-tag">
                            <span> {user?.username} </span>
                          </div>
                        </td>
                        {/**
                        <td> {user.business?.email} </td>
                        */}

                        <td>
                          {" "}
                          {new Date(user.created_at).toDateString()}{" "}
                          {new Date(user.created_at).toLocaleTimeString()}{" "}
                        </td>
                        <td>{user?.refer} </td>
                        <td
                          style={{
                            color: `${user?.status === "1" ? "green" : "pink"}`,
                          }}
                        >
                          {user?.status === "1" ? "Completed" : "Pending"}{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
        </div>
      </div>
    </>
  );
};

export default ReferralsHome;
