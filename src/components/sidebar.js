import logo from "../assets/images/supidoo.png";
import finance from "../assets/images/finance2.svg";
import userprofile from "../assets/images/newuser.svg";
import userprofileactive from "../assets/images/newactiveuser.svg";

import flex from "../assets/images/flex2.svg";
import transaction from "../assets/images/maintrans.svg";
import dot from "../assets/images/_Dot.svg";
import settings from "../assets/images/setting-2.svg";
import icons from "../assets/images/iconsd.svg";
import { useState } from "react";
import dashboard2 from "../assets/images/dashboard2.svg";
import { NavLink } from "react-router-dom";
import wallet from "../assets/images/wallet3.svg";
import transfer from "../assets/images/new-trade.svg";
import pay from "../assets/images/pay.svg";
import dasini from "../assets/images/inactivedashboard.svg";
import initrans from "../assets/images/inittransaction.svg";
import activefinance from "../assets/images/activefinance.svg";
import activetransfer from "../assets/images/activetransfer.svg";
import activeflex from "../assets/images/newflexactive.svg";
import walletactive from "../assets/images/walletactive.svg";
import settingsactive from "../assets/images/activesettings.svg";

const SideBar = (props) => {
  const [isdropflex, setisdropflex] = useState(false);

  return (
    <>
      <div className="stick-collapse">
        <div className="sidenav-sticky">
          <div
            style={{
              padding: "2px 24px 2px 24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt=""
              style={{
                margin: "0px auto",
                width: "100%",
              }}
            />
          </div>
          <div className="down-sticky-drawer">
            <NavLink to={"/dashboard"} className="each-stivky-side">
              {({ isActive }) => (
                <div className="each-main">
                  <img src={isActive ? dashboard2 : dasini} alt="" />
                  <span className="ech-l">Dashboard</span>
                </div>
              )}
            </NavLink>

            <NavLink
              className="each-stivky-side colapse-open"
              to={"/transaction/home"}
            >
              {({ isActive }) => (
                <div className="each-main">
                  <img src={isActive ? transaction : initrans} alt="" />
                  <span className="ech-l">Activities</span>
                </div>
              )}
            </NavLink>

            <div
              style={{
                //  border: "thin solid #E7E9FB",
                borderWidth: "0.5px",
                borderStyle: "solid",
                borderColor: "#E7E9FB",
              }}
            ></div>

            <NavLink className="each-stivky-side" to={"referral/home"}>
              {({ isActive }) => (
                <div className="each-main">
                  <img src={isActive ? activefinance : finance} alt="" />
                  <span className="ech-l">Referral</span>
                </div>
              )}
            </NavLink>

            <NavLink className="each-stivky-side" to={"/payment/home"}>
              {({ isActive }) => (
                <div className="each-main">
                  <img src={isActive ? activetransfer : transfer} alt="" />
                  <span className="ech-l">Withdraw</span>
                </div>
              )}
            </NavLink>
            <NavLink to={"/account"} className="each-stivky-side">
              {({ isActive }) => (
                <div className="each-main">
                  <img
                    src={isActive ? userprofileactive : userprofile}
                    alt=""
                  />
                  <span className="ech-l">Users</span>
                </div>
              )}
            </NavLink>

            <div
              style={{
                //  border: "1px solid #E7E9FB",
                border: "thin solid #E7E9FB",
              }}
            ></div>
            {/**
            <NavLink className="each-stivky-side" to={"/transfer/pay"}>
              {({ isActive }) => (
                <div className="each-main">
                  <img src={isActive ? transaction : pay} alt="" />
                  <span className="ech-l">Pay</span>
                </div>
              )}
            </NavLink>
            */}
            {/**
            <NavLink className="each-stivky-side" to={"/flex"}>
              {({ isActive }) => (
                <div className="each-main">
                  <img src={isActive ? activeflex : flex} alt="" />
                  <span className="ech-l">Flex</span>
                </div>
              )}
            </NavLink>
            */}
            {/**
            <NavLink className="each-stivky-side" to={"/wallet"}>
              {({ isActive }) => (
                <div className="each-main">
                  <img src={isActive ? walletactive : wallet} alt="" />
                  <span className="ech-l">Wallet</span>
                </div>
              )}
            </NavLink>
            */}

            <NavLink to={"/settings/home"} className="each-stivky-side">
              {({ isActive }) => (
                <div className="each-main">
                  <img src={isActive ? settingsactive : settings} alt="" />
                  <span className="ech-l">Settings</span>
                </div>
              )}
            </NavLink>
          </div>

          <div style={{ flex: "1 0" }}></div>
          <div className="footer-nav">
            <div className="each-stivky-side">
              <div className="colapse-logout-stickyz">
                <div className="left-scl">
                  <div className="inital_name">
                    {props.users?.users?.firstname?.slice(0, 2)}
                  </div>
                  <div className="d-cl">
                    <span className="icon-ad">
                      {props.users?.users?.firstname}{" "}
                      {props.users?.users?.lastname}
                    </span>
                    <span
                      className="icon-ac"
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {props.users?.users?.type}
                    </span>
                  </div>
                </div>
                <span
                  className="material-icons"
                  style={{
                    fontSize: "14px",
                    color: "#667085",
                  }}
                >
                  chevron_right
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
