// import {useNavigate} from "react-router";
// import {useEffect} from "react";
// import axios from "axios";
import OtherHeader from "../components/otherheader";
import user from "../assets/images/depositicon.svg";
import US from "../assets/images/EU.svg";
import NGN from "../assets/images/ngnnigeria.jpg";
import EU from "../assets/images/usds.svg";
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
import CurrencyModal from "../components/currencymodal";
import currencyPairCheck from "../components/logoCurrency";
import AmountCheck from "../components/amountcheck";
import getFullCurrencyName from "../components/currencyFullName";

const WalletDetails = () => {
  // const [users, setuser] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [tab, settab] = useState("transaction");
  const [transaction, settransaction] = useState([]);
  const [selectedstatus, setselectedstatus] = useState();
  const [buyers] = useState([]);
  const [seller] = useState([]);
  const [success, setsucess] = useState(false);
  const [deletes, setdelete] = useState(false);
  const { id } = useParams();
  const [businessstatus, setbusinessstatus] = useState(state?.status);
  const [wallets, setwallet] = useState([]);
  const [selectedwallet, setselectedwallet] = useState({
    name: "NGN",
    balance: 0,
  });
  const [allbusiness, setallbusiness] = useState([]);
  const [hideprogressbar, sethideprogressbar] = useState(false);
  const [message, setmessage] = useState("");
  const [showcurrecny, setshowcurrecny] = useState(false);
  const [defultwallet, setdefaultcurrency] = useState("");
  // console.log(selectedwallet)

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
    const fetchAllwallet = async () => {
      axios
        .get(`/v1/admin/wallet/admin`)
        .then((res) => {
          setwallet(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchAllwallet();
  }, []);

  const verifyBusiness = async (value) => {
    sethideprogressbar(true);
    const data = {
      status: value,
    };
    await axios
      .put(`/v1/admin/changeBusinessStatus/${state._id}`, data)
      .then((res) => {
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

  const filtertransaction = transaction.filter((countrycodelists) =>
    countrycodelists?.status.match(selectedstatus)
  );
  const filterWallet = wallets.filter((countrycodelists) =>
    countrycodelists?.currency.match(selectedwallet.name)
  );
  if (filterWallet.length === 0) {
    axios
      .post(`/v1/admin/wallet/create`, { currency: selectedwallet.name })
      .then((res) => {
        axios
          .get(`/v1/admin/wallet/admin`)
          .then((res) => {
            setwallet(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <div
        className="main"
        style={{
          position: "relative",
        }}
      >
        <OtherHeader title={"BACK TO ACCOUNTS"} arrow={"keyboard_backspace"} />
        <CurrencyModal
          show={showcurrecny}
          setshow={setshowcurrecny}
          setselecteditems={setselectedwallet}
          setdefaultcurrency={setdefaultcurrency}
        />

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

              <div
                className="user_balance"
                style={{
                  borderBottom: "none",
                }}
              >
                <div className="main_user_dash">
                  <div className="top-c_tp">
                    <div
                      className="wallet_balance"
                      style={{
                        fontWeight: "700",
                        fontSize: "1.1rem",
                        lineHeight: "24.3px",
                        color: "#344054",
                      }}
                    >
                      Balance
                    </div>
                    <div
                      className="wallet_drop "
                      style={{
                        position: "relative",
                      }}
                      onClick={() => {
                        setshowcurrecny(true);
                      }}
                    >
                      <div className="img_currency">
                        <img
                          style={{
                            width: "25px",
                            height: "25px",
                          }}
                          src={
                            filterWallet[0]?.currency === "NGN"
                              ? NGN
                              : filterWallet[0]?.currency === "GBP"
                              ? EU
                              : filterWallet[0]?.currency === "USD"
                              ? EU
                              : US
                          }
                          alt=""
                        />
                        <div className="each_drop_wallet">
                          {filterWallet[0]?.currency}{" "}
                          {getFullCurrencyName(filterWallet[0]?.currency)}
                          <span className="material-icons">
                            keyboard_arrow_down
                          </span>
                        </div>
                      </div>
                      {/**
                      {isDrop && (
                        <div className="drop-absolute-icon">
                          {wallets?.map((res, index) => (
                            <div
                              className="img-avater-icon-balanc"
                              key={index}
                              onClick={() => setselectedwalletindex(index)}
                            >
                              <img
                                style={{
                                  width: "25px",
                                  height: "25px",
                                }}
                                src={
                                  res.currency === "EUR"
                                    ? US
                                    : res.currency === "NGN"
                                    ? NGN
                                    : EU
                                }
                                alt=""
                              />
                              {res.currency}{" "}
                              {res.currency === "EUR"
                                ? "Euro"
                                : res.currency === "GBP"
                                ? "Pounds"
                                : "Naira"}
                            </div>
                          ))}

                        </div>
                      )}
                      */}
                    </div>
                  </div>
                  <h2
                    className="balance_it_w"
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    {currencyPairCheck(filterWallet[0]?.currency)}
                    {AmountCheck(
                      filterWallet[0]?.balance ? filterWallet[0].balance : 0
                    )}
                  </h2>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0px",
                  width: "100%",
                  boxSizing: "border-box",
                  borderBottom: "1px solid #E7E9FB",
                  borderTop: "1px solid #E7E9FB",
                }}
              >
                <div
                  className="verify_account"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "none",
                  }}
                >
                  <div
                    className="user_verify"
                    style={{
                      cursor: "pointer",
                      color: "#6F00FF",
                    }}
                    //  onClick={() => verifyBusiness("PROCESSING")}
                  >
                    <img src={user} alt="" />
                    Withdraw
                  </div>
                </div>
                <div
                  className="verify_account"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "none",
                  }}
                >
                  <div
                    className="user_verify"
                    style={{
                      cursor: "pointer",
                      color: "#6F00FF",
                    }}
                    onClick={() => navigate("/wallet/fund")}
                  >
                    <img src={user} alt="" />
                    Fund
                  </div>
                </div>
                <div
                  className="verify_account"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "none",
                  }}
                >
                  <div
                    className="user_verify"
                    style={{
                      cursor: "pointer",
                      color: "#6F00FF",
                    }}
                    //  onClick={() => verifyBusiness("PROCESSING")}
                  >
                    <img src={user} alt="" />
                    Transfer
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "-20px" }} className="details-d_tl">
                <div className="md-details-col">
                  <div className="details_cl_tl">Account Details</div>
                  <div
                    className="each_details_tl"
                    style={{
                      borderBottom: "1px solid #E7E9FB",
                      paddingBottom: "30px",
                    }}
                  >
                    <div className="each_main_tl">
                      <div className="each_d_lt">Account Number</div>
                      <span
                        className="d-lt-a"
                        style={{
                          color: "#6F00FF",
                          fontSize: "1rem",
                          lineHeight: "24px",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {filterWallet[0]?.accountNumber}
                      </span>
                    </div>
                    {state?.currency === "NGN" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Bank</div>
                        <span
                          className="d-lt-a"
                          style={{
                            color: "#6F00FF",
                            fontSize: "1rem",
                            lineHeight: "24px",
                            letterSpacing: "0.02em",
                          }}
                        >
                          Kuda
                        </span>
                      </div>
                    )}
                    <div className="each_main_tl">
                      <div className="each_d_lt">Account Name</div>
                      <div
                        className="d-lt-a"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <span
                          style={{
                            color: "#6F00FF",
                            fontSize: "1rem",
                            lineHeight: "24px",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {state?.accountName}
                        </span>
                      </div>
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
                  History
                </li>
                {/**
                <li
                  onClick={() => {
                    localStorage.setItem("tab", "buyers");

                    settab("buyers");
                  }}
                  style={{
                    borderBottom: tab === "buyers" ? "3px solid #6F00FF" : "",
                  }}
                >
                  Partners
                </li>
                */}
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
                        <span className="an-fg-lg">{state?.country}</span>
                      </div>
                      <div className="left-ttl-c">
                        <span className="typ_lg_vg">RC Number</span>
                        <span className="an-fg-lg">
                          {state?.registrationNumber}
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
                    {state?.country === "Nigeria" && (
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
                    {state?.country !== "Nigeria" && (
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
                                  {res?.firstName} {res?.lastName}
                                </h4>
                                <span className=" smallbusiness">
                                  {res.dateOfBirth}
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
                    {state?.country !== "Nigeria" && (
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
                                  {res?.firstName} {res?.lastName}
                                </h4>
                                <span className=" smallbusiness">
                                  {res.dateOfBirth}
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
                    {state?.country === "Nigeria" && (
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
                              allbusiness.LLC?.CAC?.url ||
                              allbusiness.SoleProprietorship?.CAC?.url
                            ) {
                              navigate("/verifyDocument", {
                                state: {
                                  image: allbusiness.LLC?.CAC?.url
                                    ? allbusiness.LLC?.CAC?.url
                                    : allbusiness.SoleProprietorship?.CAC?.url,
                                  type: "CAC",
                                  id: state._id,
                                  businessType: allbusiness?.type,
                                },
                              });
                            }
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            Certificate of Incorporation
                          </div>
                          {allbusiness.LLC?.CAC?.url ? (
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
                                  : allbusiness.LLC?.CAC?.status === "REJECTED"
                                  ? rejectimg
                                  : allbusiness.SoleProprietorship?.CAC
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
                              allbusiness.LLC?.CAC_STATUS_REPORT?.url ||
                              allbusiness.SoleProprietorship?.CAC_STATUS_REPORT
                                ?.url
                            ) {
                              navigate("/verifyDocument", {
                                state: {
                                  image: allbusiness.LLC?.CAC_STATUS_REPORT?.url
                                    ? allbusiness.LLC?.CAC_STATUS_REPORT?.url
                                    : allbusiness.SoleProprietorship
                                        ?.CAC_STATUS_REPORT?.url,
                                  type: "CAC_STATUS_REPORT",
                                  id: state._id,
                                  businessType: allbusiness?.type,
                                },
                              });
                            }
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            CAC Status Report (Optional)
                          </div>
                          {allbusiness.LLC?.CAC_STATUS_REPORT?.url ? (
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
                                  : allbusiness.LLC?.CAC_STATUS_REPORT
                                      ?.status === "REJECTED"
                                  ? rejectimg
                                  : allbusiness.SoleProprietorship
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
                              allbusiness.LLC?.VALID_ID?.url ||
                              allbusiness.SoleProprietorship?.VALID_ID?.url
                            ) {
                              navigate("/verifyDocument", {
                                state: {
                                  image: allbusiness.LLC?.VALID_ID?.url
                                    ? allbusiness.LLC?.VALID_ID?.url
                                    : allbusiness.SoleProprietorship?.VALID_ID
                                        ?.url,
                                  type: "VALID_ID",
                                  id: state._id,
                                  businessType: allbusiness?.type,
                                },
                              });
                            }
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            Valid means of ID
                          </div>
                          {allbusiness.LLC?.VALID_ID?.url ? (
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
                                  : allbusiness.LLC?.VALID_ID?.status ===
                                    "REJECTED"
                                  ? rejectimg
                                  : allbusiness.SoleProprietorship?.VALID_ID
                                      .status === "REJECTED"
                                  ? rejectimg
                                  : loader
                              }
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {state?.type === "LLC" && state?.country === "Nigeria" && (
                      <div className="prof_ad_rf" style={{}}>
                        <div className="left-ttl-c">
                          <span className="typ_lg_vg">
                            {state?.type} documents
                          </span>
                        </div>
                        <div
                          className="each_sec_lg_vg "
                          style={{
                            border: "1px solid #e7e9fb",
                          }}
                          onClick={() => {
                            if (allbusiness.LLC?.CAC_FORM_2?.url)
                              navigate("/verifyDocument", {
                                state: {
                                  image: allbusiness.LLC?.CAC_FORM_2?.url,
                                  type: "CAC_FORM_2",
                                  id: state._id,
                                  businessType: allbusiness?.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            CAC Form 2 (Optional)
                          </div>
                          {allbusiness.LLC?.CAC_FORM_2?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness.LLC?.CAC_FORM_2?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness.LLC?.CAC_FORM_2?.status ===
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
                            if (allbusiness.LLC?.CAC_FORM_2_1?.url)
                              navigate("/verifyDocument", {
                                state: {
                                  image: allbusiness.LLC?.CAC_FORM_2_1?.url,
                                  type: "CAC_FORM_2_1",
                                  id: state._id,
                                  businessType: state?.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            CAC Form 2.1 (Optional)
                          </div>
                          {allbusiness.LLC?.CAC_FORM_2_1?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness.LLC?.CAC_FORM_2_1?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness.LLC?.CAC_FORM_2_1?.status ===
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
                            if (allbusiness.LLC?.CAC_FORM_3?.url)
                              navigate("/verifyDocument", {
                                state: {
                                  image: allbusiness.LLC?.CAC_FORM_3?.url,
                                  type: "CAC_FORM_3",
                                  id: state._id,
                                  businessType: allbusiness?.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            CAC Form 3 (Optional)
                          </div>
                          {allbusiness.LLC?.CAC_FORM_3?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness.LLC?.CAC_FORM_3?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness.LLC?.CAC_FORM_3?.status ===
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
                            if (allbusiness.LLC?.CAC_FORM_4?.url)
                              navigate("/verifyDocument", {
                                state: {
                                  image: state.LLC?.CAC_FORM_4?.url,
                                  type: "CAC_FORM_4",
                                  id: state._id,
                                  businessType: allbusiness?.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            CAC Form 4 (Optional)
                          </div>
                          {allbusiness.LLC?.CAC_FORM_4?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness.LLC?.CAC_FORM_4?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness.LLC?.CAC_FORM_4?.status ===
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
                            if (allbusiness.LLC?.CAC_FORM_7?.url)
                              navigate("/verifyDocument", {
                                state: {
                                  image: allbusiness.LLC?.CAC_FORM_7?.url,
                                  type: "CAC_FORM_7",
                                  id: state._id,
                                  businessType: allbusiness?.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            CAC FORM 7
                          </div>
                          {allbusiness.LLC?.CAC_FORM_7?.url ? (
                            <span className="material-icons">
                              navigate_next
                            </span>
                          ) : (
                            "Not uploaded"
                          )}
                          <div className="loader">
                            <img
                              src={
                                allbusiness.LLC?.CAC_FORM_7?.status ===
                                "APPROVED"
                                  ? checkbox
                                  : allbusiness.LLC?.CAC_FORM_7?.status ===
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
                            if (
                              allbusiness.LLC
                                ?.MEMORANDUM_AND_ARTICLE_OF_ASSOCIATION?.url
                            )
                              navigate("/verifyDocument", {
                                state: {
                                  image:
                                    allbusiness.LLC
                                      ?.MEMORANDUM_AND_ARTICLE_OF_ASSOCIATION
                                      ?.url,
                                  type: "MEMORANDUM_AND_ARTICLE_OF_ASSOCIATION",
                                  id: state._id,
                                  businessType: allbusiness?.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            Memorandum & articles of association
                          </div>
                          {allbusiness.LLC
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
                                allbusiness.LLC
                                  ?.MEMORANDUM_AND_ARTICLE_OF_ASSOCIATION
                                  ?.status === "APPROVED"
                                  ? checkbox
                                  : allbusiness.LLC
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
                            borderRadius: "0px",
                            marginTop: "-18px",
                            borderBottom: "none",
                            borderTop: "1px solid #e7e9fb",
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            BVN of the Directors of the Company
                          </div>
                          <span className="material-iconss">
                            {allbusiness.LLC?.BVN_OF_DIRECTOR?.url
                              ? state.LLC?.BVN_OF_DIRECTOR?.url
                              : "Not uploaded"}
                          </span>
                          <div className="loader">
                            <img src={loader} alt="" />
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
                            if (allbusiness.LLC?.BOARD_RESOLUTION?.url)
                              navigate("/verifyDocument", {
                                state: {
                                  image: allbusiness.LLC?.BOARD_RESOLUTION?.url,
                                  type: "BOARD_RESOLUTION",
                                  id: state._id,
                                  businessType: allbusiness?.type,
                                },
                              });
                          }}
                        >
                          <div className="lg-md-lf-glv">
                            <img src={document} alt="" />
                            Board resolution to open an account with TradeVu
                          </div>
                          {allbusiness.LLC?.BOARD_RESOLUTION ? (
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
                      </div>
                    )}
                    {state?.type === "SoleProprietorship" &&
                      state?.country === "Nigeria" && (
                        <>
                          <div className="prof_ad_rf" style={{}}>
                            <div className="left-ttl-c">
                              <span className="typ_lg_vg">
                                {state?.type} documents
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
                                      image:
                                        allbusiness.SoleProprietorship
                                          ?.CAC_FORM_1?.url,
                                      type: "CAC_FORM_2",
                                      id: state._id,
                                      businessType: allbusiness?.type,
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
                                    image:
                                      allbusiness.SoleProprietorship?.CAC_FORM_1
                                        ?.url,
                                    type: "CAC_FORM_1",
                                    id: state._id,
                                    businessType: allbusiness?.type,
                                  },
                                });
                              }}
                            >
                              <div className="lg-md-lf-glv">
                                <img src={document} alt="" />
                                BVN of the Sole Proprietorship or Partner
                              </div>
                              <span className="material-iconss">
                                {allbusiness.SoleProprietorship?.BVN_OF_PARTNER
                                  ?.url
                                  ? allbusiness.SoleProprietorship
                                      ?.BVN_OF_PARTNER?.url
                                  : " Not uploaded"}
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
                                if (
                                  allbusiness.SoleProprietorship
                                    ?.APPLICATION_LETTER?.url
                                )
                                  navigate("/verifyDocument", {
                                    state: {
                                      image:
                                        allbusiness.SoleProprietorship
                                          ?.APPLICATION_LETTER?.url,
                                      type: "APPLICATION_LETTER",
                                      id: state._id,
                                      businessType: allbusiness?.type,
                                    },
                                  });
                              }}
                            >
                              <div className="lg-md-lf-glv">
                                <img src={document} alt="" />
                                Application letter to open account
                              </div>
                              {allbusiness.SoleProprietorship
                                ?.APPLICATION_LETTER?.url ? (
                                <span className="material-icons">
                                  navigate_next
                                </span>
                              ) : (
                                "Not uploaded"
                              )}
                              <div className="loader">
                                <img
                                  src={
                                    allbusiness.SoleProprietorship
                                      ?.APPLICATION_LETTER?.status ===
                                    "APPROVED"
                                      ? checkbox
                                      : allbusiness.SoleProprietorship
                                          ?.APPLICATION_LETTER?.status ===
                                        "REJECTED"
                                      ? rejectimg
                                      : loader
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                  </>
                )}
                {tab === "transaction" && (
                  <>
                    {filtertransaction.length === 0 && (
                      <div className="emtty_transact">
                        <img src={empty} alt="" />
                        <div className="empty_info">
                          <h4>No transactions yet</h4>
                          <div>This account hs no recent transactions.</div>
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
                                {res?.currency === "NGN"
                                  ? "₦"
                                  : res?.currency === "USD"
                                  ? "$"
                                  : res?.currency === "EUR"
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

export default WalletDetails;
