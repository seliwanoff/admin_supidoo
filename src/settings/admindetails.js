// import {useNavigate} from "react-router";
// import {useEffect} from "react";
// import axios from "axios";
import OtherHeader from "../components/otherheader";
import user from "../assets/images/editicon.svg";
import deactivate from "../assets/images/dea.svg";
import deletem from "../assets/images/del.svg";


import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import empty from "../assets/images/emptyadmin.svg";
import axios from "axios";
import factoring from "../assets/images/factoring.svg";
import emptywoman from "../assets/images/emptywoamn.svg";
import dot from "../assets/images/dotss.svg";


const AdminDetails = () => {
  // const [users, setuser] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [tab, settab] = useState(localStorage.getItem("tab"));
  const [selectedstatusindex, setselectedstatusIndex] = useState(0);
  const [transaction, settransaction] = useState([]);
  const [selectedstatus, setselectedstatus] = useState();
  const [buyers] = useState([]);
  const [seller] = useState([]);
  const [success, setsucess] = useState(false);
  const [deletes, setdelete] = useState(false);
  const { id } = useParams();
  const [businessstatus, setbusinessstatus] = useState(state.status);
  const [wallets, setwallet] = useState([]);
  const [selectedwalletindex, setselectedwalletindex] = useState(0);
  const [isDrop, setisDrop] = useState(false);
  const [allbusiness, setallbusiness] = useState([]);
  const [hideprogressbar, sethideprogressbar] = useState(false);
  const [message, setmessage] = useState("");
  const [urladdress, setaddressurl] = useState("")

 
  useEffect(() => {
    if (success) {
      var timeout = setTimeout(() => {
        setsucess(false);
        //window.location.reload();
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });
  useEffect(() => {
    if (deletes) {
      var timeout = setTimeout(() => {
        setdelete(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  useEffect(() => {
    const getBusinessDetails = async () => {
      await axios
        .get(`/v1/admin/get-full-business-details/${id}`)
        .then((res) => {
          setallbusiness(res.data.data.business);
          settransaction(res.data.data.transactions);
          setbusinessstatus(res.data.data.business.status);
          setwallet(res.data.data.wallets);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getBusinessDetails();
  }, [id]);
  const verifyBusiness = async (value) => {
    sethideprogressbar(true);
    const data = {
      status: value,
    };
    await axios
      .put(`/v1/admin/changeBusinessStatus/${state._id}`, data)
      .then((res) => {
      //  console.log(res);
      axios.get(`/v1/admin/get-full-business-details/${id}`)
      .then((resp) => {
        
        setbusinessstatus(resp.data.data.business.status);
      
      })
        setsucess(true);
        setdelete(false);
        setmessage(res.data.message);
        sethideprogressbar(false);
      })
      .catch((e) => {
        console.log(e);
        setsucess(false);
        setdelete(true);
        setmessage(e.response.data.message);
        sethideprogressbar(false);
      });
  };
  useEffect(()=>{
    const getMapdetails = async () => {
      const data = {
        placeId: allbusiness.placeId,
      };
      axios
        .post(`/v1/utility/get-place-detail`, data)
        .then((res) => {
          //console.log(res);
         // window.location.href = `${}`;
          setaddressurl(res.data.data.result.url)
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getMapdetails()
  })
 
  const deactiveAccount = async () => {
    sethideprogressbar(true);
    const data = {
      status: "PENDING",
    };
    await axios
      .put(`/v1/admin/changeBusinessStatus/${state._id}`, data)
      .then((res) => {
       // console.log(res);
        setsucess(true);
        setdelete(false);
        setmessage(res.data.message);
        sethideprogressbar(false);
      })
      .catch((e) => {
        console.log(e);
        setsucess(false);
        setdelete(true);
        setmessage(e.response.data.message);
        sethideprogressbar(false);
      });
  };
  const filtertransaction = transaction.filter((countrycodelists) =>
    countrycodelists.status.match(selectedstatus)
  );
  const trasnactionstatus = ["", "pending", "success", "declined"];

  return (
    <>
      <div
        className="main"
        style={{
          position: "relative",
        }}
      >
        <OtherHeader title={"BACK TO ACCOUNTS"} arrow={"keyboard_backspace"} />

        <div className="info-cl">
          <div className="overview">
            <h4
              style={{
                margin: "0px",
                padding: "0px",
              }}
            >
              Member Details
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "30px",
            }}
          >
            <div
              className="main-info-con-rights"
              style={{
                padding: "0px",
                minHeight: "100%",
                position: "relative",
              }}
            >
              {success && (
                <div className="success">
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

              {deletes && (
                <div
                  className="success"
                  style={{
                    background: "#FCFCFD",
                    border: " 1px solid #D0D5DD",
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

              <div className="top_head_cl" style={{ padding: "24px" }}>
                <div className="ip_v_lg">
                  <div
                    className="profile-d-icon"
                    style={{
                      height: "48px",
                      width: "48px",
                    }}
                  >
                    {state?.firstName?.slice(0, 1)}{state?.lastName?.slice(0, 1)}
                  </div>
                  <div className="name-avater-tag" style={{ gap: "8px" }}>
                    <span
                      style={{
                        color: "#101828",
                        fontWeight: "600",
                        fontSize: "20px",
                        lineHeight: "24px",
                      }}
                    >
                      {state?.firstName}{" "}{state?.lastName}
                    </span>
                    <span className="business_name">
                      {state?.role} 
                    </span>
                  </div>
                </div>
                <div
                  className="status_user"
                  style={{
                    color: state.isProfileCompleted === true && "#12B76A",
                  }}
                >
                  {state.isProfileCompleted ? 'ACTIVE' : 'Pending'}
                </div>
              </div>
             
             
              <div style={{
                display:'flex',
                gap:'0px',
                width:'100%',
                boxSizing:'border-box',
                borderBottom:'1px solid #E7E9FB',
                borderTop:'1px solid #E7E9FB',

              }}>

              <div
                  className="verify_account"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border:'none'
                  }}
                >
                  <div
                    className="user_verify"
                    style={{
                      cursor: "pointer",
                      color:'#6F00FF'
                    }}
                    onClick={() => verifyBusiness("PROCESSING")}
                  >
                    <img src={user} alt="" />
                    Change Role
                  </div>
                 
                </div>
                <div
                  className="verify_account"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border:'none'

                  }}
                >
                  <div
                    className="user_verify"
                    style={{
                      cursor: "pointer",
                      color:'#667085'

                    }}
                    onClick={() => verifyBusiness("PROCESSING")}
                  >
                    <img src={deactivate} alt="" />
                    Deactivate
                  </div>
                 
                </div><div
                  className="verify_account"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border:'none'

                  }}
                >
                  <div
                    className="user_verify"
                    style={{
                      cursor: "pointer",
                      color:'#F04438'

                    }}
                    onClick={() => verifyBusiness("PROCESSING")}
                  >
                    <img src={deletem} alt="" />
                    Delete
                  </div>
                 
                </div>
                </div>

            
              
              <div style={{ marginTop: "-20px" }} className="details-d_tl">
                <div className="md-details-col">
                  <div className="details_cl_tl">Profile</div>
                  <div
                    className="each_details_tl"
                    style={{
                      borderBottom: "1px solid #E7E9FB",
                      paddingBottom: "30px",
                    }}
                  >
                    <div className="each_main_tl">
                      <div className="each_d_lt">Name</div>
                      <span className="d-lt-a">{state?.firstName} {" "}{state?.lastName}</span>
                    </div>
                    <div className="each_main_tl">
                      <div className="each_d_lt">Email Addrss</div>
                      <span className="d-lt-a">{state?.email}</span>
                    </div>

                    <div className="each_main_tl">
                      <div className="each_d_lt">Role</div>
                      <span className="d-lt-a">{state?.role}</span>

                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="mt-right-col-cf">
              <ul className="tp-head-list">
                <li
                  onClick={() => {
                    localStorage.setItem("tab", "transaction");
                    settab("transaction");
                  }}
                  style={{
                    borderBottom:
                      tab === "transaction" ? "3px solid #6F00FF" : "",
                  }}
                >
                  Activities
                </li>
                
                {/** 
                <li
                  onClick={() => {
                    localStorage.setItem("tab", "seller");

                    settab("seller");
                  }}
                  style={{
                    borderBottom: tab === "seller" ? "3px solid #6F00FF" : "",
                  }}
                >
                  Sellers
                </li>
                */}
               
              </ul>
              <div className="main_tp_lig">
               
                {tab === "transaction" && (
                  <>
                   
                    {filtertransaction.length === 0 && (
                      <div className="emtty_transact">
                        <img src={empty} alt="" />
                        <div className="empty_info">
                          <h4>No Activities yet</h4>
                          <div>This account hs no recent activities.</div>
                        </div>
                      </div>
                    )}
                    {filtertransaction.length >= 1 &&
                      transaction?.map((res, index) => (
                        <div className="main-lg-request" key={index}>
                          <div className="each-request">
                            <div className="img-name">
                              <img src={factoring} alt="" />
                              <div
                                className="mytag-lg"
                                style={{
                                  gap: "0px",
                                }}
                              >
                                <div className="head-tg">
                                  {res?.name
                                    ? res.name
                                    : res.accountName
                                    ? res.accountName
                                    : res.narration}
                                </div>
                                <span
                                  className="small-tg"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  {res.TransactionType}
                                  <span
                                    className={"status_p"}
                                    style={{
                                      color:
                                        res.status === "Success"
                                          ? "green"
                                          : res.status === "Pending"
                                          ? "#f79009"
                                          : "crimson",
                                    }}
                                  >
                                    <img src={dot} alt="" /> {res.status}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="mytag-lg">
                              <div
                                className="head-tg"
                                style={{
                                  color: "#344054",
                                  fontSize: "14px",
                                  fontWeight: "600",
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
                                {parseFloat(res.amount).toLocaleString()}{" "}
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
                  </>
                )}
                {tab === "buyers" && (
                  <>
                    {" "}
                    {buyers.length === 0 && (
                      <div className="emtty_transact">
                        <img src={emptywoman} alt="" />
                        <div
                          className="empty_info"
                          style={{ maxWidth: "311px" }}
                        >
                          <h4>Account doesn’t have any buyers yet</h4>
                          <div>
                            You’ll see buyers that this account has added to
                            their business here.
                          </div>
                        </div>
                      </div>
                    )}
                    {buyers.length >= 1 &&
                      buyers?.map((res, index) => (
                        <div className="main-lg-request" key={index}>
                          <div className="each-request">
                            <div className="img-name">
                              <img src={factoring} alt="" />
                              <div className="mytag-lg">
                                <div className="head-tg">
                                  {res.business.name}
                                </div>
                                <span
                                  className="small-tg"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  {res.TransactionType}
                                  <span
                                    className={"status_p"}
                                    style={{
                                      color:
                                        res.status === "success"
                                          ? "green"
                                          : res.status === "Pending"
                                          ? "#f79009"
                                          : "crimson",
                                    }}
                                  >
                                    <img src={dot} alt="" /> {res.status}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="mytag-lg">
                              <div
                                className="head-tg"
                                style={{
                                  color: "#667085",

                                  fontSize: "14px",
                                  fontWeight: "600",
                                  lineHeight: "19.6px",
                                  textAlign: "right",
                                  textTransform: "capitalize",
                                }}
                              >
                                3 orders
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}{" "}
                  </>
                )}
                {tab === "seller" && (
                  <>
                    {" "}
                    {seller.length === 0 && (
                      <div className="emtty_transact">
                        <img src={emptywoman} alt="" />
                        <div
                          className="empty_info"
                          style={{ maxWidth: "311px" }}
                        >
                          <h4>Account doesn’t have any seller yet</h4>
                          <div>
                            You’ll see sellers that this account has added to
                            their business here.
                          </div>
                        </div>
                      </div>
                    )}
                    {seller.length >= 1 &&
                      seller?.map((res, index) => (
                        <div className="main-lg-request" key={index}>
                          <div className="each-request">
                            <div className="img-name">
                              <img src={factoring} alt="" />
                              <div className="mytag-lg">
                                <div className="head-tg">
                                  {res.business.name}
                                </div>
                                <span
                                  className="small-tg"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  {res.TransactionType}
                                  <span
                                    className={"status_p"}
                                    style={{
                                      color:
                                        res.status === "success"
                                          ? "green"
                                          : res.status === "Pending"
                                          ? "#f79009"
                                          : "crimson",
                                    }}
                                  >
                                    <img src={dot} alt="" /> {res.status}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="mytag-lg">
                              <div
                                className="head-tg"
                                style={{
                                  color: "#667085",

                                  fontSize: "14px",
                                  fontWeight: "600",
                                  lineHeight: "19.6px",
                                  textAlign: "right",
                                  textTransform: "capitalize",
                                }}
                              >
                                3 orders
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}{" "}
                  </>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDetails;
