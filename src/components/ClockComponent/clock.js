import React, { useEffect, useState } from "react";
import AnalogClock from "analog-clock-react";
import axios from "axios";
import "../../App.css";

function CustomClock({ clock }) {
  const [value, setValue] = useState(new Date());
  //const [clock, setclock] = useState({});
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
  /*   useEffect(() => {
    axios
      .get(`http://localhost:3001/private/getclock?userid=${userid}`)
      .then((response) => {
        setclock(response.data);
        handlePosition(response.data.position);
      })
      .catch((e) => console.log(e));
  }, [userid]); */
  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  let options = {
    width: "200px",
    border: true,
    borderColor: "white",
    baseColor: "#000000",
    centerColor: "white",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "red",
      minute: "#ffffff",
      hour: "#ffffff",
    },
  };
  return (
    <>
      {clock.active ? (
        <div className="Component" style={{ order: clock.position }}>
          {clock.isdigital ? (
            <div style={{ padding: "30px", textAlign: "center" }}>
              <h1>{value.toTimeString().slice(0, 8)}</h1>
              <h2>{value.toDateString()}</h2>
            </div>
          ) : (
            <div style={{ padding: "30px" }}>
              <AnalogClock {...options} />
            </div>
          )}
        </div>
      ) : (
        <div className="emptyComponent" style={{ order: position }}></div>
      )}
    </>
  );
}

export default CustomClock;
