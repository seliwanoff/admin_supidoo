import sech from "../assets/images/search-lg.svg";

// import {useNavigate} from "react-router";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import OtherHeader from "../components/otherheader";
import { useNavigate } from "react-router";
import Pagination from "../components/pagination";
import mark from "../assets/images/mycheck.svg";
import LoaderDate from "../components/loaderData";
let PageSize = 40;

const TransferRequest = () => {
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
  const [selectedcountry, setselectedcountry] = useState("All");
  const [selectedindexcountry, setselectedindexcountry] = useState(0);
  const [total, settotal] = useState(0);

  const filtercontant = data.filter((countrycodelists) =>
    countrycodelists.business?.name?.match(search)
  );
  const [stat, setstat] = useState([]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filtercontant?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filtercontant]);
  const [totalitem, setotal] = useState(20);
  const status = ["All", "Completed", "Pending", "Failed"];
  const date = ["Recent", "Past week", "Past month", "Past year"];
  const country = ["All", "GBP", "NGN", "US", "EUR"];
  useEffect(() => {
    const fetchBusiness = async () => {
      await axios
        .get(`/v1/admin/transaction/transfer_request/all`)
        .then((res) => {
          // console.log(res);
          settotal(res.data.meta.totalItems);

          axios
            .get(
              `/v1/admin/transaction/transfer_request/all?limit=${
                res.data.meta.totalItems
              }${
                selectedstatus === "All"
                  ? ""
                  : selectedstatus === "Completed"
                  ? "&status=Success"
                  : selectedstatus === "Pending"
                  ? "&status=Pending"
                  : "&status=Rejected"
              }${
                selectedcountry === "All"
                  ? ""
                  : selectedcountry === "GBP"
                  ? "&currency=GBP"
                  : selectedcountry === "US"
                  ? "&currency=USD"
                  : selectedcountry === "NGN"
                  ? "&currency=NGN"
                  : `&currency=${selectedcountry}`
              }`
            )
            .then((res) => {
              // console.log(res)
              setData(res.data.data);
              setisloading(false);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchBusiness();
  }, [setisloading, selectedstatus, selectedcountry]);
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
    navigate(`/transfer/request/${items._id}`, {
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
        <OtherHeader title={"Transfer Request"} />

        <div className="info-cl2">
          <div
            className="lg-card"
            style={{
              paddingTop: "0px",
            }}
          >
            <div
              style={{
                padding: "24px 24px 12px 24px",
              }}
            >
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                  lineHeight: "24.3px",
                  color: "#344054",
                }}
              >
                {total} Requests
              </span>
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
                    placeholder="Search by business name"
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
                  <span className="type">Sort</span>

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
              {isloading && <LoaderDate />}
              {isloading === false && (
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
                      <th onClick={() => sorting("email", 1)}>
                        ID{" "}
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
                        Recipient{" "}
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
                      <th onClick={() => sorting("type", 3)}>
                        Amount{" "}
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
                        Bank{" "}
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
                        onClick={() => goToDetails(user)}
                      >
                        <td
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div className="name-avater-tag">
                            <span> {user?._id} </span>
                            <span className="business_name">
                              {user?.business?.name}
                            </span>
                          </div>
                        </td>

                        <td> {user.business?.email} </td>
                        <td> {user?._id} </td>

                        <td>
                          {" "}
                          {user?.AccountName
                            ? user?.AccountName
                            : user.business?.name}{" "}
                          ({user?.AccountNumber}){" "}
                        </td>
                        <td>
                          {user.currency === "NGN"
                            ? "₦"
                            : user.currency === "EUR"
                            ? "€"
                            : user.currency === "USD"
                            ? "$"
                            : "£"}
                          {parseFloat(user?.amount).toLocaleString()}{" "}
                        </td>
                        <td>
                          {" "}
                          {new Date(user.createdAt).toDateString()}{" "}
                          {new Date(user.createdAt).toLocaleTimeString()}
                        </td>
                        <td> {user.BankName} </td>
                        <td
                          style={{
                            color:
                              user?.status === "Pending"
                                ? "#F79009"
                                : user?.status === "Failed"
                                ? "#F04438"
                                : user?.status === "PROCESSING"
                                ? "#F04438"
                                : user?.status === "SUBMITTED"
                                ? "#F79009"
                                : "#12B76A",
                          }}
                        >
                          {user.status === "Success"
                            ? "COMPLETED"
                            : user.status}
                        </td>
                        <td
                          className="view_account"
                          onClick={() => {
                            navigate(`/transfer/request/${user?._id}`);
                          }}
                        >
                          View
                          <span className="material-icons">chevron_right</span>
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

export default TransferRequest;
