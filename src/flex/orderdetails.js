// import {useNavigate} from "react-router";
// import {useEffect} from "react";
// import axios from "axios";
import OtherHeader from "../components/otherheader";
import user from "../assets/images/receipt-search.svg";
import invoicereceipt from '../assets/images/orderlogo.svg'
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

const OrderDetails = () => {
  // const [users, setuser] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [tab, settab] = useState("transaction");
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
  const [allorder, setallorder] = useState([])


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
        .get(`/v1/admin/flex/get-all-order/${id}`)
        .then((res) => {
          // console.log(res)
          //setallbusiness(res.data.data.business);
          setallorder(res.data.data.invoice)
          settransaction(res.data.data.transactions);
          setbusinessstatus(res.data.data.status);
          // setwallet(res.data.data.wallets);
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
        setsucess(false);
        setdelete(true);
        setmessage(e.response.data.message);
        sethideprogressbar(false);
      });
  };
  const getMapdetails = async () => {
    const data = {
      placeId: allbusiness.placeId,
    };
    axios
      .post(`/v1/utility/get-place-detail`, data)
      .then((res) => {
        window.location.href = `${res.data.data.result.url}`;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deactiveAccount = async () => {
    sethideprogressbar(true);
    const data = {
      status: "PENDING",
    };
    await axios
      .put(`/v1/admin/changeBusinessStatus/${state._id}`, data)
      .then((res) => {
        setsucess(true);
        setdelete(false);
        setmessage(res.data.message);
        sethideprogressbar(false);
      })
      .catch((e) => {
        setsucess(false);
        setdelete(true);
        setmessage(e.response.data.message);
        sethideprogressbar(false);
      });
  };
  const filtertransaction = state.orders?.filter((countrycodelists) =>
    countrycodelists.orderTitle.match(selectedstatus)
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
        <OtherHeader title={"BACK TO ORDER"} arrow={"keyboard_backspace"} />

        <div className="info-cl">
          <div className="overview">
            <h4
              style={{
                margin: "0px",
                padding: "0px",
              }}
            >
              {state?.customtype} Details
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
                  <img src={invoicereceipt} alt="" />
                  <div className="name-avater-tag" style={{ gap: "8px" }}>
                    <span
                      style={{
                        color: "#101828",
                        fontWeight: "600",
                        fontSize: "20px",
                        lineHeight: "24px",
                      }}
                    >
                      {state?.title}{" "}
                    </span>
                    <span className="business_name">
                      {state?._id}
                    </span>
                  </div>
                </div>
                <div
                  className="status_user"
                  style={{
                    color: businessstatus === "accepted" && "#12B76A",
                    textTransform: 'uppercase'
                  }}
                >
                  {businessstatus}
                </div>
              </div>

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
                    color: '#6F00FF',
                    fontWeight: '500'
                  }}
                // onClick={() => verifyBusiness("PROCESSING")}
                >
                  <img src={user} alt="" />
                  View Invoice
                </div>

              </div>
              <div
                className="verify_account"
                style={{
                  display: "flex",
                  flexDirection: 'column',
                  gap: '16px',
                  padding: '24px',
                  borderTop: 'none',
                  marginTop: '-20px'
                }}
              >
                <div className="price_tag">
                  Price
                </div>
                <h2 className="price_amount">
                  {state.currency === "NGN"
                    ? "₦"
                    : state.currency === "USD"
                      ? "$"
                      : state.currency === "EUR"
                        ? "€"
                        : "£"}{parseFloat(state?.totalAmount).toLocaleString()}
                </h2>



              </div>





              <div style={{ marginTop: "-20px" }} className="details-d_tl">
                <div className="md-details-col">
                  <div className="details_cl_tl">Order Info</div>
                  <div
                    className="each_details_tl"
                    style={{
                      borderBottom: "1px solid #E7E9FB",
                      paddingBottom: "30px",
                    }}
                  >
                    <div className="each_main_tl">
                      <div className="each_d_lt">Delivery Date</div>
                      <span className="d-lt-a">{new Date(state?.deliveryDate).toDateString()}</span>
                    </div>
                    <div className="each_main_tl">
                      <div className="each_d_lt">Payment Method</div>
                      <span className="d-lt-a">{state?.paymentMethod}</span>
                    </div>

                    <div className="each_main_tl">
                      <div className="each_d_lt">Payment Term</div>
                      <div
                        className="d-lt-a"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {state?.paymentTerms}


                      </div>

                    </div>
                    <div className="each_main_tl">
                      <div className="each_d_lt">Order Status</div>
                      <div
                        className="d-lt-a"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {state?.orderStatus}


                      </div>

                    </div>
                    <div className="each_main_tl">
                      <div className="each_d_lt">Date Created</div>
                      <div
                        className="d-lt-a"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {new Date(state?.createdAt).toDateString()}{" "}{new Date(state?.createdAt).toLocaleTimeString()}


                      </div>

                    </div>
                    {
                      state?.isAdminCreated &&

                      <div className="each_main_tl">
                        <div className="each_d_lt">Created By</div>
                        <div
                          className="d-lt-a"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          Admin

                        </div>

                      </div>
                    }
                  </div>

                  <div
                    className="each_details_tl"
                    style={{ paddingBottom: "30px" }}
                  >
                    <div className="details_cl_tl">Vendor</div>
                    {
                      !state?.isAdminCreated && <>

                        <div className="each_main_tl">
                          <div className="each_d_lt">Business Name</div>
                          <span className="d-lt-a">
                            {state.flexUser?.businessName}{" "}
                          </span>
                        </div>
                        <div className="each_main_tl">
                          <div className="each_d_lt">Account Owner</div>
                          <span className="d-lt-a">{state.flexUser?.firstName} {" "}{state.flexUser?.lastName}</span>
                        </div>
                        {
                          /** 
                        <div className="each_main_tl">
                          <div className="each_d_lt">Business Country</div>
                          <span className="d-lt-a">{state.receiverBusiness?.country}</span>
                        </div>
                        */
                        }
                        <div className="each_main_tl">
                          <div className="each_d_lt">Phone Number</div>
                          <span className="d-lt-a">
                            {state?.flexUser?.phoneNumber}
                          </span>
                        </div>

                        <div className="each_main_tl">
                          <div className="each_d_lt">Type</div>
                          <span className="d-lt-a">{state.flexUser?.flexUserType} </span>
                        </div>
                        
                      </>
                 
                }{
                  state.isAdminCreated && <>
                  <div className="each_main_tl">
                          <div className="each_d_lt">Created By </div>
                          <span className="d-lt-a">TradeVu </span>
                        </div>
                  </>
                   
                }
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
                    Order Details
                  </li>


                  <li
                    onClick={() => {

                      settab("seller");
                    }}
                    style={{
                      borderBottom: tab === "seller" ? "3px solid #6F00FF" : "",
                    }}
                  >
                    Invoice Details
                  </li>
                  {
                    /**
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
                   */
                  }
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
                                    {res.firstName} {res.lastName}
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
                              {state.type} documents
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
                                    businessType: allbusiness.type,
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
                                    businessType: state.type,
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
                                    businessType: allbusiness.type,
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
                                    businessType: allbusiness.type,
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
                                    businessType: allbusiness.type,
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
                                    businessType: allbusiness.type,
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
                                    businessType: allbusiness.type,
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
                      {state.type === "SoleProprietorship" &&
                        state?.country === "Nigeria" && (
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
                                      businessType: allbusiness.type,
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
                                        businessType: allbusiness.type,
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

                      {state?.orderItems?.length === 0 && (
                        <div className="emtty_transact">
                          <img src={empty} alt="" />
                          <div className="empty_info">
                            <h4>No Order yet</h4>
                            <div>This partners has no recent order.</div>
                          </div>
                        </div>
                      )}

                      {state?.orderItems?.length > 0 &&
                        <>

                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                          }}>
                            <span className="breakdown">Breakdown</span>


                            {state?.orderItems?.map((res, index) => (
                              <div className="main-lg-request" key={index} style={{
                                border: '1px solid #E7E9FB',
                                borderRadius: '8px',
                                padding: '8px'
                              }}>
                                <div className="each-request">
                                  <div className="img-name">
                                    <div
                                      className="mytag-lg"
                                      style={{
                                        gap: "0px",
                                      }}
                                    >
                                      <div className="head-tg">
                                        {res.itemName}
                                      </div>
                                      <span
                                        className="small-tg"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "4px",
                                        }}
                                      >
                                        Quantity {res.quantity}, Unit Price  {state.currency === "NGN"
                                          ? "₦"
                                          : state.currency === "USD"
                                            ? "$"
                                            : state.currency === "EUR"
                                              ? "€"
                                              : "£"}{parseFloat(res.pricePerUnit).toLocaleString()}

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
                                      {state.currency === "NGN"
                                        ? "₦"
                                        : state.currency === "USD"
                                          ? "$"
                                          : state.currency === "EUR"
                                            ? "€"
                                            : "£"}
                                      {parseFloat(res.quantity * res.pricePerUnit).toLocaleString()}
                                    </div>

                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      }
                      {state?.purchaseOrder &&
                        <>

                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                          }}>
                            <span className="breakdown">Purchase Order</span>



                            <a className="main-lg-request" style={{
                              border: '1px solid #E7E9FB',
                              borderRadius: '8px',
                              padding: '24px',
                              cursor:'pointer',
                              color:''
                            }}
                            target="_blank"
                            rel="noreferrer"

                            href={`${state.purchaseOrder.url}`}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}>
                                <img src={user} alt="" />
                                {state.purchaseOrder?.key}

                              </div>


                            </a>

                          </div>
                        </>
                      }


                      {state?.document?.length !== 0 &&
                        <>

                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                          }}>
                            <span className="breakdown">Document</span>


                            {
                              state.document?.map((res) => (

                                <a className="main-lg-request" style={{
                                  border: '1px solid #E7E9FB',
                                  borderRadius: '8px',
                                  padding: '24px',
                                  cursor:'pointer'
                                }}
                                href={`${res.url}`}
                                target="_blank"
                                rel="noreferrer"
                                >
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                  }}>
                                    <img src={user} alt="" />
                                    {res.key}

                                  </div>


                                </a>

                              ))
                            }

                          </div>
                        </>
                      }


                    </>
                  )}
                  {tab === "buyers" && (
                    <>
                      {" "}
                      {buyers?.length === 0 && (
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
                      {buyers?.length >= 1 &&
                        buyers?.map((res, index) => (
                          <div className="main-lg-request" key={index}>
                            <div className="each-request">
                              <div className="img-name">
                                <img src={factoring} alt="" />
                                <div className="mytag-lg">
                                  <div className="head-tg">
                                    {res?.business?.name}
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
                      {state?.invoice?.length === 0 && (
                        <div className="emtty_transact">
                          <img src={emptywoman} alt="" />
                          <div
                            className="empty_info"
                            style={{ maxWidth: "311px" }}
                          >
                            <h4>Account doesn’t have any invoice yet</h4>
                            <div>
                              You’ll see  invoice that this account has added to
                              their order here.
                            </div>
                          </div>
                        </div>
                      )}
                      {allorder?.length > 0 &&
                        allorder?.map((res, index) => (
                          <div className="main-lg-request" key={index} style={{
                            border: '1px solid #E7E9FB',
                            borderRadius: '8px',
                            padding: '16px'
                          }}
                            onClick={() => {
                              navigate(`/flex/invoice/${res._id}`, {
                                state: {
                                  ...res,
                                  customtype: 'Factoring'
                                }
                              })
                            }}
                          >
                            <div className="each-request">
                              <div className="img-name">
                                <img src={factoring} alt="" />
                                <div className="mytag-lg">
                                  <div className="head-tg">
                                    {res?.invoiceTitle}
                                  </div>
                                  <span
                                    className="small-tg"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "4px",
                                    }}
                                  >
                                    {res?.invoiceItems?.length}{" "}(Orders)

                                  </span>
                                </div>
                              </div>
                              <div className="mytag-lg">
                                <div
                                  className="head-tg"
                                  style={{
                                    color: "#667085",

                                    fontSize: "14px",
                                    fontWeight: "500",
                                    lineHeight: "19.6px",
                                    textAlign: "right",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {state.currency === "NGN"
                                    ? "₦"
                                    : state.currency === "USD"
                                      ? "$"
                                      : state.currency === "EUR"
                                        ? "€"
                                        : "£"}{parseFloat(res?.totalAmount).toLocaleString()}
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

      export default OrderDetails;
