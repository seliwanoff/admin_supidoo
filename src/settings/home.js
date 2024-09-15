import { useState, useEffect } from "react";
import SettingsHeader from "../components/settingsheader";
import sech from "../assets/images/search-lg.svg";
import profile from "../assets/images/profile-icon.svg";
import { countrycodelist } from "../components/countryList";
import OtherHeader from "../components/otherheader";
import avi from "../assets/images/avi.svg";
import edit from "../assets/images/updateiconadd.svg";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import Modal from "../components/modal";
import axios from "axios";
import Pagination from "../components/pagination";
import mark from "../assets/images/mycheck.svg";

import { useMemo } from "react";
import LoaderDate from "../components/loaderData";
import useradd from "../assets/images/profile-add.svg";
import AddAdminModal from "../components/addadmin";
import { useSelector } from "react-redux";
import currencyList from "../components/currencylist";
import UpdateCurrency from "../components/updateCurrencyPair";
import CurrencyModal from "../components/currencymodal";
let PageSize = 20;

// import logo from '../assets/images/iconsd.svg'
// import {useNavigate} from "react-router";
const Settings = () => {
  const navigate = useNavigate();
  const [tab, settab] = useState("profile");
  const [show, setshow] = useState(false);
  const [show2, setshow2] = useState(false);
  const [pairs, setpair] = useState([]);

  const selector = useSelector((state) => state);

  const users = selector.users;

  const [type, settype] = useState("Percentage");
  const [interest, setinterest] = useState(0);
  const [name, setname] = useState("");
  const [tag, settag] = useState("");
  const [setting, setsettins] = useState([]);
  const [loader, setloader] = useState(false);
  const [success, setsucess] = useState(false);
  const [fail, setfail] = useState(false);
  const [message, setmessage] = useState("");
  const [selectedcurrency, setseletedcurrency] = useState("NGN");

  const [search, setsearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [stat, setstat] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [selectedIndex, setselectedIndex] = useState(0);
  const [isStatus, setisStatus] = useState(false);
  const [isDate, setisDate] = useState(false);
  const [isCountry, setisCountry] = useState(false);

  const [selectedstatus, setselectedstatus] = useState("All");
  const [selectedindexstatus, setselectedindexstatus] = useState(0);
  const [selecteddate, setselecteddate] = useState("Recent");
  const [selectedindexdate, setselectedindexdate] = useState(-1);
  const [selectedcountry, setselectedcountry] = useState("");
  const [selectedindexcountry, setselectedindexcountry] = useState(0);
  const [isInverse, setIsverse] = useState(false);
  const [email, setemail] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");
  const [baseRate, setbaseRate] = useState(0);
  //console.log(pairs?.baseCurrencyRate);
  const status = ["All", "Active", "Inactive"];
  const date = ["Recent", "Past week", "Past month", "Past year"];
  const country = ["All", "super", "normal"];
  const [data, setData] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [showcurrency, setshowcurrency] = useState(false);
  const [showadminadd, setshowadmnadd] = useState(false);
  const [phone, setphone] = useState("");
  const filtercontant = data.filter((countrycodelists) =>
    countrycodelists.type?.match(search)
  );
  const [selecteditems, setselecteditems] = useState([]);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filtercontant?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filtercontant]);
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [currencyPair, setCurrencyPair] = useState([]);
  useEffect(() => {
    const fetchsettings = async () => {
      await axios
        .get("/v1/admin/setting")
        .then((res) => {
          //console.log(res);
          setsettins(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchsettings();
  }, []);
  useEffect(() => {
    const fetchCurrencyPair = async () => {
      axios
        .get("/v1/admin/currency/all")
        .then((res) => {
          // console.log(res);

          setCurrencyPair(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchCurrencyPair();
  }, []);
  function filterDataByBaseCurrency(baseCurrency) {
    return currencyPair.filter(
      (item) =>
        item.baseCurrency === baseCurrency ||
        item.quoteCurrency === baseCurrency
    );
  }

  // const filteredDataNGN = filterDataByBaseCurrency();
  //console.log(filteredDataNGN);
  //console.log(isInverse);
  useEffect(() => {
    const fetchBusiness = async () => {
      axios
        .get(`admin/getalladmin`)
        .then((res) => {
          console.log(res);
          setisloading(false);

          setData(res.data.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchBusiness();
  }, [
    setisloading,
    selectedcountry,
    selectedstatus,
    startDate,
    endDate,
    selectedindexstatus,
  ]);

  useEffect(() => {
    if (fail) {
      let timer = setTimeout(() => {
        setfail(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [fail]);
  useEffect(() => {
    if (success) {
      let timer = setTimeout(() => {
        setsucess(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [success]);
  const setInterest = async () => {
    setloader(true);
    const datatr = {
      localTransferFee: interest,
    };
    const datain = {
      financeInvoiceInterest: interest,
    };

    const datacr = {
      financeCreditLineInterest: interest,
    };
    const datawr = {
      financeWorkingCapitalInterest: interest,
    };
    const ngntr = {
      crossBorderTransferFee: interest,
    };
    const gbp = {
      GBPTransferFee: interest,
    };
    const eur = {
      EURTransferFee: interest,
    };
    const dolr = {
      fxTransferFee: interest,
    };
    await axios
      .patch(
        `/v1/admin/setting`,
        name === "localTransferFee"
          ? datatr
          : name === "financeInvoiceInterest"
          ? datain
          : name === "financeCreditLineInterest"
          ? datacr
          : name === "crossBorderTransferFee"
          ? ngntr
          : name === "FXTransferFee"
          ? dolr
          : name === "GBPTransferFee"
          ? gbp
          : name === "EURTransferFee"
          ? eur
          : datawr
      )
      .then((res) => {
        setsucess(true);
        setfail(false);
        setmessage(res.data.message);
        setshow(false);
        axios
          .get("/v1/admin/setting")
          .then((res) => {
            setsettins(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
        setloader(false);
      })
      .catch((e) => {
        //console.log(e)
        setsucess(false);
        setfail(true);
        setmessage(
          e?.reponse?.data?.message
            ? e?.reponse?.data?.message
            : "An error occur"
        );
        setshow(false);
        setloader(false);
        setinterest(0);
      });
  };

  const UpdatePairs = async () => {
    setloader(true);

    await axios
      .patch(`/v1/admin/currency/update/${pairs._id}`, {
        baseCurrencyRate: parseFloat(baseRate),
      })
      .then((res) => {
        setsucess(true);
        setfail(false);
        setmessage(res.data.message);
        setshow2(false);
        axios
          .get("/v1/admin/currency/all")
          .then((res) => {
            setCurrencyPair(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
        setloader(false);
      })
      .catch((e) => {
        //console.log(e)
        setsucess(false);
        setfail(true);
        setmessage(
          e?.reponse?.data?.message
            ? e?.reponse?.data?.message
            : "An error occur"
        );
        setshow(false);
        setloader(false);
        setinterest(0);
      });
  };
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
  //console.log(sett)
  const AddNewAdmin = async (newrole) => {
    const data = {
      email: email,
      type: newrole,
      firstname: firstname,
      lastname: lastname,
      password: password,
      phone: "234" + phone.slice(1),
    };
    //console.log(data)
    await axios
      .post("/createadmin", data)
      .then((res) => {
        // console.log(res)
        setsucess(true);
        setfail(false);
        setmessage(res.data.message);
        setshowadmnadd(false);

        axios.get(`admin/getalladmin`).then((res) => {
          //  console.log(res)
          setisloading(false);
          setemail("");
          setrole("");
          setfirstname("");
          setlastname("");
          setphone("");
          setpassword("");

          setData(res.data.data.data);
        });
      })
      .catch((e) => {
        console.log(e);
        setsucess(false);
        setfail(true);
        setmessage(
          e?.response?.data ? e?.response?.data?.message : "An error occur"
        );
        setshowadmnadd(false);
        setloader(false);
        setemail("");
        setrole("");
      });
  };
  const goToDetails = (items) => {
    navigate(`/admin/${items._id}`, {
      state: {
        ...items,
      },
    });
  };

  const sorting = (col, index) => {
    setselectedIndex(index);
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      console.log(sorted);
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
      <Modal
        show={show}
        loader={loader}
        setshow={setshow}
        setInterest={setInterest}
        type={type}
        settype={settype}
        interest={interest}
        setinterest={setinterest}
        tag={tag}
      />
      <UpdateCurrency
        show={show2}
        loader={loader}
        setshow={setshow2}
        setInterest={UpdatePairs}
        type={type}
        pairs={pairs}
        setpair={setpair}
        setbaseRate={setbaseRate}
        baseRate={baseRate}
        settype={settype}
        interest={pairs}
        setinterest={setinterest}
        tag={tag}
      />
      <AddAdminModal
        show={showadminadd}
        loader={loader}
        setshow={setshowadmnadd}
        setInterest={AddNewAdmin}
        type={email}
        settype={setemail}
        password={password}
        firstname={firstname}
        setpassword={setpassword}
        setfirstname={setfirstname}
        setlastname={setlastname}
        setphone={setphone}
        lastname={lastname}
        setemail={setemail}
        phone={phone}
        interest={role}
        setinterest={setrole}
        // tag={tag}
      />
      <CurrencyModal
        show={showcurrency}
        setshow={setshowcurrency}
        setdefaultcurrency={setseletedcurrency}
        setselecteditems={setselecteditems}
      />

      <div className="main">
        <OtherHeader title={"Settings"} arrow={""} />
        <Helmet>Settings</Helmet>

        <div className="info-cl-w">
          <ul className="list-tab">
            <li
              onClick={() => settab("profile")}
              style={{
                color: tab === "profile" && "#101828",
                borderBottom: tab === "profile" && "2px solid #6F00FF",
              }}
            >
              My Account{" "}
            </li>
            <li
              onClick={() => settab("people")}
              style={{
                color: tab === "people" && "#101828",
                borderBottom: tab === "people" && "2px solid #6F00FF",
              }}
            >
              People
            </li>
            {/**
            <li
              onClick={() => settab("configuration")}
              style={{
                color: tab === "configuration" && "#101828",
                borderBottom: tab === "configuration" && "2px solid #6F00FF",
              }}
            >
              Configurations
            </li>
            */}
          </ul>
          <div className="bottom_lg">
            {tab === "profile" && (
              <>
                <div className="container-overflow">
                  <div className="top_layer_overflow">
                    <div className="profile_lg_overflow">
                      {users?.profileImage ? (
                        <img src={`${users?.profileImage}`} alt="" />
                      ) : (
                        <div
                          className="inital_name"
                          style={{
                            height: "60px",
                            width: "60px",
                          }}
                        >
                          {users?.firstname?.slice(0, 1)}{" "}
                          {users?.lastname?.slice(0, 1)}
                        </div>
                      )}
                      <div className="name_overflow">
                        <h3
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          {users?.firstname} {users?.lastname}
                        </h3>
                        <span>{users?.type}</span>
                      </div>
                    </div>

                    <div className="other-details">
                      <h4>Profile</h4>
                      <div className="detail_oveflow">
                        <div className="each_details_overflow">
                          <span>Name</span>
                          <div>
                            {users?.firstname} {users?.lastname}
                          </div>
                        </div>
                        <div className="each_details_overflow">
                          <span>Role</span>
                          <div>{users?.type} </div>
                        </div>
                        <div className="each_details_overflow">
                          <span>Job Title</span>
                          <div
                            style={{
                              textTransform: "capitalize",
                            }}
                          >
                            {users?.type}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {tab === "people" && (
              <>
                <div
                  className="info-cl2"
                  style={{
                    padding: "0px",
                  }}
                >
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

                          zIndex: "99999",

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
                        position: "relative",
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
                          Manage your team members and their account permissions
                          here.
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
                          {filtercontant.length} People
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "24px",
                        }}
                      >
                        {/***
                        <button
                          className="btn-flex-order"
                          style={{
                            background: "#EBE4FF",
                            color: "#6F00FF",
                          }}
                        >
                          View roles
                        </button>
                        */}
                        <button
                          className="btn-flex-order"
                          onClick={() => setshowadmnadd(true)}
                        >
                          <img src={useradd} alt="" />
                          Invite
                        </button>
                      </div>
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
                            placeholder="Search by  name"
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
                          <span className="type">Role</span>

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
                              <th
                                onClick={() => sorting("user['firstname']", 0)}
                              >
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
                                Phone Number{" "}
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
                                Role{" "}
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
                                      color:
                                        order === "ASC" ? "#873BFF" : "#667085",
                                    }}
                                  >
                                    arrow_drop_up
                                  </span>

                                  <span
                                    className="material-icons down-arrow"
                                    style={{
                                      color:
                                        order === "DSC" ? "#873BFF" : "#667085",
                                    }}
                                  >
                                    arrow_drop_down
                                  </span>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody
                            className="table-head"
                            style={{ width: "100%" }}
                          >
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
                                  <div className="profile-d-icon">
                                    {user?.firstname?.slice(0, 1)}
                                    {user?.lastname?.slice(0, 1)}
                                  </div>
                                  <div className="name-avater-tag">
                                    <span>
                                      {" "}
                                      {user?.firstname} {user?.lastname}{" "}
                                    </span>
                                    <span className="business_name">
                                      {user?.type}{" "}
                                    </span>
                                  </div>
                                </td>

                                <td> {user?.email} </td>
                                <td> {user?.phone} </td>
                                <td>{user?.type} </td>

                                <td>
                                  {" "}
                                  {new Date(
                                    user.created_at
                                  ).toDateString()}{" "}
                                </td>

                                <td
                                  style={{
                                    color:
                                      user?.status === "0"
                                        ? "#F04438"
                                        : "#12B76A",
                                  }}
                                >
                                  {user?.status === "1"
                                    ? "Completetd"
                                    : "Pending"}{" "}
                                </td>

                                <td
                                  className="view_account"
                                  onClick={() => {
                                    goToDetails(user);
                                  }}
                                >
                                  View
                                  <span className="material-icons">
                                    chevron_right
                                  </span>
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
              </>
            )}
            {tab === "configuration" && (
              <>
                <div
                  className="container-overflow"
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

                  <div className="top_layer_overflow">
                    <div
                      className="other-details"
                      style={{
                        paddingTop: "0px",
                      }}
                    >
                      <h4>Fees</h4>
                      <div className="detail_oveflow">
                        <div className="each_details_overflow">
                          <span>Invoice Quote</span>
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            0.1%
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                color: "#6F00FF",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setname("financeInvoiceInterest");
                                setshow(true);
                              }}
                            >
                              <img src={edit} alt="" />
                              Edit
                            </div>
                          </div>
                        </div>

                        <div className="each_details_overflow">
                          <span>NGN Transfer fee</span>
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            {parseFloat(setting?.localTransferFee).toFixed(2)}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                color: "#6F00FF",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setname("localTransferFee");
                                setshow(true);
                                settag("Transfer Fees");
                              }}
                            >
                              <img src={edit} alt="" />
                              Edit
                            </div>
                          </div>
                        </div>

                        <div className="each_details_overflow">
                          <span>FX Transfer fee</span>
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            {parseFloat(setting?.fxTransferFee).toFixed(2)}%
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                color: "#6F00FF",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setname("FXTransferFee");
                                setshow(true);
                                settag("FX Trasnfer Fees");
                              }}
                            >
                              <img src={edit} alt="" />
                              Edit
                            </div>
                          </div>
                        </div>

                        <div className="each_details_overflow">
                          <span>FX Transaction fee</span>
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            {setting?.crossBorderTransferFee}%
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                color: "#6F00FF",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setname("crossBorderTransferFee");
                                setshow(true);
                                settag("FX Transaction Fee");
                              }}
                            >
                              <img src={edit} alt="" />
                              Edit
                            </div>
                          </div>
                        </div>
                        <div className="each_details_overflow">
                          <span>Cross Border Transfer Fee</span>
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            {setting?.crossBorderTransferFee}%
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                color: "#6F00FF",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setname("crossBorderTransferFee");
                                setshow(true);
                                settag("Cross Border Fee");
                              }}
                            >
                              <img src={edit} alt="" />
                              Edit
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="other-details">
                      <h4>Interests</h4>
                      <div className="detail_oveflow">
                        <div className="each_details_overflow">
                          <span>Invoice factoring</span>
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            {parseFloat(setting?.financeInvoiceInterest * 100)}%
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                color: "#6F00FF",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setname("financeInvoiceInterest");
                                setshow(true);
                                settag("Invoice Factoring");
                              }}
                            >
                              <img src={edit} alt="" />
                              Edit
                            </div>
                          </div>
                        </div>
                        <div className="each_details_overflow">
                          <span>Working capital</span>
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            {parseFloat(
                              setting?.financeWorkingCapitalInterest * 100
                            )}
                            %
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                color: "#6F00FF",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setname("financeWorkingCapitalInterest");
                                setshow(true);
                                settag("Working Capital");
                              }}
                            >
                              <img src={edit} alt="" />
                              Edit
                            </div>
                          </div>
                        </div>
                        <div className="each_details_overflow">
                          <span>Credit line</span>
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            {parseFloat(
                              setting?.financeCreditLineInterest * 100
                            )}
                            %
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                color: "#6F00FF",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setname("financeCreditLineInterest");
                                setshow(true);
                                settag("Credit Line");
                              }}
                            >
                              <img src={edit} alt="" />
                              Edit
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/**** Rate */}

                    <div className="other-details">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h4
                          style={{
                            width: "230px",
                          }}
                        >
                          FX Rates
                        </h4>
                        <div
                          style={{
                            width: "230px",
                            color: "#6F00FF",
                            fontWeight: "500",
                            fontSize: "14px",
                            lineHeight: "19.6px",
                          }}
                        >
                          View history
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            width: "230px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              display: "inline-block",
                            }}
                          >
                            {" "}
                            Inverse{" "}
                          </div>
                          <div
                            style={{
                              marginTop: "-20px",
                            }}
                          >
                            <input
                              type="checkbox"
                              id="switch"
                              onChange={(e) => setIsverse(e.target.checked)}
                            />
                            <label for="switch">Toggle</label>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "230px",
                            color: "#344054",
                            fontWeight: "500",
                            fontSize: "14px",
                            lineHeight: "19.6px",
                          }}
                        >
                          Amount
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            width: "230px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            className="each_currency_pay"
                            onClick={() => {
                              filterDataByBaseCurrency(selectedcurrency);
                              setshowcurrency(true);
                            }}
                          >
                            <img
                              src={currencyList(selectedcurrency).img}
                              alt=""
                              height={20}
                              width={20}
                            />
                            <span>{currencyList(selectedcurrency).title}</span>
                            <span
                              className="material-icons"
                              style={{
                                color: "#475467",
                              }}
                            >
                              expand_more
                            </span>
                          </div>
                        </div>
                        {
                          <div
                            style={{
                              width: "230px",
                              color: "#344054",
                              fontWeight: "700",
                              fontSize: "16px",
                              lineHeight: "19.6px",
                            }}
                          >
                            1
                            {selectedcurrency === "NGN"
                              ? "₦"
                              : selectedcurrency === "EUR"
                              ? "€"
                              : selectedcurrency === "USD"
                              ? "$"
                              : "£"}
                          </div>
                        }
                      </div>
                      <div
                        className="detail_oveflow"
                        style={{
                          border: "1px solid #E7E9FB",
                          borderRadius: "8px",
                          padding: "16px",
                        }}
                      >
                        {isInverse === false && (
                          <>
                            {filterDataByBaseCurrency(selectedcurrency).map(
                              (pair, index) => (
                                <div
                                  className="each_details_overflow"
                                  key={index}
                                >
                                  <div className="index_pair_currency">
                                    <div className="each_currency_pay">
                                      <img
                                        src={
                                          currencyList(
                                            pair.quoteCurrency ===
                                              selectedcurrency
                                              ? pair.baseCurrency
                                              : pair.quoteCurrency
                                          ).img
                                        }
                                        alt=""
                                        height={20}
                                        width={20}
                                      />
                                      <span>
                                        {
                                          currencyList(
                                            pair.quoteCurrency ===
                                              selectedcurrency
                                              ? pair.baseCurrency
                                              : pair.quoteCurrency
                                          ).name
                                        }
                                      </span>
                                      <span>
                                        {
                                          currencyList(
                                            pair.quoteCurrency ===
                                              selectedcurrency
                                              ? pair.baseCurrency
                                              : pair.quoteCurrency
                                          ).title
                                        }
                                      </span>
                                    </div>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "8px",
                                      alignItems: "center",
                                      textAlign: "left",
                                      width: "230px",

                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    {parseFloat(
                                      pair.quoteCurrency === selectedcurrency
                                        ? parseFloat(
                                            pair.baseCurrencyRate
                                          ).toFixed(6)
                                        : parseFloat(
                                            pair.quoteCurrencyRate
                                          ).toFixed(6)
                                    )}
                                    {
                                      currencyList(
                                        pair.quoteCurrency === selectedcurrency
                                          ? pair.baseCurrency
                                          : pair.quoteCurrency
                                      ).name
                                    }
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        color: "#6F00FF",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        setbaseRate(pair?.baseCurrencyRate);
                                        setpair(pair);
                                        setshow2(true);
                                        settag("Change FX Rate");
                                      }}
                                    >
                                      <img src={edit} alt="" />
                                      Update
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </>
                        )}

                        {isInverse === true && (
                          <>
                            {filterDataByBaseCurrency(selectedcurrency).map(
                              (pair, index) => (
                                <div
                                  className="each_details_overflow"
                                  key={index}
                                >
                                  <div className="index_pair_currency">
                                    <div className="each_currency_pay">
                                      <img
                                        src={
                                          currencyList(
                                            pair.quoteCurrency ===
                                              selectedcurrency
                                              ? pair.baseCurrency
                                              : pair.quoteCurrency
                                          ).img
                                        }
                                        alt=""
                                        height={20}
                                        width={20}
                                      />
                                      <span>
                                        {
                                          currencyList(
                                            pair.quoteCurrency ===
                                              selectedcurrency
                                              ? pair.baseCurrency
                                              : pair.quoteCurrency
                                          ).name
                                        }
                                      </span>
                                      <span>
                                        {
                                          currencyList(
                                            pair.quoteCurrency ===
                                              selectedcurrency
                                              ? pair.baseCurrency
                                              : pair.quoteCurrency
                                          ).title
                                        }
                                      </span>
                                    </div>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "8px",
                                      alignItems: "center",
                                      textAlign: "left",
                                      width: "230px",

                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    {parseFloat(
                                      pair.quoteCurrency === selectedcurrency
                                        ? parseFloat(
                                            pair.quoteCurrencyRate
                                          ).toFixed(6)
                                        : parseFloat(
                                            pair.baseCurrencyRate
                                          ).toFixed(6)
                                    )}
                                    {
                                      currencyList(
                                        pair.quoteCurrency === selectedcurrency
                                          ? pair.baseCurrency
                                          : pair.quoteCurrency
                                      ).name
                                    }
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        color: "#6F00FF",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        setbaseRate(pair?.baseCurrencyRate);
                                        setpair(pair);
                                        setshow2(true);
                                        settag("Change FX Rate");
                                      }}
                                    >
                                      <img src={edit} alt="" />
                                      Update
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/**Rate */}
                    <div className="other-details">
                      <h4>Features</h4>
                      <div className="detail_oveflow">
                        <div className="each_details_overflow">
                          <span>Cards</span>
                          <div>
                            <input type="checkbox" id="switch" />
                            <label for="switch">Toggle</label>
                          </div>
                        </div>
                        <div className="each_details_overflow">
                          <span>Partner</span>
                          <div>
                            <input type="checkbox" id="switchs" />
                            <label for="switchs">Toggle</label>
                          </div>
                        </div>
                        <div className="each_details_overflow">
                          <span>Pay</span>
                          <div>
                            <input type="checkbox" id="switch2" />
                            <label for="switch2">Toggle</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
