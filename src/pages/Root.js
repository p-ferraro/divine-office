//testing github

import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { useEffect, useState } from "react";
import "./Root.css";
import "../components/DatePicker.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import feastDays from "../components/FeastDays";
import { createContext } from "react";
import "../components/themeToggle.css";
import HomePage from "./HomePage";

function RootLayout() {
  const propers = [
    "SundayTwentyFirstWeek",
    "MondayTwentyFirstWeek",
    "TuesdayTwentyFirstWeek",
    "WednesdayTwentyFirstWeek",
    "ThursdayTwentyFirstWeek",
    "FridayTwentyFirstWeek",
    "SaturdayTwentyFirstWeek",
    "SundayTwentySecondWeek",
    "MondayTwentySecondWeek",
    "TuesdayTwentySecondWeek",
    "WednesdayTwentySecondWeek",
    "ThursdayTwentySecondWeek",
    "FridayTwentySecondWeek",
    "SaturdayTwentySecondWeek",
    "SundayTwentyThirdWeek",
    "MondayTwentyThirdWeek",
    "TuesdayTwentyThirdWeek",
    "WednesdayTwentyThirdWeek",
    "ThursdayTwentyThirdWeek",
    "FridayTwentyThirdWeek",
    "SaturdayTwentyThirdWeek",
    "SundayTwentyFourthWeek",
    "MondayTwentyFourthWeek",
    "TuesdayTwentyFourthWeek",
    "WednesdayTwentyFourthWeek",
    "ThursdayTwentyFourthWeek",
    "FridayTwentyFourthWeek",
    "SaturdayTwentyFourthWeek",
    "SundayTwentyFifthWeek",
    "MondayTwentyFifthWeek",
    "TuesdayTwentyFifthWeek",
    "WednesdayTwentyFifthWeek",
    "ThursdayTwentyFifthWeek",
    "FridayTwentyFifthWeek",
    "SaturdayTwentyFifthWeek",
    "SundayTwentySixthWeek",
    "MondayTwentySixthWeek",
    "TuesdayTwentySixthWeek",
    "WednesdayTwentySixthWeek",
    "ThursdayTwentySixthWeek",
    "FridayTwentySixthWeek",
    "SaturdayTwentySixthWeek",
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFeastDay, setIsFeastDay] = useState(false);

  const [showInvToggle, setShowInvToggle] = useState(true);

  const gloryBe = (
    <span>
      Glory to the Father, and to the Son, and to the Holy Spirit:
      <br /> <span className="red">—</span> as it was in the beginning, is now,
      and will be for ever. Amen.
    </span>
  );

  const GodCome = (
    <p>
      God, come to my assistance. <br />
      <span className="red">—</span> Lord, make hast to help me.
      <br />
      <br />
      Glory to the Father, and to the Son, and to the Holy Spirit:
      <br /> <span className="red">—</span> as it was in the beginning, is, and
      will be forever. Amen. Alleluia.
    </p>
  );
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

  const dayOfYear = (date) =>
    Math.floor(
      (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );

  useEffect(() => {
    if (
      feastDays[dayOfYear(selectedDate) - 1].startsWith("Saint") ||
      feastDays[dayOfYear(selectedDate) - 1].startsWith("The") ||
      feastDays[dayOfYear(selectedDate) - 1].startsWith("Triumph") ||
      feastDays[dayOfYear(selectedDate) - 1].startsWith("Our")
    ) {
      setIsFeastDay(true);
    } else {
      setIsFeastDay(false);
    }
  }, [selectedDate]);

  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const [showInvitatory, setShowInvitatory] = useState(false);
  const toggleInvitatory = () => {
    setShowInvitatory((curr) => (curr === true ? false : true));
  };
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="root" id={theme}>
          <MainNavigation />
            <hr/>
          <div className="divLayout">
            <br/>
            <span className="date">
              {feastDays[dayOfYear(selectedDate) - 1]}
              <br />
              <br />
            </span>
            <div className="datePickerAndToggle">
              <DatePicker
                label="Date"
                defaultValue={dayjs(selectedDate)}
                onChange={(newValue) => {
                  setSelectedDate(new Date(newValue));
                }}
                
                sx={{
                  "& .MuiFormLabel-root": {
                    color: theme === "light" ? "#121212" : "#FAF9F6",
                  },
                  "& .MuiSvgIcon-root": {
                    color: theme === "light" ? "#121212" : "#FAF9F6",
                  },
                  "& .MuiInputBase-input": {
                    color: theme === "light" ? "#121212" : "#FAF9F6",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme === "light" ? "#c0c0c0" : "#c0c0c0",
                    },
                    "&:hover fieldset": {
                      borderColor: theme === "light" ? "#121212" : "#FAF9F6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme === "light" ? "#121212" : "#FAF9F6",
                    },
                  },
                }}
                minDate={dayjs("2023-10-5")}
                maxDate={dayjs("2023-10-6")}
              />
              <input
                className="themeToggle"
                type="checkbox"
                id="darkmode-toggle"
                onClick={toggleTheme}
                defaultChecked="true"
              />
              <label className="themeToggle" for="darkmode-toggle">
                <svg
                  className="moon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="var(--ci-primary-color, currentColor)"
                    d="M268.279,496c-67.574,0-130.978-26.191-178.534-73.745S16,311.293,16,243.718A252.252,252.252,0,0,1,154.183,18.676a24.44,24.44,0,0,1,34.46,28.958,220.12,220.12,0,0,0,54.8,220.923A218.746,218.746,0,0,0,399.085,333.2h0a220.2,220.2,0,0,0,65.277-9.846,24.439,24.439,0,0,1,28.959,34.461A252.256,252.256,0,0,1,268.279,496ZM153.31,55.781A219.3,219.3,0,0,0,48,243.718C48,365.181,146.816,464,268.279,464a219.3,219.3,0,0,0,187.938-105.31,252.912,252.912,0,0,1-57.13,6.513h0a250.539,250.539,0,0,1-178.268-74.016,252.147,252.147,0,0,1-67.509-235.4Z"
                    className="ci-primary"
                  />
                </svg>
                <svg
                  className="sun"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 612 612"
                >
                  <g id="_x37__5_">
                    <path
                      d="M76.5,286.875H19.125C8.568,286.875,0,295.443,0,306c0,10.557,8.568,19.125,19.125,19.125H76.5
				c10.557,0,19.125-8.568,19.125-19.125C95.625,295.443,87.057,286.875,76.5,286.875z M306,95.625
				c10.557,0,19.125-8.568,19.125-19.125V19.125C325.125,8.568,316.557,0,306,0c-10.557,0-19.125,8.568-19.125,19.125V76.5
				C286.875,87.057,295.443,95.625,306,95.625z M490.002,148.792l40.182-40.182c7.401-7.401,7.401-19.393,0-26.794
				s-19.394-7.401-26.795,0l-40.182,40.182c-7.401,7.401-7.401,19.393,0,26.794C470.609,156.194,482.601,156.194,490.002,148.792z
				 M141.716,443.509l-40.182,40.182c-7.401,7.401-7.401,19.393,0,26.794s19.393,7.401,26.794,0l40.182-40.182
				c7.401-7.401,7.401-19.393,0-26.794S149.118,436.107,141.716,443.509z M130.203,157.246c7.478,7.478,19.584,7.478,27.042,0
				c7.459-7.478,7.459-19.584,0-27.042L116.682,89.62c-7.478-7.478-19.584-7.478-27.043,0c-7.478,7.478-7.478,19.584,0,27.043
				L130.203,157.246z M306,516.375c-10.557,0-19.125,8.568-19.125,19.125v57.375c0,10.557,8.568,19.125,19.125,19.125
				c10.557,0,19.125-8.568,19.125-19.125V535.5C325.125,524.943,316.557,516.375,306,516.375z M481.797,454.754
				c-7.478-7.478-19.584-7.478-27.043,0c-7.478,7.479-7.478,19.584,0,27.043l40.564,40.564c7.478,7.478,19.584,7.478,27.043,0
				c7.459-7.479,7.478-19.584,0-27.043L481.797,454.754z M592.875,286.875H535.5c-10.557,0-19.125,8.568-19.125,19.125
				c0,10.557,8.568,19.125,19.125,19.125h57.375c10.557,0,19.125-8.568,19.125-19.125C612,295.443,603.432,286.875,592.875,286.875z
				 M306,133.76c-95.128,0-172.24,77.112-172.24,172.24S210.872,478.24,306,478.24S478.24,401.128,478.24,306
				S401.128,133.76,306,133.76z M306,439.837c-73.918,0-133.837-59.919-133.837-133.837S232.082,172.163,306,172.163
				S439.837,232.082,439.837,306S379.918,439.837,306,439.837z"
                    />
                  </g>
                </svg>
              </label>
            </div>
          </div>
          <br />
          <div className="invitatoryToggleAndLabel">
            {showInvToggle && <span>Invitatory</span>}
            {showInvToggle && (
              <input
                className="invitatoryToggle"
                type="checkbox"
                id="invitatory-toggle"
                onClick={toggleInvitatory}
              />
            )}
            {showInvToggle && (
              <label
                className="invitatoryToggle"
                for="invitatory-toggle"
              ></label>
            )}
          </div>
          {showInvitatory ? (
            <HomePage
              gloryBe={gloryBe}
              selectedDate={selectedDate}
              isFeastDay={isFeastDay}
              monthNames={monthNames}
            />
          ) : null}
          <br />
          <br />
          <Outlet
            context={{
              selectedDate,
              feastDays,
              propers,
              monthNames,
              gloryBe,
              GodCome,
              isFeastDay,
              setShowInvToggle,
            }}
          />
        </div>
      </LocalizationProvider>
    </ThemeContext.Provider>
  );
}

export default RootLayout;
export const ThemeContext = createContext("light");
