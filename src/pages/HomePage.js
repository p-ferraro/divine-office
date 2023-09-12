import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Hours.css";

const HomePage = (props) => {
  const [weekNumber, setWeekNumber] = useState("Week1");
  const weeks = ["Week1", "Week2", "Week3", "Week4"];

  let week = props.selectedDate.getWeek();

  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - onejan) / 86400000 + onejan.getDay()) / 7);
  };

  const lordOpen = "Lord, open my lips.<br/><span class='red'>—</span> And my mouth will proclaim your praise."

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]; 

  const [dayName, setDayName] = useState(daysOfWeek[props.selectedDate.getDay()]);

  useEffect(() => {
    setDayName(daysOfWeek[props.selectedDate.getDay()]);
  }, [props.selectedDate]);


  const [invitatoryAntiphon, setInvitatoryAntiphon] = useState("");

  useEffect(() => {
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/${weekNumber}/${dayName}/Invitatory.json`
    )
      .then((response) => response.json())
      .then((response) => setInvitatoryAntiphon(response));
    },[props.selectedDate, dayName, weekNumber])

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
    }, [props.selectedDate, dayName]);

  return (
    <div className="hours">

            <h1 className="header">Invitatory</h1>
            <span dangerouslySetInnerHTML={{ __html: lordOpen}}></span>
            <span className="psalm">Psalm 95</span>
            <span className="psalm">A call to praise God </span>
            <span className="psalmsSummary"> Encourage each other daily while it is still today. </span>
            <span> Hebrews 3:13</span>
            <br/>
            <br/>
            <div className="h">
              <span className="r">Ant. </span>
              <span>{invitatoryAntiphon}</span>
            </div>
            <p dangerouslySetInnerHTML={{ __html: "Come, let us sing to the Lord<br/>and shout with joy to the Rock who saves us.<br/>Let us approach him with praise and thanksgiving<br/>and sing joyful songs to the Lord." }}></p>
            <div className="h">
              <span className="r">Ant. </span>
              <span>{invitatoryAntiphon}</span>
            </div>
            <p dangerouslySetInnerHTML={{ __html:"The Lord is God, the mighty God,<br/>the great king over all the gods.<br/>He holds in his hands the depths of the earth<br/>and the highest mountains as well<br/>He made the sea; it belongs to him,<br/>the dry land, too, for it was formed by his hands."}}></p>
            <div className="h">
              <span className="r">Ant. </span>
              <span>{invitatoryAntiphon}</span>
            </div>
            <p dangerouslySetInnerHTML={{ __html:"Come, then, let us bow down and worship,<br/>bending the knee before the Lord, our maker,<br/>For he is our God and we are his people,<br/>the flock he shepherds."}}></p>
            <div className="h">
              <span className="r">Ant. </span>
              <span>{invitatoryAntiphon}</span>
            </div>
            <p dangerouslySetInnerHTML={{ __html:"Today, listen to the voice of the Lord:<br/>Do not grow stubborn, as your fathers did in the wilderness,<br/>when at Meriba and Massah they challenged me and provoked me,<br/>Although they had seen all of my works."}}></p>
            <div className="h">
              <span className="r">Ant. </span>
              <span>{invitatoryAntiphon}</span>
            </div>
            <p dangerouslySetInnerHTML={{ __html:"Forty years I endured that generation.<br/>I said, “They are a people whose hearts go astray<br/>and they do not know my ways.”<br/>So I swore in my anger,<br/>“They shall not enter into my rest.”"}}></p>
            <div className="h">
              <span className="r">Ant. </span>
              <span>{invitatoryAntiphon}</span>
            </div>
            <br/>
            {props.gloryBe}
            <br/>
            <br/>
            <div className="h">
              <span className="r">Ant. </span>
              <span>{invitatoryAntiphon}</span>
            </div>
            <br/>
      </div>
  );
};

export default HomePage;
