// import {useState} from 'react'
import search from "../assets/images/notification.svg";
import sech from "../assets/images/newsearch.svg";
import { LOGOUT_USER } from "../store/action";
import { useNavigate } from "react-router";
const Header = () => {
  const navigate = useNavigate();
  const logout = async () => {
    LOGOUT_USER();
    navigate("/");
  };
  return (
    <>
      <div
        className="nav-header"
        style={{
          borderBottom: "1px solid #E7E9FB",

          background: "#fff",
        }}
      >
        <div
          className="search-dl"
          style={{
            maxWidth: "65%",
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
              // width: "55%",
              height: "40px",
            }}
          >
            <img src={sech} alt="" />
            <input
              type="text"
              placeholder="Search here..."
              style={{
                outline: "none",
                border: "none",
                width: "100%",
                background: "#ECEFF3",
                color: "#667085",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "19.6px",
                letterSpacing: "0em",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "32px",
          }}
        >
          <img src={search} alt="" />
          <span className="material-icons" onClick={() => logout()}>
            logout
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
