import { useState, useEffect } from "react";
import "./Hours.css";
import { useOutletContext } from "react-router-dom";

const Compline = () => {
  let { selectedDate } = useOutletContext();
  const { propers } = useOutletContext();
  const {gloryBe} = useOutletContext();
  const {GodCome} = useOutletContext();
  const {setShowInvToggle} = useOutletContext();
  setShowInvToggle(true)
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const canticleOfSimeon = "Lord, now you let your servant go in peace;<br/>your word has been fulfilled:<br/><br/>my own eyes have seen the salvation<br/>which you have prepared in the sight of every people:<br/><br/>a light to reveal you to the nations<br/>and the glory of your people Israel."
  const canticleAntiphon = "Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.";
  const weeks = ["Week1", "Week2", "Week3", "Week4"];
  const [weekNumber, setWeekNumber] = useState("Week1");
  let week = selectedDate.getWeek();

  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - onejan) / 86400000 + onejan.getDay()) / 7);
  };

  const dayOfYear = (date) =>
    Math.floor(
      (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );
  const [dayName, setDayName] = useState(daysOfWeek[selectedDate.getDay()]);

  useEffect(() => {
    setDayName(daysOfWeek[selectedDate.getDay()]);
  }, [selectedDate]);

  useEffect(() => {
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/${weekNumber}/${dayName}/Compline.json`
    )
      .then((response) => response.json())
      .then((response) => setCompline(response));
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/Propers/${
        propers[dayOfYear(selectedDate) - 239]
      }/Compline.json`
    )
      .then((response) => response.json())
      .then((response) => setProper(response));
  }, [selectedDate, dayName, weekNumber]);

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
  }, [selectedDate, dayName]);

  const [compline, setCompline] = useState([]);
  const [proper, setProper] = useState([])

  return (
    <div className="hours">
      <h1 className="header">Compline</h1>
      {GodCome}
      <h4 className="sacredSilence">Hymn</h4>
      <p className="text" dangerouslySetInnerHTML={{ __html: compline.Hymn }}></p>
      <p className="r">PSALMODY</p>
      <div className="h">
        <p className="r">Ant. 1</p>
        <p>{compline.Antiphon1}</p>
      </div>
      <span className="psalm">{compline.Psalm1Number}</span>
      <span className="psalm">{compline.Psalm1Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{compline.Psalm1Summary}</span>
        <span>{compline.Psalm1SummarySource}</span>
      </div>
      <p className="text" dangerouslySetInnerHTML={{ __html: compline.Psalm1Text }}></p>
      {gloryBe}
      <div className="h">
        <p className="r">Ant.</p>
        <p>{compline.Antiphon1}</p>
      </div>
      <div className="h">
        <p>{compline.Anitphon2 ? "Ant. 2" : ""}</p>
        <p>{compline.Anitphon2 ? compline.Anitphon2 : ""}</p>
      </div>
      <span>{compline.Psalm2Number ? compline.Psalm2Number : ""}</span>
      <span className="psalm">{compline.Psalm2Title ? compline.Psalm2Title : ""}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{compline.Psalm2Summary ? compline.Psalm2Summary : ""}</span>
        <span>{compline.Psalm2SummarySource ? compline.Psalm2SummarySource : ""}</span>
      </div>
      <p className="text" dangerouslySetInnerHTML={{ __html: compline.Psalm2Text }}></p>
      <span> {compline.Psalm2Text ? gloryBe : null}</span>
      <div className="h">
        <p className="r">{compline.Antiphon2 ? "Ant. " : null}</p>
        <p>{compline.Antiphon2}</p>
      </div>
      <div>
      <span className="r">READING</span>
      <span>{compline.ReadingSource}</span>
      </div>
      <p dangerouslySetInnerHTML={{ __html: compline.ReadingText }}></p>
      <div className="responsoryAndSource">
        <p className="sacredSilence">Responsory</p>
      </div>
      <p dangerouslySetInnerHTML={{ __html: compline.Responsory }}></p>
      <p className="sacredSilence">CANTICLE OF SIMEON</p>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{canticleAntiphon}</p>
      </div>
      <p dangerouslySetInnerHTML={{ __html: canticleOfSimeon }}></p>
      {gloryBe}
      <div className="h">
        <p className="r">Ant.</p>
        <p>{canticleAntiphon}</p>
      </div>
      <p className="sacredSilence">CONCLUDING PRAYER</p>
      <p dangerouslySetInnerHTML={{ __html: compline.Prayer }}></p>
    </div>
  );
};

export default Compline;