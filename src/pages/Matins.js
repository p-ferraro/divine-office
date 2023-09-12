import { useState, useEffect } from "react";
import "./Hours.css";
import { useOutletContext } from "react-router-dom";

const Matins = () => {

  const teDeum = "TE DEUM";
  const noTeDeum = "";

  const teDeumText = "You are God: we praise you;<br/>You are the Lord: we acclaim you;<br/>You are the eternal Father:<br/>All creation worships you.<br/><br/>To you all angels, all the powers of heaven,<br/>Cherubim and Seraphim, sing in endless praise:<br/>Holy, holy, holy, Lord, God of power and might,<br/>heaven and earth are full of your glory.<br/><br/>The glorious company of apostles praise you.<br/>The noble fellowship of prophets praise you.<br/>The white-robed army of martyrs praise you.<br/><br/>Throughout the world the holy Church acclaims you:<br/>Father, of majesty unbounded,<br/>your true and only Son, worthy of all worship,<br/>and the Holy Spirit, advocate and guide.<br/><br/>You, Christ, are the King of glory,<br/>the eternal Son of the Father.<br/><br/>When you became man to set us free<br/>you did not spurn the Virgin’s womb.<br/><br/>You overcame the sting of death,<br/>and opened the kingdom of heaven to all believers.<br/><br/>You are seated at God’s right hand in glory.<br/>We believe that you will come, and be our judge.<br/><br/>Come then, Lord, and help your people,<br/>bought with the price of your own blood,<br/>and bring us with your saints<br/>to glory everlasting.<br/><br/>Save your people, Lord, and bless your inheritance.<br/>— Govern and uphold them now and always.<br/><br/>Day by day we bless you.<br/>— We praise your name for ever.<br/><br/>Keep us today, Lord, from all sin.<br/>— Have mercy on us, Lord, have mercy.<br/><br/>Lord, show us your love and mercy,<br/>— for we have put our trust in you.<br/><br/>In you, Lord, is our hope:<br/>— And we shall never hope in vain.";

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let { selectedDate } = useOutletContext();
  const { propers } = useOutletContext();
  const { GodCome } = useOutletContext();
  const { gloryBe } = useOutletContext();
  let {isFeastDay} = useOutletContext();
  const {monthNames} = useOutletContext();
  const {setShowInvToggle} = useOutletContext();
  setShowInvToggle(true)

  let monthName = monthNames[selectedDate.getMonth()]

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

  console.log(selectedDate.getWeek())
  console.log(weekNumber)

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

  useEffect(() => {
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/${weekNumber}/${dayName}/Matins.json`
    )
      .then((response) => response.json())
      .then((response) => setMatins(response));
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/DaysOfWeekPropers/${
        propers[dayOfYear(selectedDate) - 239]
      }/Matins.json`
    )
      .then((response) => response.json())
      .then((response) => setProper(response));
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/FeastDays/${monthName + selectedDate.getDate()}/Matins.json`
    )
      .then((response) => response.json())
      .then((response) => setFeast(response));
  }, [selectedDate, dayName, weekNumber]);

  const [matins, setMatins] = useState([]);
  const [proper, setProper] = useState([]);
  const [feast, setFeast] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  while ((isFeastDay === true && feast === undefined)){
    return <div>Loading</div>
  }



  return (

    <div className="hours">
      <h1 className="header">Matins</h1>
      {GodCome}
      <h4 className="sacredSilence">Hymn</h4>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Hymn ? feast.Hymn : matins.Hymn}}></p>
      <div className="h">
        <p className="r">Ant. 1</p>
        <p>{feast && feast.Antiphon1 ? feast.Antiphon1 : matins.Antiphon1}</p>
      </div>
      <span className="psalm">{feast && feast.Psalm1Number ? feast.Psalm1Number : matins.Psalm1Number}</span>
      <span className="psalm">{feast && feast.Psalm1Title ? feast.Psalm1Title : matins.Psalm1Title}</span>
      <div className="psalmSummaryDiv">
      <span className="psalmSummary">{feast && feast.Psalm1Summary ? feast.Psalm1Summary : matins.Psalm1Summary}</span>
      <span className>{feast && feast.Psalm1SummarySource ? feast.Psalm1SummarySource : matins.Psalm1SummarySource}</span>
      </div>
      <p className="psalm">{feast && feast.Psalm1Numeral ? feast.Psalm1Numeral : matins.Psalm1Numeral}</p>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Psalm1Text ? feast.Psalm1Text : matins.Psalm1Text }}></p>
      {gloryBe}
      <p className="r">{(!feast && matins.Psalm1Prayer !== "") || (feast && feast.Psalm1Prayer !== "") ? "PSALM-PRAYER" : null}</p>
      <p>{feast && feast.Psalm1Prayer ? feast.Psalm1Prayer : matins.Psalm1Prayer}</p>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{feast && feast.Antiphon1 ? feast.Antiphon1 : matins.Antiphon1}</p>
      </div>
      <div className="h">
        <p className="r">Ant. 2</p>
        <p>{feast && feast.Antiphon2 ? feast.Antiphon2 : matins.Antiphon2}</p>
      </div>
      <span className="psalm">{feast && feast.Psalm2Number ? feast.Psalm2Number : matins.Psalm2Number}</span>
      <span className="psalm">{feast && feast.Psalm2Title ? feast.Psalm2Title : matins.Psalm2Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{feast && feast.Psalm2Summary ? feast.Psalm2Summary : matins.Psalm2Summary}</span>
        <span>{feast && feast.Psalm2SummarySource ? feast.Psalm2SummarySource : matins.Psalm2SummarySource}</span>
      </div>
      <p className="psalm">{feast && feast.Psalm2Numeral ? feast.Psalm2Numeral : matins.Psalm2Numeral}</p>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Psalm2Text ? feast.Psalm2Text : matins.Psalm2Text }}></p>
      {gloryBe}
      <p>{feast && feast.Psalm2Prayer ? feast.Psalm2Prayer : matins.Psalm2Prayer}</p>
      <div className="h">
        <p className="r">Ant. </p>
        <p>{feast && feast.Antiphon2 ? feast.Antiphon2 : matins.Antiphon2}</p>
      </div>
      <div className="h">
        <p className="r">Ant. 3</p>
        <p>{feast && feast.Antiphon3 ? feast.Antiphon3 : matins.Antiphon3}</p>
      </div>
      <span className="psalm">{feast && feast.Psalm3Number ? feast.Psalm3Number : matins.Psalm3Number}</span>
      <span className="psalm">{feast && feast.Psalm3Title ? feast.Psalm3Title : matins.Psalm3Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{feast && feast.Psalm3Summary ? feast.Psalm3Summary : matins.Psalm3Summary}</span>
        <span>{feast && feast.Psalm3SummarySource ? feast.Psalm3SummarySource : matins.Psalm3SummarySource}</span>
      </div>
      <p className="psalm">{feast && feast.Psalm3Numeral ? feast.Psalm3Numeral : matins.Psalm3Numeral}</p>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Psalm3Text ? feast.Psalm3Text : matins.Psalm3Text }}></p>
      {gloryBe}
      <p className="r">Psalm-prayer</p>
      <p>{feast && feast.Psalm3Prayer ? feast.Psalm3Prayer : matins.Psalm3Prayer}</p>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{feast && feast.Antiphon3 ? feast.Antiphon3 : matins.Antiphon3}</p>
      </div>

      <span className="sacredSilence">Sacred Silence</span>
      <span>
        (indicated by a bell) – a moment to reflect and receive in our hearts
        the full resonance of the voice of the Holy Spirit and to unite our
        personal prayer more closely with the word of God and public voice of
        the Church.
      </span>

      <p dangerouslySetInnerHTML={{ __html: feast && feast.SacredSilence ? feast.SacredSilence : matins.SacredSilence }}></p>
      <p className="r">FIRST READING</p>
      <span className="header">{feast && feast.Reading1Title ? feast.Reading1Title : proper.Reading1Title}</span>
      <span> </span>
      <span className="psalm">{feast && feast.Reading1Source ? feast.Reading1Source : proper.Reading1Source}</span>
      <span className="readingSummary">{feast && feast.Reading1Summary ? feast.Reading1Summary : proper.Reading1Summary}</span>
      <p dangerouslySetInnerHTML={{ __html: feast && feast.Reading1Text ? feast.Reading1Text : proper.Reading1Text}}></p>
      <div className="responsoryAndSource">
        <span className="sacredSilence">RESPONSORY</span>
        <span dangerouslySetInnerHTML={{ __html: feast && feast.Responsory1Source ? feast.Responsory1Source : proper.Responsory1Source }}></span>
      </div>
      <br/>
      <span dangerouslySetInnerHTML={{ __html: feast && feast.Responsory1 ? feast.Responsory1 : proper.Responsory1 }}></span>
      <p className="r">SECOND READING</p>
      <span className="header">{feast && feast.Reading2Title ? feast.Reading2Title : proper.Reading2Title}</span>
      <span className="psalm">
        {feast && feast.Reading2Source ? feast.Reading2Source : proper.Reading2Source}
      </span>
      <span className="readingSummary">{feast && feast.Reading2Summary ? feast.Reading2Summary : proper.Reading2Summary}</span>
      <p dangerouslySetInnerHTML={{ __html: feast && feast.Reading2Text ? feast.Reading2Text : proper.Reading2Text }}></p>
      <div className="responsoryAndSource">
        <span className="sacredSilence">RESPONSORY</span>
        <span dangerouslySetInnerHTML={{ __html: feast && feast.Responsory2Source ? feast.Responsory2Source : proper.Responsory2Source }}></span>
      </div>
      <br/>
      <span dangerouslySetInnerHTML={{ __html: feast && feast.Responsory2 ? feast.Responsory2 : proper.Responsory2 }}></span>
      <p className="sacredSilence">
        {dayName === "Sunday" ? teDeum : noTeDeum}
      </p>
      <p dangerouslySetInnerHTML={{ __html: dayName === "Sunday" ? teDeumText : null }}></p>
      <p className="sacredSilence">CONCLUDING PRAYER</p>
      <span dangerouslySetInnerHTML={{ __html: feast && feast.Prayer ? feast.Prayer : proper.Prayer }}></span>
      <br/>
      <br/>
    </div>
  );
};

export default Matins;
