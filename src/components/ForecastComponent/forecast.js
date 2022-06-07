import "./forecast.css";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "../../App.css";
import axios from "axios";
import ariana from "../../assets/icons/ariana.png";
import paris from "../../assets/icons/paris.png";
import madrid from "../../assets/icons/madrid.png";

function Forecast({ userid, count }) {
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
      .catch((e) => console.log(e));
  }, [userid, count]);
  console.log("azertyu : ", forecast);

  return (
    <>
      {forecast.active ? (
        <div className="Component" style={{ order: position, padding: 0 }}>
          {forecast.location === "Ariana, Tunisia" && (
            <img height="250px" width="250px" src={ariana} />
          )}
          {forecast.location === "Madrid, Spain" && (
            <img height="250px" width="250px" src={madrid} />
          )}
          {forecast.location === "Paris, France" && (
            <img height="250px" width="250px" src={paris} />
          )}
        </div>
      ) : (
        <div className="emptyComponent" style={{ order: position }}></div>
      )}
    </>
  );
}

export default Forecast;
