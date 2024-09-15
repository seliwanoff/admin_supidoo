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
import boxadd from "../assets/images/box-add.svg";
import OrderModal from "../components/OrderModal";
import flexinvice from "../assets/images/flexinvoice.svg";
import invoicereceipt from "../assets/images/orderlogo.svg";
import addcirccle from "../assets/images/addcircleflex.svg";
import AddUserModal from "../components/addUserModal";
import currencyPairCheck from "../components/logoCurrency";

let PageSize = 20;

const FlexHome = () => {
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

  const [tab, settab] = useState("Factoring");
  const [stat, setstat] = useState([]);
  const [show, setshow] = useState(false);
  const [fail, setfail] = useState(false);
  const [success, setsucess] = useState(false);
  const [message, setmessage] = useState("");
  const [showuser, setshowusee] = useState(false);
  useEffect(() => {
    if (fail) {
      var timeout = setTimeout(() => {
        setfail(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });
  useEffect(() => {
    if (success) {
      var timeout = setTimeout(() => {
        setsucess(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  const filtercontant = data.filter((item) =>
    item?.business?.name?.match(search)
  );
  //console.log(filtercontant)
  const filterofcredit = ltterOfcredit.filter((item) =>
    item?.firstName?.match(search)
  );
  const filterTradeofCredit = tradeOfCredit.filter((item) =>
    item?.orderStatus.match(search)
  );

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filtercontant.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filtercontant]);
  //console.log(currentTableData)

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
  //  console.log(currentTableDataTradeOfCrdit)
  //console.log()
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
        .get("/v1/admin/flex/get-all-flex-users")
        .then((res) => {
          //  console.log(res)
          setletterofCredit(res.data.data);
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
        .get("/v1/admin/flex/get-all-orders")
        .then((res) => {
          //console.log(res)
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
        .get("/v1/admin/flex/get-all-invoice")
        .then((res) => {
          //console.log(res)
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
    const getFlexInvoice = async () => {
      await axios
        .get("/v1/admin/flex/get-all-invoice")
        .then((res) => {
          //  console.log(res)
          //  setData(res.data.data);
          setisloading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getFlexInvoice();
  }, []);
  const goToDetails = (items, p) => {
    navigate(`/flex/${items._id}`, {
      state: {
        ...items,
        customtype: p,
      },
    });
  };

  const sorting = (col, index) => {
    setselectedIndex(index);
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col]?.toLowerCase() > b[col]?.toLowerCase() ? 1 : -1
      );
      //    console.log(sorted);
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col]?.toLowerCase() < b[col]?.toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  return (
    <>
      <div className="main">
        <OtherHeader title={"Flex"} />
        <OrderModal
          show={show}
          setshow={setshow}
          setfail={setfail}
          setsucess={setsucess}
          setmessage={setmessage}
          setTradeOfCredit={setTradeOfCredit}
          tradeOfCredit={tradeOfCredit}
        />
        <AddUserModal
          show={showuser}
          setshow={setshowusee}
          setfail={setfail}
          setsucess={setsucess}
          setmessage={setmessage}
          setTradeOfCredit={setletterofCredit}
        />

        <div className="info-cl2">
          <ul className="tp-head-list">
            <li
              onClick={() => settab("Factoring")}
              style={{
                borderBottom: tab === "Factoring" ? "3px solid #6F00FF" : "",
              }}
            >
              TradeVu Network
            </li>
            {/**
            <li
              onClick={() => settab("Trade Credit")}
              style={{
                borderBottom: tab === "Trade Credit" ? "3px solid #6F00FF" : "",
              }}
            >
              Invoices
            </li>
            */}
            <li
              onClick={() => settab("Letter of credit")}
              style={{
                borderBottom:
                  tab === "Letter of credit" ? "3px solid #6F00FF" : "",
              }}
            >
              Orders
            </li>
          </ul>
          {isloading && (
            <div className="loadingdata">
              {" "}
              <LoaderDate />{" "}
            </div>
          )}
          {isloading === false && tab === "Factoring" && (
            <div
              className="lg-card"
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
                    width: "100%",
                    boxSizing: "border-box",
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
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "24px 24px 12px 24px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <div className="create_order">
                    Manage all networks within TradeVu here
                  </div>
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#657795",
                      lineHeight: "19.6px",
                      letterSpacing: "-1%",
                    }}
                  >
                    {currentTableDataFinance.length} Partners
                  </span>
                </div>
                {/**
                <button
                  className="btn-flex-order"
                  onClick={() => setshowusee(true)}
                >
                  <img src={addcirccle} alt="" />
                  Add New
                </button>
                */}
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
                      <th onClick={() => sorting("email", 1)}>
                        Phone Number{" "}
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
                        Partner Type{" "}
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
                        Date Added
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
                        Added By{" "}
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
                        Order{" "}
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
                    {currentTableDataFinance.map((user, index) => (
                      <tr
                        key={index}
                        className="each_row"
                        onClick={() => goToDetails(user, "Partner")}
                      >
                        <td
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div className="profile-d-icon">
                            {user?.businessName?.slice(0, 2)}
                          </div>
                          <div className="name-avater-tag">
                            {user?.businessName}
                            <span className="business_name">
                              <span>
                                {" "}
                                {user?.firstName} {user?.lastName}{" "}
                              </span>
                            </span>
                          </div>
                        </td>

                        <td> {user?.email} </td>
                        <td> {user?.phoneNumber} </td>

                        <td
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          {user.flexUserType}
                        </td>
                        <td>
                          {new Date(user.createdAt).toDateString()}{" "}
                          {new Date(user.createdAt).toLocaleTimeString()}
                        </td>
                        <td>
                          {user?.isAdminCreated ? (
                            "Admin"
                          ) : (
                            <>{user?.business?.name}</>
                          )}
                        </td>
                        <td>{user?.orders?.length}</td>
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
                            navigate(`/flex/${user._id}`);
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
          {/**
          {isloading && (
            <div className="loadingdata">
              <LoaderDate />{" "}
            </div>
          )}
           */}
          {isloading === false && tab === "Letter of credit" && (
            <div
              className="lg-card"
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
                    width: "100%",
                    boxSizing: "border-box",
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
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "24px 24px 12px 24px",
                  boxSizing: "border-box",
                }}
              >
                <div className="create_order">
                  Create or manage customers’ orders here
                </div>
                {/**
                <button
                  className="btn-flex-order"
                  onClick={() => setshow(true)}
                >
                  <img src={boxadd} alt="" />
                  Create Order
                </button>
                */}
              </div>
              <div
                className="md-cl"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div></div>
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
                        Owner
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
                        Order{" "}
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
                        Partner{" "}
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
                        Payment Term
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
                        Amount{" "}
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
                      <th>
                        Delivery Date{" "}
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
                    </tr>
                  </thead>
                  {currentTableDataTradeOfCrdit.length > 0 && (
                    <tbody className="table-head" style={{ width: "100%" }}>
                      {currentTableDataTradeOfCrdit.map((user, index) => (
                        <tr
                          key={index}
                          className="each_row"
                          onClick={() => {
                            navigate(`/flex/order/${user._id}`, {
                              state: {
                                ...user,
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
                            <img src={invoicereceipt} alt="" />
                            <div className="name-avater-tag">
                              <span>
                                {user?.isAdminCreated ? (
                                  "Admin"
                                ) : (
                                  <>
                                    {user?.business?.user?.firstName}{" "}
                                    {user?.business?.user?.lastName}
                                  </>
                                )}{" "}
                              </span>
                              <span className="business_name">
                                {user.isAdminCreated === false
                                  ? user.business?.name
                                  : ""}
                              </span>
                            </div>
                          </td>

                          <td> {user?.title} </td>

                          <td>
                            {user?.isAdminCreated ? (
                              <>{user.business?.name}</>
                            ) : (
                              <> {user.flexUser?.businessName}</>
                            )}
                          </td>
                          <td>{user.paymentTerms}</td>

                          <td>
                            {" "}
                            {currencyPairCheck(user.currency)}
                            {parseFloat(user.totalAmount).toLocaleString()}
                          </td>
                          <td
                            style={{
                              color:
                                user?.status === "pending"
                                  ? "#F79009"
                                  : user?.status === "REJECTED"
                                  ? "#F04438"
                                  : user?.status === "Incoming"
                                  ? "#667085"
                                  : "#12B76A",
                            }}
                          >
                            {user.status === "accepted"
                              ? "Completed"
                              : user.status}{" "}
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
                      ))}{" "}
                    </tbody>
                  )}

                  {currentTableDataFinance.length === 0 && (
                    <div className="empty_lg">
                      <img src={empty} alt="" />
                      <div className="bg_lg_dm">
                        <h4>No Order Yet</h4>
                        <span>Orders will show here.</span>
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
          {/**
          {isloading && (
            <div className="loadingdata">
              <LoaderDate />{" "}
            </div>
          )}
           */}
          {isloading === false && tab === "Trade Credit" && (
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
                  {currentTableData.length > 0 && (
                    <tbody className="table-head" style={{ width: "100%" }}>
                      {currentTableData.map((user, index) => (
                        <tr
                          key={index}
                          className="each_row"
                          onClick={() => {
                            navigate(`/flex/invoice/${user?._id}`, {
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

                          <td> {user?.business?.email} </td>

                          <td>
                            {user.currency === "NGN"
                              ? "₦"
                              : user.currency === "EUR"
                              ? "€"
                              : user.currency === "USD"
                              ? "$"
                              : "£"}
                            {parseFloat(
                              user.totalAmount !== null ? user?.totalAmount : 0
                            ).toLocaleString()}
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
                  {currentTableData.length === 0 && (
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

export default FlexHome;
