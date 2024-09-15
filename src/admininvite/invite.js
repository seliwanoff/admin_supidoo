import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import Loading from "../components/loading";
import InviteHeader from "../components/inviteheader";

const AdminInvite = () => {
  const [loader, setloader] = useState(false);
  const [isdisable, setisdisable] = useState(true);
  const [lastname, setlastname] = useState("");
  const [firstname, setfirstname] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const [success, setsucess] = useState(false);
  const [fail, setfail] = useState(false);
  const [message, setmessage] = useState("");

  const { token, email } = useParams();
  //  console.log(email)
  // console.log(token)
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      let timer = setTimeout(() => {
        setsucess(false);
        navigate("/");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
    if (fail) {
      let timer = setTimeout(() => {
        setfail(false);
        // navigate(-1)
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setloader(true);
    const data = {
      firstName: firstname,
      lastName: lastname,
      password: password,
      country: country,
      verificationToken: token,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
    };
    await axios
      .post(`/v1/admin/create/complete`, data)
      .then((res) => {
        setmessage(res.data.message);
        setsucess(true);
        setfail(false);
        setloader(false);
      })
      .catch((e) => {
        setsucess(false);
        setfail(true);
        setloader(false);

        setmessage(
          e?.response?.data ? e?.response?.data.message : "An error occur"
        );
      });
  };
  return (
    <div className="h-100 w-100 ">
      <div
        className=""
        style={{
          maxWidth: "2000px",
          width: "100%",
          margin: "0px auto",
          boxSizing: "border-box",
        }}
      >
        <Helmet>
          <title>Invite Request</title>
        </Helmet>

        <InviteHeader />
      </div>
      <div
        style={{
          height: "100%",
          maxWidth: "2000px",
          margin: "0px auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          className=" "
          style={{
            margin: "0px auto",
            paddingLeft: "30px",
            paddingRight: "30px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",

              justifyContent: "center",
            }}
          >
            <form
              onSubmit={submitHandler}
              className="form-general-layout"
              style={{
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              {success && (
                <div className="success" style={{ width: "100%" }}>
                  <div className="lg-success">
                    <div className="ech-lg-hm">
                      <div className="main-sucees">Success</div>
                      <span style={{ fontSize: "12px" }}>{message} </span>
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
                  }}
                >
                  <div className="lg-success">
                    <div
                      className="ech-lg-hm"
                      style={{ background: "#F9FAFB" }}
                    >
                      <div className="main-sucees" style={{ color: "#344054" }}>
                        Failed
                      </div>
                      <span style={{ color: "#344054" }}>{message} </span>
                    </div>
                  </div>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "32px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      color: "#101828",
                      fontWeight: "500",
                      fontSize: "24px",
                      lineHeight: "32.4px",
                    }}
                  >
                    You have been invited to join TradeVu as an Admin
                  </div>
                  <span
                    style={{
                      color: "#667085",
                      fontWeight: "400",
                      lineHeight: "24px",
                      fontSize: "1rem",
                      letterSpacing: "2%",
                    }}
                  >
                    Set up a password for your account below
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "32px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        width: "100%",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <input
                            type="text"
                            name=""
                            onChange={(e) => setfirstname(e.target.value)}
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                              border: "none",
                              height: "46px",
                              outline: "none",
                              background: "",
                              padding: "8px 16px 8px 16px",
                              backgroundColor: "#ECEFF3",
                              letterSpacing: "2%",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                            placeholder="First name"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        width: "100%",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <input
                            type="text"
                            name=""
                            onChange={(e) => setlastname(e.target.value)}
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                              border: "none",
                              height: "46px",
                              outline: "none",
                              background: "",
                              padding: "8px 16px 8px 16px",
                              backgroundColor: "#ECEFF3",
                              letterSpacing: "2%",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                            placeholder="Last name"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        width: "100%",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <input
                            type="tel"
                            name=""
                            min="11"
                            onChange={(e) => setphoneNumber(e.target.value)}
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                              border: "none",
                              height: "46px",
                              outline: "none",
                              background: "",
                              padding: "8px 16px 8px 16px",
                              backgroundColor: "#ECEFF3",
                              letterSpacing: "2%",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        width: "100%",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <input
                            type="text"
                            name=""
                            onChange={(e) => setcountry(e.target.value)}
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                              border: "none",
                              height: "46px",
                              outline: "none",
                              background: "",
                              padding: "8px 16px 8px 16px",
                              backgroundColor: "#ECEFF3",
                              letterSpacing: "2%",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                            placeholder=" Country"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        width: "100%",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <input
                            type="text"
                            name=""
                            onChange={(e) => setaddress(e.target.value)}
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                              border: "none",
                              height: "46px",
                              outline: "none",
                              background: "",
                              padding: "8px 16px 8px 16px",
                              backgroundColor: "#ECEFF3",
                              letterSpacing: "2%",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                            placeholder="Enter Address"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        width: "100%",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <input
                            type="password"
                            name=""
                            onChange={(e) => setpassword(e.target.value)}
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                              border: "none",
                              height: "46px",
                              outline: "none",
                              background: "",
                              padding: "8px 16px 8px 16px",
                              backgroundColor: "#ECEFF3",
                              letterSpacing: "2%",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                            placeholder="Password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <button
                      style={{
                        maxWidth: "280px",
                        width: "100%",
                        background: "#6F00FF",
                        padding: "16px 24px 16px 24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "none",
                        outline: "none",
                        minHeight: "46px",
                        borderRadius: "8px",
                        fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "2%",
                        fontWeight: "600",
                        color: "#ffff",
                      }}
                    >
                      {loader === true ? <Loading /> : "Join Now"}{" "}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInvite;
