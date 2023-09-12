import React, { useEffect, useState } from "react";

const DayContext = React.createContext({});

export const DayContextProvider = (props) => {
  // Returns the ISO week of the date.
  Date.prototype.getWeek = function () {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return (
      1 +
      Math.round(
        ((date.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  };

  let today = new Date();
  console.log(today);

  //let newDay = today.setDate(todaysDate + 1)

  console.log(today);

  const [x, setx] = useState(today);



  const monthNames = [
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
    "December",
  ];

  const currentMonth = monthNames[today.getMonth()];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const weeks = ["Week1", "Week2", "Week3", "Week4"];

  let y = "";

  let week = 4;

  if (week % 4 === 3) {
    y = weeks[0];
  } else if (week % 4 === 0) {
    y = weeks[1];
  } else if (week % 4 === 1) {
    y = weeks[2];
  } else if (week % 4 === 2) {
    y = weeks[3];
  }

  const [day, setDay] = useState("Sunday");
  const [daycounter, setDayCounter] = useState(0);

  const [weekNumber, setWeekNumber] = useState(x);

  useEffect(() => {
    if (week % 4 === 3) {
      setWeekNumber(weeks[0]);
    } else if (week % 4 === 0) {
      setWeekNumber(weeks[1]);
    } else if (week % 4 === 1) {
      setWeekNumber(weeks[2]);
    } else if (week % 4 === 2) {
      setWeekNumber(weeks[3]);
    }
  }, []);

  const addDayHandler = () => {
    if (daycounter < days.length - 1) {
      setDayCounter(daycounter + 1);
    } else {
      setDayCounter(0);
    }
    today.setDate(today.getDate() + 1);
    setDay(days[daycounter]);
  };

  const subtractDayHandler = () => {
    if (daycounter > days.length - 7) {
      setDayCounter(daycounter - 1);
    } else {
      setDayCounter(6);
    }
    console.log(x);
    setx(x - 1);
  };

  useEffect(() => {
    setDay(days[daycounter]);
  }, [daycounter]);

  return (
    <DayContext.Provider
      value={{
        weekNumber: weekNumber,

      }}
    >
      {props.children}
    </DayContext.Provider>
  );
};

export default DayContext;
