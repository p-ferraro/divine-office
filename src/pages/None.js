import { useState, useEffect, useContext } from "react";
import "./Hours.css";
import { useOutletContext } from "react-router-dom";

const None = () => {
  let { selectedDate } = useOutletContext();
  const { propers } = useOutletContext();
  const {gloryBe} = useOutletContext();
  const {GodCome} = useOutletContext()
  const {setShowInvToggle} = useOutletContext();
  setShowInvToggle(true)

  const {monthNames} = useOutletContext();

  let monthName = monthNames[selectedDate.getMonth()]

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/${weekNumber}/${dayName}/None.json`
    )
      .then((response) => response.json())
      .then((response) => setNone(response));
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/Propers/${
        propers[dayOfYear(selectedDate) - 134]
      }/None.json`
    )
      .then((response) => response.json())
      .then((response) => setProper(response));
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/FeastDays/${monthName + selectedDate.getDate()}/None.json`
    )
      .then((response) => response.json())
      .then((response) => setFeast(response));
  }, [selectedDate, dayName, weekNumber, week]);

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

  const [none, setNone] = useState([]);
  const [proper, setProper] = useState([])
  const [feast, setFeast] = useState({});

  return (
    <div className="hours">
      <h1 className="header">None</h1>
      {GodCome}
      <h4 className="sacredSilence">Hymn</h4>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Hymn ? feast.Hymn : none.Hymn }}></p>

      <p className="r">PSALMODY</p>
      <div className="h">
        <p className="r">Ant. 1</p>
        <p>{feast && feast.Antiphon1 ? feast.Antiphon1 : none.Antiphon1}</p>
      </div>
      <span className="psalm">{none.Psalm1Number}</span>
      <span className="psalm">{none.Psalm1Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{none.Psalm1Summary}</span>
        <span>{none.Psalm1SummarySource}</span>
      </div>
      <p className="text" dangerouslySetInnerHTML={{ __html: none.Psalm1Text }}></p>
      {gloryBe}
      <p className="r">{(!feast && none.Psalm1Prayer !== "") || (feast && feast.Psalm1Prayer !== "") ? "PSALM-PRAYER" : null}</p>
      <p>{none.Psalm1Prayer}</p>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{none.Antiphon1}</p>
      </div>
      <div className="h">
        <p className="r">Ant. 2</p>
        <p>{none.Antiphon2}</p>
      </div>
      <span className="psalm">{none.Psalm2Number}</span>
      <span className="psalm">{none.Psalm2Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{none.Psalm2Summary}</span>
        <span>{none.Psalm2SummarySource}</span>
      </div>
      <p className="text" dangerouslySetInnerHTML={{ __html: none.Psalm2Text }}></p>
      {gloryBe}
      <p className="r">{(!feast && none.Psalm2Prayer !== "") || (feast && feast.Psalm2Prayer !== "") ? "PSALM-PRAYER" : null}</p>
      <p>{none.Psalm2Prayer}</p>
      <div className="h">
        <p className="r">Ant. </p>
        <p>{none.Antiphon2}</p>
      </div>
      <div className="h">
        <p className="r">Ant. 3</p>
        <p>{none.Antiphon3}</p>
      </div>
      <span className="psalm">{none.Psalm3Number}</span>
      <span className="psalm">{none.Psalm3Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{none.Psalm3Summary}</span>
        <span>{none.Psalm3SummarySource}</span>
      </div>
      <p className="text" dangerouslySetInnerHTML={{ __html: none.Psalm3Text }}></p>
      {gloryBe}
      <p>{none.Psalm3Prayer}</p>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{feast && feast.Antiphon3 ? feast.Antiphon3 : none.Antiphon3}</p>
      </div>
      <div>
      <span className="r">READING</span>
      <span>{feast && feast.ReadingSource ? feast.ReadingSource : none.ReadingSource}</span>
      </div>
      <p dangerouslySetInnerHTML={{ __html: feast && feast.ReadingText ? feast.ReadingText : none.ReadingText }}></p>

        <span className="sacredSilence">Sacred Silence </span>
        <span>
          (indicated by a bell) – a moment to reflect and receive in our hearts
          the full resonance of the voice of the Holy Spirit and to unite our
          personal prayer more closely with the word of God and public voice of
          the Church.
        </span>

      <p dangerouslySetInnerHTML={{ __html: feast && feast.SacredSilence ? feast.SacredSilence : none.SacredSilence }}></p>
      <p className="sacredSilence">CONCLUDING PRAYER</p>
      <p dangerouslySetInnerHTML={{ __html: feast && feast.Prayer ? feast.Prayer : none.Prayer }}></p>
    </div>
  );
};

export default None;