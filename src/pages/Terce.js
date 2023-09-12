import { useState, useEffect } from "react";
import "./Hours.css";
import { useOutletContext } from "react-router-dom";

const Terce = () => {
  let { selectedDate } = useOutletContext();
  const { propers } = useOutletContext();
  const {gloryBe} = useOutletContext();
  const {GodCome} = useOutletContext();
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
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/${weekNumber}/${dayName}/Terce.json`
    )
      .then((response) => response.json())
      .then((response) => setTerce(response));
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/Propers/${
        propers[dayOfYear(selectedDate) - 239]
      }/Terce.json`
    )
      .then((response) => response.json())
      .then((response) => setProper(response));
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/FeastDays/${monthName + selectedDate.getDate()}/Terce.json`
    )
      .then((response) => response.json())
      .then((response) => setFeast(response));
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

  const [terce, setTerce] = useState([]);
  const [proper, setProper] = useState([])
  const [feast, setFeast] = useState({});

  return (
    <div className="hours">
      <h1 className="header">Terce</h1>
      {GodCome}
      <h4 className="sacredSilence">Hymn</h4>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Hymn ? feast.Hymn : terce.Hymn }}></p>
      <p className="r">PSALMODY</p>
      <div className="h">
        <p className="r">Ant. 1</p>
        <p>{feast && feast.Antiphon1 ? feast.Antiphon1 : terce.Antiphon1}</p>
      </div>
      <span className="psalm">{terce.Psalm1Number}</span>
      <span className="psalm">{terce.Psalm1Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{terce.Psalm1Summary}</span>
        <span>{terce.Psalm1SummarySource}</span>
      </div>
      <p className="text" dangerouslySetInnerHTML={{ __html: terce.Psalm1Text }}></p>
      {gloryBe}
      <p className="r">{terce.Psalm1Prayer !== "" ? "PSALM-PRAYER" : null}</p>
      <p>{terce.Psalm1Prayer}</p>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{terce.Antiphon1}</p>
      </div>
      <div className="h">
        <p className="r">Ant. 2</p>
        <p>{terce.Antiphon2}</p>
      </div>
      <span className="psalm">{terce.Psalm2Number}</span>
      <span className="psalm">{terce.Psalm2Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{terce.Psalm2Summary}</span>
        <span>{terce.Psalm2SummarySource}</span>
      </div>
      <p className="text" dangerouslySetInnerHTML={{ __html: terce.Psalm2Text }}></p>
      {gloryBe}
      <p className="r">{terce.Psalm2Prayer !== "" ? "PSALM-PRAYER" : null}</p>
      <p>{terce.Psalm2Prayer}</p>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{terce.Antiphon2}</p>
      </div>
      <div className="h">
        <p className="r">Ant. 3</p>
        <p>{feast && feast.Antiphon3 ? feast.Antiphon3 : terce.Antiphon3}</p>
      </div>
      <span className="psalm">{terce.Psalm3Number}</span>
      <span className="psalm">{terce.Psalm3Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{terce.Psalm3Summary}</span>
        <span>{terce.Psalm3SummarySource}</span>
      </div>
      <p className="text" dangerouslySetInnerHTML={{ __html: terce.Psalm3Text }}></p>
      {gloryBe}
      <p className="r">{terce.Psalm3Prayer !== "" ? "PSALM-PRAYER" : null}</p>
      <p>{terce.Psalm3Prayer}</p>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{terce.Antiphon3}</p>
      </div>
      <div>
      <span className="r">READING</span>
      <span>{feast && feast.ReadingSource ? feast.ReadingSource : terce.ReadingSource}</span>
      </div>
      <span dangerouslySetInnerHTML={{ __html: feast && feast.ReadingText ? feast.ReadingText : terce.ReadingText }}></span>
      <br/>
      <br/>

        <span className="sacredSilence">Sacred Silence </span>
        <span>
          (indicated by a bell) – a moment to reflect and receive in our hearts
          the full resonance of the voice of the Holy Spirit and to unite our
          personal prayer more closely with the word of God and public voice of
          the Church.
        </span>

      <p dangerouslySetInnerHTML={{ __html: terce.SacredSilence }}></p>
      <p className="sacredSilence">CONCLUDING PRAYER</p>
      <p dangerouslySetInnerHTML={{ __html: feast && feast.Prayer ? feast.Prayer : terce.Prayer }}></p>
    </div>
  );
};

export default Terce;