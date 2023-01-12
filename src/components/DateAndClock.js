import React from "react";
import { useState, useEffect } from "react";
import clockWhite from "../assets/images/clockWhite.png";
import calendarWhite from "../assets/images/calendarWhite.png";
import "../assets/css/dateClock.css";

export default function DateAndClock() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);
  return (
    <>
      <div className="timeDate">
        <img src={calendarWhite} alt="" className="calendar" />
        {dateState.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
        <img src={clockWhite} alt="" className="clock" />
        {dateState.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </div>
    </>
  );
}
