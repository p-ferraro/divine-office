import homeImage from "../images/FeastDays/StPeterClaver.png";
import "./Hours.css";
import { useOutletContext } from "react-router-dom";
import ImageCatalog from "../components/ImageCatalog";
import { useEffect, useState } from "react";

const Home = () => {

    const {setShowInvToggle} = useOutletContext();
    const {selectedDate} = useOutletContext()
    const {monthNames} = useOutletContext();
    const {isFeastDay} = useOutletContext();

    const [memorialText, setMemorialtext] = useState("");


    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const [dayName, setDayName] = useState(daysOfWeek[selectedDate.getDay()]);

    setShowInvToggle(false)

    const dayOfYear = (date) =>
    Math.floor(
      (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );


    let monthName = monthNames[selectedDate.getMonth()]
console.log(isFeastDay)
    useEffect(() => {
      if (isFeastDay === true){
      fetch(
        `https://summorum-pontificum-default-rtdb.firebaseio.com/DivineOffice/FeastDays/${monthName + selectedDate.getDate()}/Memorial.json`
      )
        .then((response) => response.json())
        .then((response) => setMemorialtext(response));
      }},[selectedDate, dayName, isFeastDay])

  return (
    <>
  <div className="hours">
    <img
      className="homeImage"
      src={ImageCatalog[dayOfYear(selectedDate) - 248].actualImage}
      width="400"
      height="400"
      alt="Nativity of Blessed Virgin"
    />
  </div>
  <div className="hours" >
  <p style={{textAlign:"center"}}>{memorialText}</p>
    <h3 style={{color:"red"}}>What is the Divine Office?</h3>
    <p>
      The Divine Office, also known as the Liturgy of the Hours, is a daily
      pilgrimage of prayer that invites you to sanctify each day through
      structured moments of devotion, scripture, and contemplation. Rooted in
      the heart of Catholic tradition, this centuries-old practice offers a
      profound way to deepen your communion with God.
    </p>
  <h3 style={{color:"red"}}>How Does the Divine Office Work?</h3>
    <p>
      The Divine Office unfolds through various "hours" or prayer times
      throughout the day:
    </p>
    <ol>
      <li>
        Morning Prayer (Lauds): Commence your day by offering praise and
        gratitude to God through psalms, hymns, and scripture readings. It's a
        spiritual sunrise, illuminating your path with God's grace.
      </li>

      <li>
        Midmorning Prayer (Terce): Pause and connect with God amidst your daily
        duties with this brief yet meaningful prayer of reflection and praise.
      </li>

      <li>
        Midday Prayer (Sext): Seek God's presence and guidance as you navigate
        the activities of the day.
      </li>

      <li>
        Afternoon Prayer (None): Find solace and renewal in the afternoon,
        grounding yourself in prayer and scripture.
      </li>

      <li>
        Evening Prayer (Vespers): As the day gently concludes, gather to offer
        thanksgiving and contemplation before the approaching night.
      </li>

      <li>
        Night Prayer (Compline): Entrust yourself to God's loving care and
        protection before you rest, with this peaceful and reassuring prayer.
      </li>
    </ol>
    </div>
    </>
  )
};
export default Home;
