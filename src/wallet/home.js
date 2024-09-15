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
let PageSize = 20;

const Wallets = () => {
    const [order, setOrder] = useState("ASC");
    const [selectedIndex, setselectedIndex] = useState(0);
    const [isStatus, setisStatus] = useState(false);
    const [isloading, setisloading] = useState(true)
    const [isDate, setisDate] = useState(false);
    const [isCountry, setisCountry] = useState(false);

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [search, setsearch] = useState("");
    const [selectedstatus, setselectedstatus] = useState("All");
    const [selectedindexstatus, setselectedindexstatus] = useState(0);
    const [selecteddate, setselecteddate] = useState("Recent");
    const [selectedindexdate, setselectedindexdate] = useState(0);
    const [selectedcountry, setselectedcountry] = useState("All");
    const [selectedindexcountry, setselectedindexcountry] = useState(0);
    // const [length,setlength] = useState(0)

    const filtercontant = data.filter((countrycodelists) =>
        countrycodelists.accountNumber?.match(search) || countrycodelists?.business.name.match(search)
    )
    const [stat, setstat] = useState([])

   // console.log(filtercontant)

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filtercontant?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filtercontant]);
    const status = ["All", "Active", "Inactive", "Signups"];
    const date = ["Recent", "Past week", "Past month", "Past year"];
    const country = ["All", "UK", "NGN", "US"];

    useEffect(() => {

        const fetchBusiness = async () => {


            axios
                .get(`/v1/admin/get-all-wallets`)
                .then((res) => {
                    console.log(res)
                    setisloading(false)

                    setData(res.data.data)


                })
                .catch((e) => {
                    console.log(e);
                });


        };
        fetchBusiness();
    }, [setisloading]);
    useEffect(() => {
        const fetchStat = async () => {
            await axios.get('/v1/admin/get-businesses-stats').then((response) => {
                // console.log(response)
                setstat(response.data.data)
            }).catch((e) => {
                console.log(e)
            })
        }
        fetchStat()
    }, [])
    const goToDetails = (items) => {
        navigate(`/wallet/${items._id}`, {
            state: {
                ...items,
            },
        });
    };

    const sorting = (col, index) => {
        setselectedIndex(index);
        if (order === "ASC") {
            const sorted = [...data].sort((a, b) =>
                a[col] > b[col] ? 1 : -1
            );
            console.log(sorted);
            setData(sorted);
            setOrder("DSC");
        }
        if (order === "DSC") {
            const sorted = [...data].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            );
            setData(sorted);
            setOrder("ASC");
        }
    };

    return (
        <>
            <div className="main">
                <OtherHeader title={"Wallets"} />
                <div className="info-cl">
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
                    <div className="each-card">
                        <div className="main-card-each">
                            <div className="innercard">
                                <h5>All Transactions</h5>
                                <div className="stat-line">
                                    <span>{stat.Total}</span>

                                </div>
                            </div>
                        </div>
                        <div className="main-card-each">
                            <div className="innercard">
                                <h5>Completed</h5>
                                <div className="stat-line">
                                    <span>{stat.Approved}</span>

                                </div>
                            </div>
                        </div>
                        <div className="main-card-each">
                            <div className="innercard">
                                <h5>Processing</h5>
                                <div className="stat-line">
                                    <span>{stat.Pending}</span>

                                </div>
                            </div>
                        </div>
                        <div className="main-card-each">
                            <div className="innercard">
                                <h5>Declined</h5>
                                <div className="stat-line">
                                    <span>{stat.Rejected}</span>

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
                                    onClick={() => setisDate(!isDate)}
                                >
                                    {isDate && (
                                        <div className="fixed-fliterbox">
                                            <div className="inner_fixed_col">
                                                <div className="main_fix_filter">
                                                    {date.map((date, index) => (
                                                        <div
                                                            className="filter_each_none"
                                                            style={{
                                                                background:
                                                                    selectedindexdate === index ? "#F4F0FF" : "",
                                                                borderRadius: "8px",
                                                            }}
                                                            key={index}
                                                            onClick={() => {
                                                                setselectedindexdate(index);
                                                                setselecteddate(date);
                                                            }}
                                                        >
                                                            <span> {date} </span>
                                                            {selectedindexdate === index && (
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
                                        {selecteddate}
                                        <span className="material-icons">expand_more</span>
                                    </div>
                                </div>

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
                                    <span className="type">Currency</span>

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
                            {
                                isloading && <LoaderDate />
                            }
                            {
                                isloading === false &&

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
                                                Account Number{" "}
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
                                                Balance{" "}
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
                                                Type{" "}
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
                                            {
                                                /*** 
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
                                            */
                                        }
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
                                                    <div className="profile-d-icon">{user?.business?.name?.slice(0, 2)}</div>
                                                    <div className="name-avater-tag">
                                                        <span> {user.fname} {" "} {user.lname} </span>
                                                        <span className="business_name">
                                                            {user.business?.name} {" "}

                                                        </span>
                                                    </div>
                                                </td>

                                                <td> {user.business?.email} </td>
                                                <td> {user?.accountNumber} </td>
                                                <td> {user.currency === "NGN"
                                                    ? "₦"
                                                    : user.currency === "USD"
                                                        ? "$"
                                                        : user.currency === "EUR"
                                                            ? "€"
                                                            : "£"}{parseFloat(user?.balance).toLocaleString()} </td>
                                                <td>
                                                    {new Date(user.createdAt).toDateString()}{" "}
                                                    {new Date(user.createdAt).toLocaleTimeString()}{" "}
                                                </td>
                                                <td> {user.currency} Wallet </td>
                                                {
                                                    /** 
                                                <td style={{ color: user?.status === 'PENDING' ? '#F04438' : user?.status === 'REJECTED' ? '#F04438' : user?.status === 'PROCESSING' ? '#F04438' : user?.status === 'SUBMITTED' ? '#F79009' : "#12B76A" }}>{user.status} </td>
                                                */
                                            }
                                                <td
                                                    className="view_account"
                                                    onClick={() => {
                                                        navigate(`/account/iflffy`);
                                                    }}
                                                >
                                                    View
                                                    <span className="material-icons">chevron_right</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            }
                            <div className="page-container" >
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

export default Wallets;
