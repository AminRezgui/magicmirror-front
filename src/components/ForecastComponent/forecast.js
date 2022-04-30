import "./forecast.css";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "../../App.css";
import axios from "axios";
function Forecast({ userid }) {
  const [forecast, setForecast] = useState({});
  const rows = [1, 2, 3, 4];
  const [position, setPosition] = useState(null);

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
      .get(`http://localhost:3001/private/getweatherforecast?userid=${userid}`)
      .then((response) => {
        setForecast(response.data);
        handlePosition(response.data.position);
      })
      .catch((e) => console.log("eeeeeeee", e));
  }, [userid]);

  return (
    <>
      {forecast.active ? (
        <div className="Component" style={{ order: position }}>
          <div className="header">forecast</div>
          {rows.map((day) => (
            <div className="row">
              <div>{day}</div>
              <div>{day}</div>
              <div>{day}</div>
              <div>{day}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="emptyComponent" style={{ order: position }}></div>
      )}
    </>
  );
}

export default Forecast;
