import "./calendar.css";
import { useState, useEffect } from "react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import "../../App.css";
import axios from "axios";

function Calendar({ userid }) {
  const [holidays, setholidays] = useState([]);
  const rows = [1, 2, 3, 4];
  const [position, setPosition] = useState(null);
  const [calendar, setCalendar] = useState({});

  const handlePosition = (pos) => {
    switch (pos) {
      case "top_left":
        setPosition(1);
        break;
      case "top_center":
        setPosition(3);
        break;
      case "top_right":
        setPosition(5);
        break;
      case "middle_left":
        setPosition(2);
        break;
      case "middle_center":
        setPosition(4);
        break;
      case "middle_right":
        setPosition(6);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3001/private/getcalendar?userid=${userid}`)
      .then((response) => {
        setCalendar(response.data);
        handlePosition(response.data.position);
      })
      .catch((e) => console.log("eeeeeeee", e));
  }, [userid]);
  /* useEffect(() => {
    axios
      .get(
        "https://holidayapi.com/v1/holidays?pretty&country=TN&year=2021&key=824f73c7-bd5b-43dc-a379-d82878f2317d"
      )
      .then((response) => setholidays(response.data.holidays.slice(5, 12)))
      .catch((e) => console.log("test error : ", e));
  }, []); */

  /*  useEffect(() => {
    axios
      .get("http://www.officeholidays.com/ics/tunisia", {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  }, []);
  console.log(holidays); */
  return (
    <>
      {true ? (
        <div className="Component" style={{ order: position }}>
          <div className="calendarHeader">Tunisia Holidays</div>
          {holidays.map((el) => (
            <div className="dayrow">
              <div className="col">
                <EventAvailableIcon />
              </div>
              <div className="col">{el.name}</div>
              <div id="date">{el.date}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="emptyComponent" style={{ order: position }}></div>
      )}
    </>
  );
}

export default Calendar;
