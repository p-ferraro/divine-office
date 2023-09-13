import { useState, useEffect, useContext } from "react";
import "./Hours.css";
import { useOutletContext } from "react-router-dom";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { VIEW_HEIGHT } from "@mui/x-date-pickers/internals/constants/dimensions";

const Lauds = () => {

  const CanticleOfZechariah = "Blessed be the Lord, the God of Israel;<br/>he has come to his people and set them free.<br/><br/>He has raised up for us a mighty savior,<br/>born of the house of his servant David.<br/><br/>Through his holy prophets he promised of old<br/>that he would save us from our enemies,<br/>from the hands of all who hate us.<br/><br/>He promised to show mercy to our fathers<br/>and to remember his holy covenant.<br/><br/>This was the oath he swore to our father Abraham:<br/>to set us free from the hands of our enemies,<br/>free to worship him without fear,<br/>holy and righteous in his sight<br/>all the days of our life.<br/><br/>You, my child, shall be called the prophet of the Most High;<br/>for you will go before the Lord to prepare his way,<br/>to give his people knowledge of salvation<br/>by the forgiveness of their sins.<br/><br/>In the tender compassion of our God<br/>the dawn from on high shall break upon us,<br/>to shine on those who dwell in darkness and the shadow of death,<br/>and to guide our feet into the way of peace."
  const canticleSource = "Luke 1:68-79"
  const canticleSummary = "The Messiah and his forerunner"
  const ourFather = "Our Father who art in heaven,<br/>hallowed be thy name.<br/>Thy kingdom come.<br/>Thy will be done<br/>on earth, as it is in heaven.<br/>Give us this day our daily bread,<br/>and forgive us our trespasses,<br/>as we forgive those who trespass against us,<br/>and lead us not into temptation,<br/>but deliver us from evil."
  const dismissal = "May the Lord bless us,<br/>protect us from all evil and bring us to everlasting life.<br/>— Amen."

  let { selectedDate } = useOutletContext();
  let { feastDays } = useOutletContext();
  const { propers } = useOutletContext();
  const {gloryBe} = useOutletContext();
  const {isFeastDay} = useOutletContext();
  const {GodCome} = useOutletContext();

  const {monthNames} = useOutletContext();
  const {setShowInvToggle} = useOutletContext();
  setShowInvToggle(true)
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
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/${weekNumber}/${dayName}/Lauds.json`
    )
      .then((response) => response.json())
      .then((response) => setLauds(response, ()=>{setIsFetchedLauds(true)}));
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/DaysOfWeekPropers/${
        propers[dayOfYear(selectedDate) - 239]
      }/Lauds.json`
    )
      .then((response) => response.json())
      .then((response) => setProper(response, ()=>{setIsFetchedProper(true)}));
    fetch(
      `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/FeastDays/${monthName + selectedDate.getDate()}/Lauds.json`
    )
      .then((response) => response.json())
      .then((response) => setFeast(response, ()=>{setIsFetchedFeast(true)}));
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



  const [lauds, setLauds] = useStateWithCallbackLazy({});
  const [proper, setProper] = useStateWithCallbackLazy({})
  const [feast, setFeast] = useStateWithCallbackLazy({});


  const[isFetchedLauds, setIsFetchedLauds] = useState(false)
  const[isFetchedProper, setIsFetchedProper] = useState(false)
  const[isFetchedFeast, setIsFetchedFeast] = useState(false)

  const [designatedAntiphon, setDesignatedAntiphon] = useStateWithCallbackLazy("")
  const [designatedPrayer, setDesignatedPrayer] = useStateWithCallbackLazy("")

  useEffect(() => {if (feast && feast.hasOwnProperty('CanticleAntiphon')){
    setDesignatedAntiphon(feast.CanticleAntiphon)
  }
  else if(proper && proper.hasOwnProperty('CanticleAntiphon') ){
    setDesignatedAntiphon(proper.CanticleAntiphon)
  }
  else if(lauds && lauds.hasOwnProperty('CanticleAntiphon')){
    setDesignatedAntiphon(lauds.CanticleAntiphon)
  }
  else{
    setDesignatedAntiphon("empty")
  }
},[isFeastDay, selectedDate, feast, lauds, proper])

useEffect(() => {if (feast && feast.hasOwnProperty('Prayer')){
  setDesignatedPrayer(feast.Prayer)
}
else if(proper && proper.hasOwnProperty('Prayer') ){
  setDesignatedPrayer(proper.Prayer)
}
else if(lauds && lauds.hasOwnProperty('Prayer')){
  setDesignatedPrayer(lauds.Prayer)
}
else{
  setDesignatedPrayer(" ")
}
},[isFeastDay, selectedDate, feast, lauds, proper])

console.log(selectedDate.getWeek())
console.log(weekNumber)


  while(isFetchedFeast === false && isFetchedLauds === false && isFetchedProper === false){
    return <div className="loadingDiv"></div>
  }

  return (
    <div className="hours">
      <h1 className="header">Lauds</h1>
      {GodCome}
      <h4 className="sacredSilence">Hymn</h4>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Hymn ? feast.Hymn : lauds.Hymn }}></p>
      <p className="r">PSALMODY</p>
      <div className="h">
        <p className="r">Ant. 1</p>
        <p>{feast && feast.Antiphon1 ? feast.Antiphon1 : lauds.Antiphon1}</p>
      </div>
      <span className="psalm">{feast && feast.Psalm1Number ? feast.Psalm1Number : lauds.Psalm1Number}</span>
      <span className="psalm">{feast && feast.Psalm1Title ? feast.Psalm1Title : lauds.Psalm1Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{feast && feast.Psalm1Summary ? feast.Psalm1Summary : lauds.Psalm1Summary}</span>
        <span>{feast && feast.Psalm1SummarySource ? feast.Psalm1SummarySource : lauds.Psalm1SummarySource}</span>
      </div>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Psalm1Text ? feast.Psalm1Text : lauds.Psalm1Text }}></p>
      {gloryBe}
      <p className="r">{(!feast && lauds.Psalm1Prayer !== "") || (feast && feast.Psalm1Prayer !== "") ? "PSALM-PRAYER" : null}</p>
      <p>{feast && feast.Psalm1Prayer ? feast.Psalm1Prayer : lauds.Psalm1Prayer}</p>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{feast && feast.Antiphon1 ? feast.Antiphon1 : lauds.Antiphon1}</p>
      </div>
      <div className="h">
        <p className="r">Ant. 2</p>
        <p>{feast && feast.Antiphon2 ? feast.Antiphon2 : lauds.Antiphon2}</p>
      </div>
      <span className="psalm">{feast && feast.Psalm2Number ? feast.Psalm2Number : lauds.Psalm2Number}</span>
      <span className="psalm">{feast && feast.Psalm2Title ? feast.Psalm2Title : lauds.Psalm2Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{feast && feast.Psalm2Summary ? feast.Psalm2Summary : lauds.Psalm2Summary}</span>
        <span>{feast && feast.Psalm2SummarySource ? feast.Psalm2SummarySource : lauds.Psalm2SummarySource}</span>
        </div>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Psalm2Text ? feast.Psalm2Text : lauds.Psalm2Text }}></p>
      {gloryBe}
      <div className="h">
        <p className="r">Ant.</p>
        <p>{feast && feast.Antiphon2 ? feast.Antiphon2 : lauds.Antiphon2}</p>
      </div>
      <div className="h">
        <p className="r">Ant. 3</p>
        <p>{feast && feast.Antiphon3 ? feast.Antiphon3 : lauds.Antiphon3}</p>
      </div>
      <span className="psalm">{feast && feast.Psalm3Number ? feast.Psalm3Number : lauds.Psalm3Number}</span>
      <span className="psalm">{feast && feast.Psalm3Title ? feast.Psalm3Title : lauds.Psalm3Title}</span>
      <div className="psalmSummaryDiv">
        <span className="psalmSummary">{feast && feast.Psalm3Summary ? feast.Psalm3Summary : lauds.Psalm3Summary}</span>
        <span>{feast && feast.Psalm3SummarySource ? feast.Psalm3SummarySource : lauds.Psalm3SummarySource}</span>
      </div>
      <p className="text" dangerouslySetInnerHTML={{ __html: feast && feast.Psalm3Text ? feast.Psalm3Text : lauds.Psalm3Text }}></p>
      {gloryBe}
      <p className="r">{(!feast && lauds.Psalm3Prayer !== "") || (feast && feast.Psalm3Prayer) ? "PSALM-PRAYER" : null}</p>
      <p>{feast && feast.Psalm3Prayer ? feast.Psalm3Prayer : lauds.Psalm3Prayer}</p>
      <div className="h">
        <p className="r">Ant.</p>
        <p>{feast && feast.Antiphon3 ? feast.Antiphon3 : lauds.Antiphon3}</p>
      </div>
      <div>
      <span className="r">READING</span>
      <span>{feast && feast.Reading1Source ? feast.Reading1Source : lauds.Reading1Source}</span>
      </div>
      <p dangerouslySetInnerHTML={{ __html: feast && feast.Reading1Text ? feast.Reading1Text : lauds.Reading1Text }}></p>

        <span className="sacredSilence">Sacred Silence </span>
        <span>
          (indicated by a bell) – a moment to reflect and receive in our hearts
          the full resonance of the voice of the Holy Spirit and to unite our
          personal prayer more closely with the word of God and public voice of
          the Church.
        </span>

      <p>{feast && feast.SacredSilence ? feast.SacredSilence : lauds.SacredSilence}</p>

        <p className="sacredSilence">Responsory</p>
        <span>{feast && feast.Responsory1Source ? feast.Responsory1Source : lauds.Responsory1Source}</span>

      <span dangerouslySetInnerHTML={{ __html: feast && feast.Responsory ? feast.Responsory : lauds.Responsory }}></span>
      <p className="sacredSilence">CANTICLE OF ZECHARIAH</p>
      <div className="h">
        <span className="r">Ant.</span>
        <span>{designatedAntiphon}</span>
      </div>
      <p className="sacredSilence">{canticleSource}</p>
      <p className="sacredSilence">{canticleSummary}</p>
      <p dangerouslySetInnerHTML={{ __html: CanticleOfZechariah }}></p>
      {gloryBe}
      <br/>
      <br/>
      <div className="h">
        <span className="r">Ant.</span>
        <span>{designatedAntiphon}</span>
      </div>
      <p className="sacredSilence">INTERCESSIONS</p>
      <p dangerouslySetInnerHTML={{ __html: feast && feast.Intercessions ? feast.Intercessions : lauds.Intercessions }}></p>
      <p dangerouslySetInnerHTML={{ __html: ourFather }}></p>
      <p className="sacredSilence">CONCLUDING PRAYER</p>
      <p dangerouslySetInnerHTML={{ __html: designatedPrayer }}></p>
      <p className="sacredSilence">Dismissal</p>
      <p dangerouslySetInnerHTML={{ __html: dismissal }}></p>
    </div>
  );
};

export default Lauds;
