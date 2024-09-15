// import {useNavigate} from "react-router";
// import {useEffect} from "react";
// import axios from "axios";
import OtherHeader from "../components/otherheader";
import user from "../assets/images/iconuserverify.svg";
//import US from "../assets/images/EU.svg";
//import NGN from "../assets/images/ngnnigeria.jpg";
//import EU from "../assets/images/usds.svg";

import US from "../assets/images/EU.svg";
import NGN from "../assets/images/ngnnigeria.jpg";
import EU from "../assets/images/usds.svg";
import GB from "../assets/images/GB.svg";

import document from "../assets/images/document-text.svg";
import loader from "../assets/images/load.svg";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import empty from "../assets/images/emptyadmin.svg";
import axios from "axios";
import factoring from "../assets/images/factoring.svg";
import emptywoman from "../assets/images/emptywoamn.svg";
import dot from "../assets/images/dotss.svg";
import checkbox from "../assets/images/marksuccess.svg";
import rejectimg from "../assets/images/cancelsuccess.svg";
import { ProgressBar } from "react-loader-spinner";
import deactivae from "../assets/images/deactivate.svg";
import getFullCurrencyName from "../components/currencyFullName";
import currencyPairCheck from "../components/logoCurrency";
import AmountCheck from "../components/amountcheck";
import { useSelector } from "react-redux";

const UserAccount = () => {
  // const [users, setuser] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const selectoruser = useSelector((state) => state.users);

  const [tab, settab] = useState(localStorage.getItem("tab"));
  const [selectedstatusindex, setselectedstatusIndex] = useState(0);
  const [transaction, settransaction] = useState([]);
  const [selectedstatus, setselectedstatus] = useState();
  const [buyers, setBuyers] = useState([]);
  const [seller, setseller] = useState([]);
  const [success, setsucess] = useState(false);
  const [deletes, setdelete] = useState(false);
  const { id } = useParams();
  const [businessstatus, setbusinessstatus] = useState(state.status);
  const [wallets, setwallet] = useState([]);
  const [selectedwalletindex, setselectedwalletindex] = useState(0);
  const [isDrop, setisDrop] = useState(false);
  const [allbusiness, setallbusiness] = useState([]);
  const [hideprogressbar, sethideprogressbar] = useState(false);
  const [hideprogressbar2, sethideprogressbar2] = useState(false);

  const [message, setmessage] = useState("");
  const [urladdress, setaddressurl] = useState("");
  //  console.log(selectoruser);
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
    const getPartners = async () => {
      try {
        const response = await axios.get(
          `admin/getreferal?username=${state.username}`
        );
        //console.log(response);
        // const data = await response.json();

        setBuyers(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPartners();
  }, []);

  useEffect(() => {
    const getPartners = async () => {
      try {
        const response = await axios.get(
          `admin/getwithraw?username=${state.username}`
        );
        //console.log(response);
        // const data = await response.json();

        setseller(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPartners();
  }, []);

  useEffect(() => {
    const getBusinessDetails = async () => {
      await axios
        .get(`admin/getactivities?username=${state.username}`)
        .then((res) => {
          console.log(res);
          // setallbusiness(res.data.data.business);
          settransaction(res.data.data.data);
          //setbusinessstatus(res.data.data.business.status);
          //setwallet(res.data.data.wallets);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getBusinessDetails();
  }, [id]);
  //console.log(allbusiness);
  const verifyBusiness = async (value) => {
    sethideprogressbar(true);
    const data = {
      status: value,
    };
    await axios
      .put(`/v1/admin/changeBusinessStatus/${state._id}`, data)
      .then((res) => {
        //  console.log(res);
        axios.get(`/v1/admin/get-full-business-details/${id}`).then((resp) => {
          setbusinessstatus(resp.data.data.business?.status);
        });
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
  const GenerateWallet = async (value) => {
    sethideprogressbar2(true);

    await //  console.log(res);
    axios
      .post(`/v1/admin/wallet/open-wallet`, {
        currency: "NGN",
        businessId: state._id,
      })
      .then((resp) => {
        //  console.log(resp);
        //  console.log(resp.data.message);
        setsucess(true);
        setdelete(false);
        setmessage(resp.data.message);
        sethideprogressbar2(false);
        window.scrollTo(0, 0);
        //setbusinessstatus(resp.data.data.business?.status);
      })

      .catch((e) => {
        //  console.log(e);
        setsucess(false);
        setdelete(true);
        setmessage(e?.message ? e.message : e.response.data.message);
        sethideprogressbar(false);
        window.scrollTo(0, 0);
      });
  };
  const deleteBusiness = async (value) => {
    sethideprogressbar(true);

    await axios
      .delete(`/v1/admin/delete-business/${state._id}`)
      .then((res) => {
        //  console.log(res);
        navigate("/account");

        setsucess(true);
        setdelete(false);
        setmessage(res.data.message);
        sethideprogressbar(false);
      })
      .catch((e) => {
        // console.log(e);
        setsucess(false);
        setdelete(true);
        setmessage(e.response.data.message);
        sethideprogressbar(false);
      });
  };
  useEffect(() => {
    const getMapdetails = async () => {
      const data = {
        placeId: allbusiness.placeId,
      };
      axios
        .post(`/v1/utility/get-place-detail`, data)
        .then((res) => {
          setaddressurl(res.data.data.result.url);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getMapdetails();
  });

  const deactiveAccount = async () => {
    sethideprogressbar(true);
    const data = {
      status: "DEACTIVATE",
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
        // console.log(e);
        setsucess(false);
        setdelete(true);
        setmessage(e.response.data.message);
        sethideprogressbar(false);
      });
  };
  const filtertransaction = transaction.filter((countrycodelists) =>
    countrycodelists.type.match(selectedstatus)
  );
  const trasnactionstatus = [];

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
              Account Details
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

              {deletes && (
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

              <div className="top_head_cl" style={{ padding: "24px" }}>
                <div className="ip_v_lg">
                  <div
                    className="profile-d-icon"
                    style={{
                      height: "48px",
                      width: "48px",
                    }}
                  >
                    {state?.username.slice(0, 2)}
                  </div>
                  <div className="name-avater-tag" style={{ gap: "8px" }}>
                    <span
                      style={{
                        color: "#101828",
                        fontWeight: "600",
                        fontSize: "20px",
                        lineHeight: "24px",
                        maxWidth: "200px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {state?.username}{" "}
                    </span>
                    <span className="business_name">
                      {state?.user?.username}
                    </span>
                  </div>
                </div>
                <div
                  className="status_user"
                  style={{
                    color: businessstatus === 1 && "#12B76A",
                  }}
                >
                  {state.status === 1 ? "Active" : "Pending"}
                </div>
              </div>
              {businessstatus === "DEACTIVATE" && (
                <div
                  className="verify_account"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <div
                    className="user_verify"
                    style={{
                      //  minWidth: "300px",
                      cursor: "pointer",
                    }}
                    onClick={() => verifyBusiness("APPROVED")}
                  >
                    <img src={user} alt="" />
                    ACTIVATE
                  </div>
                  {selectoruser?.email === "philip@tradevu.co" && (
                    <div
                      className="user_verify"
                      style={{
                        minWidth: "300px",
                        cursor: "pointer",
                        color: "#F04438",
                      }}
                      onClick={() => deleteBusiness()}
                    >
                      <img src={deactivae} alt="" />
                      Delete Business
                    </div>
                  )}
                  {hideprogressbar && (
                    <ProgressBar
                      height="40"
                      width=""
                      ariaLabel="progress-bar-loading"
                      wrapperClass="progress-bar-wrapper"
                      borderColor="#6f00ff"
                      barColor="#6f00ff"
                    />
                  )}
                </div>
              )}

              {businessstatus === "PENDING" &&
                selectoruser?.email === "philip@tradevu.co" && (
                  <div
                    className="verify_account"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    {selectoruser?.email === "philip@tradevu.co" && (
                      <div
                        className="user_verify"
                        style={{
                          minWidth: "300px",
                          cursor: "pointer",
                          color: "#F04438",
                        }}
                        onClick={() => deleteBusiness()}
                      >
                        <img src={deactivae} alt="" />
                        Delete Business
                      </div>
                    )}
                    {hideprogressbar && (
                      <ProgressBar
                        height="40"
                        width=""
                        ariaLabel="progress-bar-loading"
                        wrapperClass="progress-bar-wrapper"
                        borderColor="#6f00ff"
                        barColor="#6f00ff"
                      />
                    )}
                  </div>
                )}
              {businessstatus === "SUBMITTED" && (
                <div
                  className="verify_account"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "32px",
                  }}
                >
                  <div
                    className="user_verify"
                    style={{
                      //  minWidth: "300px",
                      cursor: "pointer",
                    }}
                    onClick={() => verifyBusiness("PROCESSING")}
                  >
                    <img src={user} alt="" />
                    Start Verifivication
                  </div>
                  {selectoruser?.email === "philip@tradevu.co" && (
                    <div
                      className="user_verify"
                      style={{
                        // minWidth: "300px",
                        cursor: "pointer",
                        color: "#F04438",
                      }}
                      onClick={() => deleteBusiness()}
                    >
                      <img src={deactivae} alt="" />
                      Delete Business
                    </div>
                  )}
                  {hideprogressbar && (
                    <ProgressBar
                      height="40"
                      width=""
                      ariaLabel="progress-bar-loading"
                      wrapperClass="progress-bar-wrapper"
                      borderColor="#6f00ff"
                      barColor="#6f00ff"
                    />
                  )}
                </div>
              )}
              {businessstatus === "PROCESSING" && (
                <div
                  className="verify_account"
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="user_verify"
                    style={{
                      // minWidth: "300px",
                      cursor: "pointer",
                    }}
                    onClick={() => verifyBusiness("APPROVED")}
                  >
                    <img src={user} alt="" />
                    Activate account
                  </div>
                  {selectoruser?.email === "philip@tradevu.co" && (
                    <div
                      className="user_verify"
                      style={{
                        // minWidth: "300px",
                        cursor: "pointer",
                        color: "#F04438",
                      }}
                      onClick={() => deleteBusiness()}
                    >
                      <img src={deactivae} alt="" />
                      Delete Business
                    </div>
                  )}

                  {hideprogressbar && (
                    <ProgressBar
                      height="40"
                      width=""
                      ariaLabel="progress-bar-loading"
                      wrapperClass="progress-bar-wrapper"
                      borderColor="#6f00ff"
                      barColor="#6f00ff"
                    />
                  )}
                </div>
              )}

              {businessstatus === "APPROVED" && (
                <div
                  className="verify_account"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className="user_verify"
                    style={{
                      minWidth: "300px",
                      cursor: "pointer",
                      color: "#F04438",
                    }}
                    onClick={() => verifyBusiness("DEACTIVATE")}
                  >
                    <img src={deactivae} alt="" />
                    Deactive account
                  </div>
                  {hideprogressbar && (
                    <ProgressBar
                      height="40"
                      width=""
                      ariaLabel="progress-bar-loading"
                      wrapperClass="progress-bar-wrapper"
                      borderColor="#6f00ff"
                      barColor="#6f00ff"
                    />
                  )}
                </div>
              )}

              <div className="user_balance">
                <div className="main_user_dash">
                  <div className="top-c_tp">
                    <div
                      className="wallet_balance"
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      Wallet balance
                    </div>
                  </div>
                  <h2 className="balance_it_w">
                    {currencyPairCheck("NGN")}
                    {AmountCheck(state.balance)}
                  </h2>
                </div>
              </div>
              <div style={{ marginTop: "-20px" }} className="details-d_tl">
                <div className="md-details-col">
                  <div className="details_cl_tl">Details</div>
                  <div
                    className="each_details_tl"
                    style={{
                      borderBottom: "1px solid #E7E9FB",
                      paddingBottom: "30px",
                    }}
                  >
                    <div className="each_main_tl">
                      <div className="each_d_lt">Username</div>
                      <span className="d-lt-a">{state?.username}</span>
                    </div>
                    <div className="each_main_tl">
                      <div className="each_d_lt">Email</div>
                      <span className="d-lt-a">{state.email}</span>
                    </div>
                  </div>
                  <div
                    className="each_details_tl"
                    style={{ paddingBottom: "30px" }}
                  >
                    {businessstatus === "APPROVED" && (
                      <div
                        className="verify_account"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          className="user_verify"
                          style={{
                            cursor: "pointer",
                            color: "#F04438",

                            display: "flex",
                            borderRadius: "4px",
                            fontWeight: "600",
                            color: "rgb(111, 0, 255)",
                            textAlign: "left",
                            paddingLeft: "0px",
                          }}
                          onClick={() => GenerateWallet("DEACTIVATE")}
                        >
                          Generate wallet
                        </div>
                        {hideprogressbar2 && (
                          <ProgressBar
                            height="40"
                            width="100px"
                            ariaLabel="progress-bar-loading"
                            wrapperClass="progress-bar-wrapper"
                            borderColor="#6f00ff"
                            barColor="#6f00ff"
                          />
                        )}
                      </div>
                    )}
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
                  Transactions
                </li>

                <li
                  onClick={() => {
                    localStorage.setItem("tab", "buyers");

                    settab("buyers");
                  }}
                  style={{
                    borderBottom: tab === "buyers" ? "3px solid #6F00FF" : "",
                  }}
                >
                  Referral
                </li>

                <li
                  onClick={() => {
                    localStorage.setItem("tab", "seller");

                    settab("seller");
                  }}
                  style={{
                    borderBottom: tab === "seller" ? "3px solid #6F00FF" : "",
                  }}
                >
                  Withraw request
                </li>
                {/**

                <li
                  onClick={() => {
                    if (
                      businessstatus === "PROCESSING" ||
                      businessstatus === "APPROVED"
                    ) {
                      localStorage.setItem("tab", "kyc");

                      settab("kyc");
                    } else {
                      setmessage("Pls change business status to processing");
                      setdelete(true);
                    }
                  }}
                  style={{
                    borderBottom: tab === "kyc" ? "3px solid #6F00FF" : "",
                  }}
                >
                  KYC
                </li>
                 */}
              </ul>
              <div className="main_tp_lig">
                {tab === "kyc" && (
                  <>
                    <div className="each_top_lt">
                      <div className="left-ttl-c">
                        <span className="typ_lg_vg">
                          Country of Registration
                        </span>
                        <span className="an-fg-lg">{state.country}</span>
                      </div>
                      <div className="left-ttl-c">
                        <span className="typ_lg_vg">RC Number</span>
                        <span className="an-fg-lg">
                          {state.registrationNumber}
                        </span>
                      </div>
                    </div>
                    {state?.TIN && (
                      <div className="each_top_lt">
                        <div className="left-ttl-c">
                          <span className="typ_lg_vg">
                            Tax Indentifaiction Number(TIN)
                          </span>
                          <span className="an-fg-lg">{state.TIN}</span>
                        </div>
                        <div className="left-ttl-c">
                          <span className="typ_lg_vg">VAT Number</span>
                          <span className="an-fg-lg">{state.VAT}</span>
                        </div>
                      </div>
                    )}
                    {state?.legalName && (
                      <div className="each_top_lt">
                        <div className="left-ttl-c">
                          <span className="typ_lg_vg">Legal Name</span>
                          <span className="an-fg-lg">{state.legalName}</span>
                        </div>
                        <div className="left-ttl-c">
                          <span className="typ_lg_vg">Category</span>
                          <span className="an-fg-lg">{state.VAT}</span>
                        </div>
                      </div>
                    )}
                    {state.country === "Nigeria" && (
                      <div
                        className="prof_ad_rf"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (allbusiness.proofOfAddress) {
                            navigate("/proof_of_address", {
                              state: {
                                image: allbusiness?.proofOfAddress?.url,
                                type: allbusiness?.proofOfAddress?.type,
                                id: state._id,
                              },
                            });
                          }
                        }}
                      >
                        <div className="left-ttl-c">
                          <span className="typ_lg_vg">Proof of address</span>
                          <span className="an-fg-lg">
                            {allbusiness?.proofOfAddress?.type}
                          </span>
                        </div>

                        <div className="each_sec_lg_vg">
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            Proof of address
                          </div>
                          {allbusiness.proofOfAddress ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}

                          <div className="loader">
                            <img
                              src={
                                allbusiness?.proofOfAddress?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness?.proofOfAddress?.status ===
                                    "REJECTED"
                                  ? rejectimg
                                  : loader
                              }
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {state.country !== "Nigeria" && (
                      <div className="prof_ad_rf">
                        <div className="left-ttl-c">
                          <span className="typ_lg_vg">Directors </span>
                        </div>
                        {allbusiness.directors?.map((res, index) => (
                          <div
                            className="each_sec_lg_vg"
                            style={{
                              border: "1px solid #e7e9fb",
                            }}
                            key={index}
                            onClick={() => {
                              if (res?.meansOfIdentification) {
                                navigate("/verifyDocument", {
                                  state: {
                                    documents: res,
                                    image: res?.idDocument?.url,
                                    type: res?.meansOfIdentification,
                                    id: state._id,
                                    businessType: allbusiness?.type,
                                  },
                                });
                              }
                            }}
                          >
                            <div className="lg-md-lf-glv">
                              <img src={document} alt="" />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <h4
                                  style={{
                                    padding: "0px",
                                    margin: "0px",
                                  }}
                                  className="mydirectorsname"
                                >
                                  {res?.username} {res?.lastName}
                                </h4>
                                <span className=" smallbusiness">
                                  {res?.dateOfBirth}
                                </span>
                              </div>
                            </div>
                            <span className="mydirectorsname">
                              {" "}
                              {res.meansOfIdentification}
                            </span>{" "}
                            <div className="loader">
                              <img src={loader} alt="" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {state.country !== "Nigeria" && (
                      <div className="prof_ad_rf">
                        <div className="left-ttl-c">
                          <span className="typ_lg_vg">Shareholders </span>
                        </div>
                        {allbusiness.shareHolders?.map((res, index) => (
                          <div
                            className="each_sec_lg_vg"
                            style={{
                              border: "1px solid #e7e9fb",
                            }}
                            key={index}
                            onClick={() => {
                              if (res?.meansOfIdentification) {
                                navigate("/verifyDocument", {
                                  state: {
                                    documents: res,

                                    image: res?.idDocument?.url,
                                    type: res?.meansOfIdentification,
                                    id: state._id,
                                    businessType: allbusiness?.type,
                                  },
                                });
                              }
                            }}
                          >
                            <div className="lg-md-lf-glv">
                              <img src={document} alt="" />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <h4
                                  style={{
                                    padding: "0px",
                                    margin: "0px",
                                  }}
                                  className="mydirectorsname"
                                >
                                  {res?.username} {res?.lastName}
                                </h4>
                                <span className=" smallbusiness">
                                  {res?.dateOfBirth}
                                </span>
                              </div>
                            </div>
                            <span className="mydirectorsname">
                              {" "}
                              {res.meansOfIdentification}
                            </span>
                            <div className="loader">
                              <img src={loader} alt="" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {state.country === "Nigeria" && (
                      <div className="prof_ad_rf">
                        <div className="left-ttl-c">
                          <span className="typ_lg_vg">General documents</span>
                        </div>

                        <div
                          className="each_sec_lg_vg"
                          style={{
                            border: "1px solid #e7e9fb",
                          }}
                          onClick={() => {
                            if (
                              allbusiness?.LLC?.CAC?.url ||
                              allbusiness?.SoleProprietorship?.CAC?.url
                            ) {
                              navigate("/verifyDocument", {
                                state: {
                                  documents: allbusiness?.LLC
                                    ? allbusiness?.LLC
                                    : allbusiness?.SoleProprietorship,

                                  image: allbusiness?.LLC?.CAC?.url
                                    ? allbusiness?.LLC?.CAC?.url
                                    : allbusiness?.SoleProprietorship?.CAC?.url,
                                  type: "CAC",
                                  id: state._id,
                                  businessType: allbusiness.type,
                                },
                              });
                            }
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            Certificate of Incorporation
                          </div>
                          {allbusiness?.LLC?.CAC?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : allbusiness?.SoleProprietorship?.CAC?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness?.LLC?.CAC?.status === "APPROVED"
                                  ? checkbox
                                  : allbusiness?.SoleProprietorship?.CAC
                                      ?.status === "APPROVED"
                                  ? checkbox
                                  : allbusiness?.LLC?.CAC?.status === "REJECTED"
                                  ? rejectimg
                                  : allbusiness?.SoleProprietorship?.CAC
                                      ?.status === "REJECTED"
                                  ? rejectimg
                                  : loader
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <div
                          className="each_sec_lg_vg"
                          style={{
                            border: "1px solid #e7e9fb",
                            borderRadius: "0px",
                            marginTop: "-18px",
                            borderBottom: "none",
                            borderTop: "none",
                          }}
                          onClick={() => {
                            if (
                              allbusiness?.LLC?.CAC_STATUS_REPORT?.url ||
                              allbusiness?.SoleProprietorship?.CAC_STATUS_REPORT
                                ?.url
                            ) {
                              navigate("/verifyDocument", {
                                state: {
                                  documents: allbusiness?.LLC
                                    ? allbusiness?.LLC
                                    : allbusiness?.SoleProprietorship,

                                  image: allbusiness?.LLC?.CAC_STATUS_REPORT
                                    ?.url
                                    ? allbusiness?.LLC?.CAC_STATUS_REPORT?.url
                                    : allbusiness?.SoleProprietorship
                                        ?.CAC_STATUS_REPORT?.url,
                                  type: "CAC_STATUS_REPORT",
                                  id: state._id,
                                  businessType: allbusiness.type,
                                },
                              });
                            }
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            CAC Status Report (Optional)
                          </div>
                          {allbusiness?.LLC?.CAC_STATUS_REPORT?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : allbusiness?.SoleProprietorship?.CAC_STATUS_REPORT
                              ?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness?.LLC?.CAC_STATUS_REPORT?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness?.SoleProprietorship
                                      ?.CAC_STATUS_REPORT?.status === "APPROVED"
                                  ? checkbox
                                  : allbusiness?.LLC?.CAC_STATUS_REPORT
                                      ?.status === "REJECTED"
                                  ? rejectimg
                                  : allbusiness?.SoleProprietorship
                                      ?.CAC_STATUS_REPORT?.status === "REJECTED"
                                  ? rejectimg
                                  : loader
                              }
                              alt=""
                            />
                          </div>
                        </div>

                        <div
                          className="each_sec_lg_vg"
                          style={{
                            border: "1px solid #e7e9fb",
                            borderTopLeftRadius: "0px",
                            borderTopRightRadius: "0px",
                            marginTop: "-18px",
                          }}
                          onClick={() => {
                            if (
                              allbusiness?.LLC?.VALID_ID?.url ||
                              allbusiness?.SoleProprietorship?.VALID_ID?.url
                            ) {
                              navigate("/verifyDocument", {
                                state: {
                                  documents: allbusiness?.LLC
                                    ? allbusiness?.LLC
                                    : allbusiness?.SoleProprietorship,

                                  image: allbusiness?.LLC?.VALID_ID?.url
                                    ? allbusiness?.LLC?.VALID_ID?.url
                                    : allbusiness?.SoleProprietorship?.VALID_ID
                                        ?.url,
                                  type: "VALID_ID",
                                  id: state._id,
                                  businessType: allbusiness.type,
                                },
                              });
                            }
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            Valid means of ID
                          </div>
                          {allbusiness?.LLC?.VALID_ID?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : allbusiness?.SoleProprietorship?.VALID_ID?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness?.LLC?.VALID_ID?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness?.SoleProprietorship?.VALID_ID
                                      ?.status === "APPROVED"
                                  ? checkbox
                                  : allbusiness?.LLC?.VALID_ID?.status ===
                                    "REJECTED"
                                  ? rejectimg
                                  : allbusiness?.SoleProprietorship?.VALID_ID
                                      ?.status === "REJECTED"
                                  ? rejectimg
                                  : loader
                              }
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {state.type === "LLC" && state.country === "Nigeria" && (
                      <div className="prof_ad_rf" style={{}}>
                        <div className="left-ttl-c">
                          <span className="typ_lg_vg">
                            {state.type} documents
                          </span>
                        </div>
                        <div
                          className="each_sec_lg_vg "
                          style={{
                            border: "1px solid #e7e9fb",
                          }}
                          onClick={() => {
                            if (allbusiness?.LLC?.CAC_FORM_2?.url)
                              navigate("/verifyDocument", {
                                state: {
                                  documents: allbusiness?.LLC,
                                  image: allbusiness?.LLC?.CAC_FORM_2?.url,
                                  type: "CAC_FORM_2",
                                  id: state._id,
                                  businessType: allbusiness.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            CAC Form 2 (Optional)
                          </div>
                          {allbusiness?.LLC?.CAC_FORM_2?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness?.LLC?.CAC_FORM_2?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness?.LLC?.CAC_FORM_2?.status ===
                                    "REJECTED"
                                  ? rejectimg
                                  : loader
                              }
                              alt=""
                            />
                          </div>
                        </div>

                        <div
                          className="each_sec_lg_vg"
                          style={{
                            border: "1px solid #e7e9fb",
                            borderRadius: "0px",
                            marginTop: "-18px",
                            borderBottom: "none",
                            borderTop: "none",
                          }}
                          onClick={() => {
                            if (allbusiness?.LLC?.CAC_FORM_2_1?.url)
                              navigate("/verifyDocument", {
                                state: {
                                  documents: allbusiness?.LLC,
                                  image: allbusiness?.LLC?.CAC_FORM_2_1?.url,
                                  type: "CAC_FORM_2_1",
                                  id: state._id,
                                  businessType: state.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            CAC Form 2.1 (Optional)
                          </div>
                          {allbusiness?.LLC?.CAC_FORM_2_1?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness?.LLC?.CAC_FORM_2_1?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness?.LLC?.CAC_FORM_2_1?.status ===
                                    "REJECTED"
                                  ? rejectimg
                                  : loader
                              }
                              alt=""
                            />
                          </div>
                        </div>

                        <div
                          className="each_sec_lg_vg"
                          style={{
                            border: "1px solid #e7e9fb",
                            borderRadius: "0px",
                            marginTop: "-18px",
                            borderBottom: "none",
                            borderTop: "1px solid #e7e9fb",
                          }}
                          onClick={() => {
                            if (allbusiness?.LLC?.CAC_FORM_3?.url)
                              navigate("/verifyDocument", {
                                state: {
                                  documents: allbusiness?.LLC,
                                  image: allbusiness?.LLC?.CAC_FORM_3?.url,
                                  type: "CAC_FORM_3",
                                  id: state._id,
                                  businessType: allbusiness.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            CAC Form 3 (Optional)
                          </div>
                          {allbusiness?.LLC?.CAC_FORM_3?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness?.LLC?.CAC_FORM_3?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness?.LLC?.CAC_FORM_3?.status ===
                                    "REJECTED"
                                  ? rejectimg
                                  : loader
                              }
                              alt=""
                            />
                          </div>
                        </div>

                        <div
                          className="each_sec_lg_vg"
                          style={{
                            border: "1px solid #e7e9fb",
                            borderRadius: "0px",
                            marginTop: "-18px",
                            borderBottom: "none",
                            borderTop: "1px solid #e7e9fb",
                          }}
                          onClick={() => {
                            if (allbusiness?.LLC?.CAC_FORM_4?.url)
                              navigate("/verifyDocument", {
                                state: {
                                  documents: allbusiness?.LLC,
                                  image: allbusiness?.LLC?.CAC_FORM_4?.url,
                                  type: "CAC_FORM_4",
                                  id: state._id,
                                  businessType: allbusiness.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            CAC Form 4 (Optional)
                          </div>
                          {allbusiness?.LLC?.CAC_FORM_4?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness?.LLC?.CAC_FORM_4?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness?.LLC?.CAC_FORM_4?.status ===
                                    "REJECTED"
                                  ? rejectimg
                                  : loader
                              }
                              alt=""
                            />
                          </div>
                        </div>

                        <div
                          className="each_sec_lg_vg"
                          style={{
                            borderRadius: "0px",
                            marginTop: "-18px",
                          }}
                          onClick={() => {
                            if (allbusiness?.LLC?.CAC_FORM_7?.url)
                              navigate("/verifyDocument", {
                                state: {
                                  documents: allbusiness?.LLC,
                                  image: allbusiness?.LLC?.CAC_FORM_7?.url,
                                  type: "CAC_FORM_7",
                                  id: state._id,
                                  businessType: allbusiness.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            CAC FORM 7
                          </div>
                          {allbusiness?.LLC?.CAC_FORM_7?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness?.LLC?.CAC_FORM_7?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness?.LLC?.CAC_FORM_7?.status ===
                                    "REJECTED"
                                  ? rejectimg
                                  : loader
                              }
                              alt=""
                            />
                          </div>
                        </div>

                        <div
                          className="each_sec_lg_vg"
                          style={{
                            border: "1px solid #e7e9fb",
                            marginTop: "-18px",
                            borderTop: "1px solid #e7e9fb",
                          }}
                          onClick={() => {
                            if (
                              allbusiness?.LLC
                                ?.MEMORANDUM_AND_ARTICLE_OF_ASSOCIATION?.url
                            )
                              navigate("/verifyDocument", {
                                state: {
                                  documents: allbusiness?.LLC,
                                  image:
                                    allbusiness?.LLC
                                      ?.MEMORANDUM_AND_ARTICLE_OF_ASSOCIATION
                                      ?.url,
                                  type: "MEMORANDUM_AND_ARTICLE_OF_ASSOCIATION",
                                  id: state._id,
                                  businessType: allbusiness.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            Memorandum & articles of association
                          </div>
                          {allbusiness?.LLC
                            ?.MEMORANDUM_AND_ARTICLE_OF_ASSOCIATION?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness?.LLC
                                  ?.MEMORANDUM_AND_ARTICLE_OF_ASSOCIATION
                                  ?.status === "APPROVED"
                                  ? checkbox
                                  : allbusiness?.LLC
                                      ?.MEMORANDUM_AND_ARTICLE_OF_ASSOCIATION
                                      ?.status === "REJECTED"
                                  ? rejectimg
                                  : loader
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <div
                          className="each_sec_lg_vg"
                          style={{
                            border: "1px solid #e7e9fb",
                            borderTopLeftRadius: "0px",
                            borderTopRightRadius: "0px",
                            marginTop: "-18px",
                          }}
                          onClick={() => {
                            if (allbusiness?.LLC?.BOARD_RESOLUTION?.url)
                              navigate("/verifyDocument", {
                                state: {
                                  documents: allbusiness?.LLC,
                                  image:
                                    allbusiness?.LLC?.BOARD_RESOLUTION?.url,
                                  type: "BOARD_RESOLUTION",
                                  id: state._id,
                                  businessType: allbusiness.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            Board resolution to open an account with TradeVu
                          </div>
                          {allbusiness?.LLC?.BOARD_RESOLUTION ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness?.LLC?.BOARD_RESOLUTION?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness?.LLC?.BOARD_RESOLUTION
                                      ?.status === "REJECTED"
                                  ? rejectimg
                                  : loader
                              }
                              alt=""
                            />
                          </div>
                        </div>

                        {allbusiness?.LLC?.BVN_OF_DIRECTOR?.length > 0 && (
                          <span
                            className="typ_lg_vg"
                            style={{
                              marginBottom: "18px",
                            }}
                          >
                            BVN of the Directors of the Company
                          </span>
                        )}

                        {allbusiness?.LLC?.BVN_OF_DIRECTOR?.length > 0 &&
                          allbusiness?.LLC?.BVN_OF_DIRECTOR?.map(
                            (item, index) => (
                              <div
                                className="each_sec_lg_vg"
                                style={{
                                  border: "1px solid #e7e9fb",
                                  borderTop: "1px solid #e7e9fb",
                                  marginTop: "-18px",
                                }}
                                key={index}
                              >
                                <div className="lg-md-lf-glv">
                                  <img src={document} alt="" />

                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "16px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "4px",
                                      }}
                                    >
                                      <span>First name</span>
                                      <div
                                        style={{
                                          fontWeight: "600",
                                        }}
                                      >
                                        {item?.username}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "4px",
                                      }}
                                    >
                                      <span>Last name</span>
                                      <div
                                        style={{
                                          fontWeight: "600",
                                        }}
                                      >
                                        {item?.lastName}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "4px",
                                      }}
                                    >
                                      <span>Phone number</span>
                                      <div
                                        style={{
                                          fontWeight: "600",
                                        }}
                                      >
                                        {item?.phoneNumber
                                          ? item?.phoneNumber
                                          : "Not Added"}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <span
                                  className="material-iconss"
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                  }}
                                >
                                  <div>BVN Number</div>
                                  <span
                                    style={{
                                      fontWeight: "600",
                                    }}
                                  >
                                    {item?.bvnNumber}
                                  </span>
                                </span>
                                <div
                                  className="loader"
                                  style={{
                                    top: "30px",
                                  }}
                                >
                                  <img
                                    title={
                                      item._id ? "Verified" : "Not-Verified"
                                    }
                                    src={item._id ? checkbox : loader}
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    alt=""
                                  />
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    )}
                    {state.type === "SoleProprietorship" &&
                      state.country === "Nigeria" && (
                        <>
                          <div className="prof_ad_rf" style={{}}>
                            <div className="left-ttl-c">
                              <span className="typ_lg_vg">
                                {state.type} documents
                              </span>
                            </div>
                            <div
                              className="each_sec_lg_vg "
                              style={{
                                border: "1px solid #e7e9fb",
                              }}
                              onClick={() => {
                                if (
                                  allbusiness.SoleProprietorship?.CAC_FORM_1
                                    ?.url
                                )
                                  navigate("/verifyDocument", {
                                    state: {
                                      documents: allbusiness.SoleProprietorship,
                                      image:
                                        allbusiness.SoleProprietorship
                                          ?.CAC_FORM_1?.url,
                                      type: "CAC_FORM_2",
                                      id: state._id,
                                      businessType: allbusiness.type,
                                    },
                                  });
                              }}
                            >
                              <div className="lg-md-lf-glv">
                                <img src={document} alt="" />
                                CAC BIN FORM (Optional)
                              </div>
                              {allbusiness.SoleProprietorship?.CAC_FORM_1
                                ?.url ? (
                                <span className="material-icons">
                                  navigate_next
                                </span>
                              ) : (
                                "Not uploaded"
                              )}
                              <div className="loader">
                                <img
                                  src={
                                    allbusiness.SoleProprietorship?.CAC_FORM_1
                                      ?.status === "APPROVED"
                                      ? checkbox
                                      : allbusiness.SoleProprietorship
                                          ?.CAC_FORM_1?.status === "REJECTED"
                                      ? rejectimg
                                      : loader
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                            {/***

                            <div
                              className="each_sec_lg_vg"
                              style={{
                                border: "1px solid #e7e9fb",
                                borderRadius: "0px",
                                marginTop: "-18px",
                                borderBottom: "none",
                                borderTop: "none",
                              }}
                              onClick={() => {
                                navigate("/verifyDocument", {
                                  state: {
                                    documents: allbusiness.SoleProprietorship,
                                    image:
                                      allbusiness.SoleProprietorship?.CAC_FORM_1
                                        ?.url,
                                    type: "CAC_FORM_1",
                                    id: state._id,
                                    businessType: allbusiness.type,
                                  },
                                });
                              }}
                            >
                              {allbusiness?.SoleProprietorship?.BVN_OF_DIRECTOR
                                ?.length > 0 && (
                                <div className="lg-md-lf-glv">
                                  <img src={document} alt="" />
                                  BVN of the Sole Proprietorship or Partner
                                </div>
                              )}
                              <span className="material-iconss">
                                {allbusiness.SoleProprietorship?.BVN_OF_PARTNER
                                  ?.url
                                  ? allbusiness.SoleProprietorship
                                      ?.BVN_OF_PARTNER?.url
                                  : " BVN"}
                              </span>
                              {/***
                              <div className="loader">
                                <img
                                  src={
                                    state.LLC?.CAC_FORM_2_1
                                      ?.status === "APPROVED"
                                      ? checkbox
                                      : state.LLC?.CAC_FORM_2_1
                                          ?.status === "REJECTED"
                                      ? rejectimg
                                      : loader
                                  }
                                  alt=""
                                />
                              </div>
                              */}
                          </div>
                          <div className="prof_ad_rf">
                            <div
                              className="left-ttl-c"
                              style={{
                                marginBottom: "18px",
                              }}
                            >
                              <span className="typ_lg_vg">
                                BVN OF DIRECTORS
                              </span>
                            </div>
                            {allbusiness?.SoleProprietorship?.BVN_OF_DIRECTOR?.map(
                              (item, index) => (
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTop: "1px solid #e7e9fb",
                                    marginTop: "-18px",
                                  }}
                                  key={index}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />

                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "16px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                        }}
                                      >
                                        <span>First name</span>
                                        <div
                                          style={{
                                            fontWeight: "600",
                                          }}
                                        >
                                          {item?.username}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                        }}
                                      >
                                        <span>Last name</span>
                                        <div
                                          style={{
                                            fontWeight: "600",
                                          }}
                                        >
                                          {item?.lastName}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                        }}
                                      >
                                        <span>Phone number</span>
                                        <div
                                          style={{
                                            fontWeight: "600",
                                          }}
                                        >
                                          {item?.phoneNumber
                                            ? item?.phoneNumber
                                            : "Not Added"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <span
                                    className="material-iconss"
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "8px",
                                    }}
                                  >
                                    <div>BVN Number</div>
                                    <span
                                      style={{
                                        fontWeight: "600",
                                      }}
                                    >
                                      {item?.bvnNumber}
                                    </span>
                                  </span>
                                  <div
                                    className="loader"
                                    style={{
                                      top: "30px",
                                    }}
                                  >
                                    <img
                                      title={
                                        item._id ? "Verified" : "Not-Verified"
                                      }
                                      src={item._id ? checkbox : loader}
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              )
                            )}
                          </div>

                          <div className="prof_ad_rf">
                            <div
                              className="left-ttl-c"
                              style={{
                                marginBottom: "18px",
                              }}
                            >
                              <span className="typ_lg_vg">BVN OF PARTNERS</span>
                            </div>
                            {allbusiness?.SoleProprietorship?.BVN_OF_PARTNER?.map(
                              (item, index) => (
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTop: "1px solid #e7e9fb",
                                    marginTop: "-18px",
                                  }}
                                  key={index}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />

                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "16px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                        }}
                                      >
                                        <span>First name</span>
                                        <div
                                          style={{
                                            fontWeight: "600",
                                          }}
                                        >
                                          {item?.username}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                        }}
                                      >
                                        <span>Last name</span>
                                        <div
                                          style={{
                                            fontWeight: "600",
                                          }}
                                        >
                                          {item?.lastName}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                        }}
                                      >
                                        <span>Phone number</span>
                                        <div
                                          style={{
                                            fontWeight: "600",
                                          }}
                                        >
                                          {item?.phoneNumber
                                            ? item?.phoneNumber
                                            : "Not Added"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <span
                                    className="material-iconss"
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "8px",
                                    }}
                                  >
                                    <div>BVN Number</div>
                                    <span
                                      style={{
                                        fontWeight: "600",
                                      }}
                                    >
                                      {item?.bvnNumber}
                                    </span>
                                  </span>
                                  <div
                                    className="loader"
                                    style={{
                                      top: "30px",
                                    }}
                                  >
                                    <img
                                      title={
                                        item._id ? "Verified" : "Not-Verified"
                                      }
                                      src={item._id ? checkbox : loader}
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </>
                      )}
                  </>
                )}
                {tab === "transaction" && (
                  <>
                    <div className="section_modl_lg">
                      {trasnactionstatus?.map((statuss, index) => (
                        <div
                          className="each_section"
                          onClick={() => {
                            setselectedstatusIndex(index);
                            setselectedstatus(statuss);
                          }}
                          style={{
                            background:
                              selectedstatusindex === index ? "#EBE4FF" : "",
                            color:
                              selectedstatusindex === index
                                ? "#6F00FF"
                                : "#667085",
                            padding:
                              selectedstatusindex === index
                                ? "8px 16px 8px 16px"
                                : "8px 8px 8px 8px",
                          }}
                          key={index}
                        >
                          {statuss === ""
                            ? "All"
                            : statuss === "pending"
                            ? "Pending"
                            : statuss === "success"
                            ? "Completed"
                            : "Declined"}{" "}
                        </div>
                      ))}{" "}
                    </div>
                    {filtertransaction.length === 0 && (
                      <div className="emtty_transact">
                        <div className="empty_info">
                          <h4>No transactions yet</h4>
                          <div>This account has no recent transactions.</div>
                        </div>
                      </div>
                    )}
                    {filtertransaction.length >= 1 &&
                      transaction?.map((res, index) => (
                        <div className="main-lg-request" key={index}>
                          <div className="each-request">
                            <div className="img-name">
                              <div
                                className="mytag-lg"
                                style={{
                                  gap: "0px",
                                }}
                              >
                                <div className="head-tg">{res?.username}</div>
                                <span
                                  className="small-tg"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  {res.type}
                                  <span
                                    className={"status_p"}
                                    style={{
                                      color: "green",
                                    }}
                                  >
                                    <img src={dot} alt="" />
                                    Completed
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
                                {currencyPairCheck("NGN")}
                                {parseFloat(res.amount).toLocaleString()}{" "}
                              </div>
                              <span
                                className="small-tg"
                                style={{ textAlign: "right" }}
                              >
                                {new Date(res.created_at).toDateString()}{" "}
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
                        <div
                          className="empty_info"
                          style={{ maxWidth: "311px" }}
                        >
                          <h4>Account doesn’t have any referral yet</h4>
                          <div>
                            You’ll see partners that this account has added to
                            their account here.
                          </div>
                        </div>
                      </div>
                    )}
                    {buyers.length >= 1 &&
                      buyers?.map((res, index) => (
                        <div className="main-lg-request" key={index}>
                          <div className="each-request">
                            <div className="img-name">
                              <div
                                className="profile-d-icon"
                                style={{
                                  height: "48px",
                                  width: "48px",
                                }}
                              >
                                {res.username?.slice(0, 2)}
                              </div>

                              <div className="mytag-lg">
                                <div className="head-tg">{res.refer}</div>
                                <span
                                  className="small-tg"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  {new Date(res.created_at).toDateString()}
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
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "8px",
                                  //  textTransform: "capitalize",
                                }}
                              >
                                <span
                                  className={"status_p"}
                                  style={{
                                    color:
                                      res.status === "1" ? "green" : "crimson",

                                    textAlign: "right",
                                  }}
                                >
                                  {res.status === "1" ? "Active" : "Pending"}
                                </span>
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
                        <div
                          className="empty_info"
                          style={{ maxWidth: "311px" }}
                        >
                          <h4>Account doesn’t have any activiites yet</h4>
                          <div>
                            You’ll see activities that this account has added to
                            account here.
                          </div>
                        </div>
                      </div>
                    )}
                    {seller.length >= 1 &&
                      seller?.map((res, index) => (
                        <div className="main-lg-request" key={index}>
                          <div className="each-request">
                            <div className="img-name">
                              <div className="mytag-lg">
                                <div className="head-tg">{res.accountname}</div>
                                <span
                                  className="small-tg"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  {res.accountnumber}({res.bankname})
                                  <span
                                    className={"status_p"}
                                    style={{
                                      color:
                                        res.status === "2"
                                          ? "green"
                                          : res.status === "1"
                                          ? "#f79009"
                                          : "crimson",
                                    }}
                                  >
                                    <img src={dot} alt="" />{" "}
                                    {res.status === "1"
                                      ? "Pending"
                                      : res.status === "2"
                                      ? "Completed"
                                      : "Rejected"}
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

export default UserAccount;
