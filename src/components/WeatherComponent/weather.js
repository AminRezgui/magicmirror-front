import axios from "axios";
import { useEffect, useState } from "react";
import "./weather.css";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { FiSunset, FiSunrise } from "react-icons/fi";

function Weather({ weather, count }) {
  //const [weather, setWeather] = useState({});
  const [currentWeather, setcurrentWeather] = useState({});
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?appid=32d393fef395484fcf6937a1b56eb89f&q=${weather.location}&units=metric`
      )
      .then((response) => {
        console.log("weatherr : ", response.data);
        setcurrentWeather(response.data);
        const sset = new Date(parseInt(response.data.sys.sunset) * 1000);
        const srise = new Date(parseInt(response.data.sys.sunrise) * 1000);
        setSunset(sset.toTimeString().slice(0, 5));
        setSunrise(srise.toTimeString().slice(0, 5));
      })
      .catch((e) => console.log("weatherr : ", e));
  }, [weather, count]);
  console.log("weather : ", weather);
  return (
    <>
      {weather.active ? (
        <div className="Component" style={{ order: weather.position }}>
          <div className="headerr">{currentWeather?.name}</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "36px",
              }}
            >
              <span style={{ alignSelf: "end" }}>
                {currentWeather?.main?.humidity}
              </span>

              <WiHumidity size={50} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "36px",
              }}
            >
              <WiStrongWind size={50} />
              <span style={{ alignSelf: "end" }}>
                {parseInt(currentWeather?.wind?.speed) + " km/h"}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "36px",
                }}
              >
                <FiSunset size={40} />
                <span style={{ marginLeft: "5px" }}>{sunset}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "36px",
                }}
              >
                <FiSunrise size={40} />
                <span style={{ marginLeft: "5px" }}>{sunrise}</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "62px",
              }}
            >
              <span style={{ marginRight: "5px" }}>
                {parseInt(currentWeather?.main?.temp)}°
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <span style={{ fontSize: "20px" }}>
                  {parseInt(currentWeather?.main?.temp_max)}°
                </span>
                <span style={{ fontSize: "20px" }}>
                  {parseInt(currentWeather?.main?.temp_min)}°
                </span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="emptyComponent"
          style={{ order: weather.position }}
        ></div>
      )}
    </>
  );
}
export default Weather;
