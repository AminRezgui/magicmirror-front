import axios from "axios";
import { useState, useEffect } from "react";
import "./compliments.css";

function Compliments({ userid, count }) {
  const [position, setPosition] = useState(null);
  const [compliment, setcompliment] = useState({});
  const compliments = [
    "Have a nice day",
    "You look handsome",
    "you can do it",
    "mar7bee biik ",
    "welcome to life",
    "Good moooorning",
  ];
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
      .get(`http://localhost:3001/private/getcompliments?userid=${userid}`)
      .then((response) => {
        setcompliment(response.data);
        handlePosition(response.data.position);
      });
  }, [userid, count]);
  var count = 0;
  const [value, setValue] = useState("Welcome to DMerji Mirror");
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(compliments[count++]);
      if (count >= compliments.length) count = 0;
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      {compliment.active ? (
        <div className="Component" style={{ order: position }}>
          <div className="compliment">{value}</div>
        </div>
      ) : (
        <div className="emptyComponent" style={{ order: position }}></div>
      )}
    </>
  );
}

export default Compliments;
