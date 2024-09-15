import logotr from "../assets/images/supidoo.png";
import world from "../assets/images/cword.gif";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "../store/action";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loading";
import "../style/index.css";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loader, setloader] = useState(false);
  const [showEmailLabel, setShowlabelEmail] = useState(false);
  const [showPasswordLabel, setShowlabelPassword] = useState(false);
  const [fail, setfail] = useState(false);
  const [message, setmessage] = useState("");
  const navigate = useNavigate();
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

  const SubmitHandler = (e) => {
    setloader(true);
    e.preventDefault();

    const data = {
      id: email,
      password: password,
    };
    LOGIN_USER(data, dispatch)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((e) => {
        console.log(e);
        setloader(false);
        setfail(true);
        setmessage(
          e?.response?.data?.message
            ? e?.response?.data?.message
            : "An error occured, please try again"
        );
        /*
        Swal.fire({
          title: "Error!",
          text: e.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
          width: "280px",
          confirmButtonColor: "rgb(111, 0, 255)",
        }).then((res) => {
          if (res.value) {
            setloader(false);
          }
        });
        */
      });
  };
  return (
    <div className="main-login">
      <div className="containers-lo">
        <header
          style={{
            height: "76px",
          }}
        >
          <nav
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              display: "flex",
            }}
          >
            <img
              src={logotr}
              alt=""
              style={{
                width: "200px",
              }}
            />
          </nav>
        </header>
        <div className="world-containers">
          <div
            className="la-card"
            style={{
              zIndex: "9999",
              position: "relative",
            }}
          >
            <form
              className="form-con"
              onSubmit={SubmitHandler}
              style={{
                position: "relative",
              }}
            >
              {fail && (
                <div
                  className="success"
                  style={{
                    background: "#FCFCFD",
                    border: " 1px solid #D0D5DD",
                    width: "100%",

                    boxSizing: "border-box",
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
              <div className="text-welcome">Welcome back</div>
              <div
                className="text-lgs"
                style={{
                  zIndex: "999",
                  marginTop: "-20px",
                }}
              >
                Supidoo provides one platform to access earn, make payments.
              </div>
              <div className="input-form">
                <div
                  className="each-form-input"
                  style={{
                    background: showEmailLabel && "#D7DDEA",
                  }}
                >
                  {showEmailLabel && (
                    <span
                      htmlFor="Email"
                      style={{
                        color: showEmailLabel ? "#6F00FF " : "#667085",
                      }}
                    >
                      Email Address
                    </span>
                  )}
                  <input
                    style={{
                      background: showEmailLabel && "#D7DDEA",
                    }}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    onFocus={() => setShowlabelEmail(true)}
                  />
                </div>
                <div
                  className="each-form-input"
                  style={{
                    background: showPasswordLabel && "#D7DDEA",
                  }}
                >
                  {showPasswordLabel && (
                    <span
                      htmlFor="Email"
                      style={{
                        color: showEmailLabel ? "#6F00FF " : "#667085",
                      }}
                    >
                      Password
                    </span>
                  )}
                  <input
                    onFocus={() => setShowlabelPassword(true)}
                    style={{
                      background: "inherit",
                      border: "1px solid inherit",
                    }}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="lgn-btn-lg">
                <button
                  className="login-btn"
                  type="submit"
                  disabled={loader}
                  style={{
                    maxWidth: "156px",
                    width: "100%",
                  }}
                >
                  {loader ? <Loader /> : "Sign In"}
                </button>
                {/***
                <span className="dont-have">
                  I don’t have an account,{" "}
                  <Link to={"/register"}> Create one</Link>{" "}
                </span>
                */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
