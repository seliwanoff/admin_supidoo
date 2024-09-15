// import {useState} from 'react'
import { useEffect, useState } from "react";
import dots from "../assets/images/dotss.svg";

import search from "../assets/images/notification.svg";
import { useNavigate } from "react-router";
import { LOGOUT_USER } from "../store/action";
const OtherHeader = (props) => {
  const [mydate, setmydate] = useState(new Date());
  const navigate = useNavigate();
  const logout = async () => {
    LOGOUT_USER();
    navigate("/");
  };

  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = weekday[mydate.getDay()];

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "december",
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setmydate(new Date());
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  });
  let months = month[mydate.getMonth()];

  let year = mydate.getFullYear();
  let todays = mydate.getDate();
  let hrs = mydate.getHours();
  let min = mydate.getMinutes();

  return (
    <>
      <div
        className="nav-header"
        style={{
          borderBottom: "1px solid #E7E9FB",

          background: "#fff",
        }}
      >
        {/****  <div className="d-cl">
                <h1 className="ad-l"
                    style={
                        {
                            margin: '0px',
                            padding: '0px'
                        }
                }>Good {
                    currentHour < 12 ? 'Morning Admin 👋🏾' : currentHour < 18 ? 'Afternon Admin 👋🏾' : 'Evening Admin 👋🏾'
                } </h1>
                <span className="small-c">Track, manage and forecast your customers and orders.</span>

            </div> */}
        <h3
          className="header-other"
          style={{
            alignItems: "center",
            display: "flex",
            gap: "32px",
          }}
        >
          {props.arrow && (
            <span className="material-icons" onClick={() => navigate(-1)}>
              {" "}
              {props.arrow}{" "}
            </span>
          )}
          <span
            className="tophd_fl"
            style={{
              fontWeight: "600",
            }}
          >
            {props.title}
          </span>{" "}
        </h3>
        <div
          className="gree-times "
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <span className="mytimes">
            {hrs}:{min}
            {hrs >= 12 ? "PM" : "AM"}{" "}
          </span>
          <img src={dots} alt="" />
          <span className="mydays">
            {day},<span> {todays}</span>
            <span> {months} </span>
            {year}{" "}
          </span>
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

export default OtherHeader;
