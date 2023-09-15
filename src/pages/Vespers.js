import { useState, useEffect } from "react";
import "./Hours.css";
import { useOutletContext } from "react-router-dom";
import { useStateWithCallbackLazy } from 'use-state-with-callback';

const Vespers = () => {
  let { selectedDate } = useOutletContext();
  const { monthNames } = useOutletContext();
  const {gloryBe} = useOutletContext();
  const {GodCome} = useOutletContext();
  const { propers } = useOutletContext();
  let {isFeastDay} = useOutletContext();
  const {setShowInvToggle} = useOutletContext();
  setShowInvToggle(true)

  let monthName = monthNames[selectedDate.getMonth()]

  const canticleOfMary = "My soul proclaims the greatness of the Lord,<br/>my spirit rejoices in God my Savior<br/>for he has looked with favor on his lowly servant.<br/><br/>From this day all generations will call me blessed:<br/>the Almighty has done great things for me,<br/>and holy is his Name.<br/><br/>He has mercy on those who fear him<br/>in every generation.<br/><br/>He has shown the strength of his arm,<br/>he has scattered the proud in their conceit.<br/><br/>He has cast down the mighty from their thrones,<br/>and has lifted up the lowly.<br/><br/>He has filled the hungry with good things,<br/>and the rich he has sent away empty.<br/><br/>He has come to the help of his servant Israel<br/>for he has remembered his promise of mercy,<br/>the promise he made to our fathers,<br/>to Abraham and his children for ever.";
  const canticleOfMarySource = "Luke 1:46-55";
  const canticleOfMarySummary = "The soul rejoices in the Lord";

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
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/${weekNumber}/${dayName}/Vespers.json`
    )
      .then((response) => response.json())
      .then((response) => setVespers(response));
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/DaysOfWeekPropers/${
        propers[dayOfYear(selectedDate) - 239]
      }/Vespers.json`
    )
      .then((response) => response.json())
      .then((response) => setProper(response));
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/FeastDays/${monthName + selectedDate.getDate()}/Vespers.json`
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

  const [vespers, setVespers] = useState([]);
  const [proper, setProper] = useState([]);
  const [feast, setFeast] = useState({});
  const [designatedAntiphon, setDesignatedAntiphon] = useStateWithCallbackLazy("")
  const [designatedPrayer, setDesignatedPrayer] = useStateWithCallbackLazy("")
  console.log(proper)


  useEffect(() => {if (feast && feast.hasOwnProperty('CanticleAntiphon')){
    setDesignatedAntiphon(feast.CanticleAntiphon)
  }
  else if(proper && proper.hasOwnProperty('CanticleAntiphon') ){
    setDesignatedAntiphon(proper.CanticleAntiphon)
  }
  else if(vespers && vespers.hasOwnProperty('CanticleAntiphon')){
    setDesignatedAntiphon(vespers.CanticleAntiphon)
  }
  else{
    setDesignatedAntiphon("empty")
  }
},[isFeastDay, selectedDate, feast, vespers, proper])

useEffect(() => {if (feast && feast.hasOwnProperty('Prayer')){
  setDesignatedPrayer(feast.Prayer)
}
else if(proper && proper.hasOwnProperty('Prayer') ){
  setDesignatedPrayer(proper.Prayer)
}
else if(vespers && vespers.hasOwnProperty('Prayer')){
  setDesignatedPrayer(vespers.Prayer)
}
else{
  setDesignatedPrayer(" ")
}
},[isFeastDay, selectedDate, feast, vespers, proper])

  while ((isFeastDay === true && feast === undefined)){
    return <div>Loading</div>
  }

  while(vespers === undefined){
    return <div>Loading</div>
  }

  console.log(vespers.Hymn)
  console.log(isFeastDay)
  return (
    
    <div className="hours">
      <h1 className="header">Vespers</h1>
      {GodCome}
      <h4 className="sacredSilence">Hymn</h4>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Hymn ? feast.Hymn : vespers.Hymn }}></p>

      <p className="r">PSALMODY</p>
      <div className="h">
        <p className="r">Ant. 1</p>
        <p>{feast && feast.Antiphon1 ? feast.Antiphon1 : vespers.Antiphon1}</p>
      </div>

      <span className="psalm">{feast && feast.Psalm1Number ? feast.Psalm1Number : vespers.Psalm1Number}</span>
      <span className="psalm">{feast && feast.Psalm1Title ? feast.Psalm1Title : vespers.Psalm1Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{feast && feast.Psalm1Summary ? feast.Psalm1Summary : vespers.Psalm1Summary}</span>
        <span>{feast && feast.Psalm1SummarySource ? feast.Psalm1SummarySource : vespers.Psalm1SummarySource}</span>
      </div>
      <p className="psalm">{feast && feast.Psalm1Numeral ? feast.Psalm1Numeral : vespers.Psalm1Numeral}</p>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Psalm1Text ? feast.Psalm1Text : vespers.Psalm1Text }}></p>
      {gloryBe}
      <p className="r">{(!feast && vespers.Psalm1Prayer !== "") || (feast && feast.Psalm1Prayer ) ? "PSALM-PRAYER" : null}</p>
      <span>{feast && feast.Psalm1Prayer ? feast.Psalm1Prayer : vespers.Psalm1Prayer}</span>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{feast && feast.Antiphon1 ? feast.Antiphon1 : vespers.Antiphon1}</p>
      </div>
      <div className="h">
        <p className="r">Ant. 2</p>
        <p>{feast && feast.Antiphon2 ? feast.Antiphon2 : vespers.Antiphon2}</p>
      </div>
      <span className="psalm">{feast && feast.Psalm2Numeral ? feast.Psalm2Numeral : vespers.Psalm2Numeral}</span>
      <span className="psalm">{feast && feast.Psalm2Number ? feast.Psalm2Number : vespers.Psalm2Number}</span>
      <span className="psalm">{feast && feast.Psalm2Title ? feast.Psalm2Title : vespers.Psalm2Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{feast && feast.Psalm2Summary ? feast.Psalm2Summary : vespers.Psalm2Summary}</span>
        <span>{feast && feast.Psalm2SummarySource ? feast.Psalm2SummarySource : vespers.Psalm2SummarySource}</span>
      </div>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Psalm2Text ? feast.Psalm2Text : vespers.Psalm2Text }}></p>
      {gloryBe}
      <p className="r">{(!feast && vespers.Psalm2Prayer !== "") || (feast && feast.Psalm2Prayer ) ? "PSALM-PRAYER" : null}</p>
      <span>{feast && feast.Psalm2Prayer ? feast.Psalm2Prayer : vespers.Psalm2Prayer}</span>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{feast && feast.Antiphon2 ? feast.Antiphon2 : vespers.Antiphon2}</p>
      </div>
      <div className="h">
        <p className="r">Ant. 3</p>
        <p>{feast && feast.Antiphon3 ? feast.Antiphon3 : vespers.Antiphon3}</p>
      </div>
      <span className="psalm">{feast && feast.Psalm3Number ? feast.Psalm3Number : vespers.Psalm3Number}</span>
      <span className="psalm">{feast && feast.Psalm3Title ? feast.Psalm3Title : vespers.Psalm3Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{feast && feast.Psalm3Summary ? feast.Psalm3Summary : vespers.Psalm3Summary}</span>
        <span>{feast && feast.Psalm3SummarySource ? feast.Psalm3SummarySource : vespers.Psalm3SummarySource}</span>
      </div>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Psalm3Text ? feast.Psalm3Text : vespers.Psalm3Text }}></p>
      {gloryBe}
      <p className="r">{(!feast && vespers.Psalm3Prayer !== "") || (feast && feast.Psalm3Prayer ) ? "PSALM-PRAYER" : null}</p>
      <span>{feast && feast.Psalm3Prayer ? feast.Psalm3Prayer : vespers.Psalm3Prayer}</span>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{feast && feast.Antiphon3 ? feast.Antiphon3 : vespers.Antiphon3}</p>
      </div>
      <div>
      <span className="r">READING</span>
      <span>{feast && feast.Reading1Source ? feast.Reading1Source : vespers.Reading1Source}</span>
      </div>
      <p dangerouslySetInnerHTML={{ __html: feast && feast.Reading1Text ? feast.Reading1Text : vespers.Reading1Text }}></p>

        <span className="sacredSilence">Sacred Silence </span>
        <span>
          (indicated by a bell) – a moment to reflect and receive in our hearts
          the full resonance of the voice of the Holy Spirit and to unite our
          personal prayer more closely with the word of God and public voice of
          the Church.
        </span>
 
        <p dangerouslySetInnerHTML={{ __html: feast && feast.SacredSilence ? feast.SacredSilence : vespers.SacredSilence }}></p>
      <div className="responsoryAndSource">
        <p className="sacredSilence">RESPONSORY</p>
        <p>{vespers.feast && feast.ResponsorySource ? feast.Responsory1Source : vespers.Responsory1Source}</p>
      </div>
      <p dangerouslySetInnerHTML={{ __html: feast && feast.Responsory1 ? feast.Responsory1 : vespers.Responsory1 }}></p>
      <span className="sacredSilence">CANTICLE OF MARY</span>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{designatedAntiphon}</p>
      </div>
      <span className="sacredSilence">{canticleOfMarySource}</span>
      <br/>
      <span className="sacredSilence">{canticleOfMarySummary}</span>
      <p dangerouslySetInnerHTML={{ __html: canticleOfMary }}></p>
      <p className="sacredSilence">INTERCESSIONS</p>
      <p dangerouslySetInnerHTML={{ __html: feast && feast.Intercessions ? feast.Intercessions : vespers.Intercessions }}></p>
      <p className="sacredSilence">PRAYER</p>
      <p dangerouslySetInnerHTML={{ __html: designatedPrayer }}></p>
    </div>
  );
};

export default Vespers;
