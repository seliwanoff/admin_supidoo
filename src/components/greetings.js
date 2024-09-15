import { useEffect, useState } from "react";

const Greetings = (props) => {
  const today = new Date();
  const [mydate, setmydate] = useState(new Date());

  let currentHour = today.getHours();
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
    <div className="main-greeting">
      <div className="gree-con">
        <h1
          style={{
            margin: "0px",
            padding: "0px",
            fontWeight: "600",
          }}
        >
          {" "}
          {currentHour < 12
            ? `Good morning ${props.users?.firstname}`
            : currentHour < 18
            ? `Good afternon ${props.users?.firstname}`
            : ` Good evening ${props.users?.firstname}`}{" "}
        </h1>
        <span
          className="myTradevu"
          style={{
            color: "#344054",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          Welcome to Supidoo 's Control Center. You can view all customer
          activities from this dashboard.
        </span>
      </div>
      <div className="gree-time">
        <span className="mytime">
          {" "}
          {hrs}:{min} {hrs >= 12 ? "PM" : "AM"}{" "}
        </span>
        <span className="myday">
          {" "}
          {day},<span> {todays}</span>
          <span> {months} </span>
          {year}{" "}
        </span>
      </div>
    </div>
  );
};

export default Greetings;
