import axios from "axios";
import { useEffect, useState } from "react";

function Weather({ userid }) {
  const [position, setPosition] = useState(null);
  const [weather, setWeather] = useState({});
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
      .get(`http://localhost:3001/private/getweather?userid=${userid}`)
      .then((response) => {
        setWeather(response.data);
        handlePosition(response.data.position);
      })
      .catch((e) => console.log("eeeeeeee", e));
  }, [userid]);
  return (
    <>
      {weather.active ? (
        <div className="Component" style={{ order: position }}>
          <h1>weather</h1>
        </div>
      ) : (
        <div className="emptyComponent" style={{ order: position }}></div>
      )}
    </>
  );
}
export default Weather;
