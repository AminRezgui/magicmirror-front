import { useEffect, useState } from "react";
import "./App.css";
import Calendar from "./components/CalendarComponent/calendar";
import CustomClock from "./components/ClockComponent/clock";
import Compliments from "./components/complimentsComponent/compliments";
import Forecast from "./components/ForecastComponent/forecast";
import Todo from "./components/TodoComponent/todoList";
import Weather from "./components/WeatherComponent/weather";
import io from "socket.io-client";
import Newsfeed from "./components/NewsfeedComponent/newsfeed";
import axios from "axios";
import WebFont from "webfontloader";
import { SettingsCellOutlined } from "@mui/icons-material";
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Droid Sans", "Chilanka", "Roboto"],
      },
    });
  }, []);
  const [userid, setUserid] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [count, setCount] = useState(1);
  const [clock, setclock] = useState({});
  const [weather, setWeather] = useState({});
  const [newsfeed, setNewsfeed] = useState({});
  const handlePosition = (pos) => {
    switch (pos) {
      case "top_left":
        return 1;
      case "top_center":
        return 3;
        break;
      case "top_right":
        return 5;
        break;
      case "middle_left":
        return 2;
        break;
      case "middle_center":
        return 4;
        break;
      case "middle_right":
        return 6;
        break;

      default:
        return 0;
    }
  };
  const socket = io(`http://localhost:3001`);
  socket.on("chat message", (id) => {
    console.log("Received a chat message", id);
    setUserid(parseInt(id));
    setCount(count + 1);
  });
  /* socket.on("login", (id) => {
    setUserid(parseInt(id));
    window.location.reload(false);
    console.log("Received a chat message", id);
  }); */

  useEffect(() => {
    //clock component
    axios
      .get(`http://localhost:3001/private/getclock?userid=${userid}`)
      .then((response) => {
        setclock({
          ...response.data,
          position: handlePosition(response.data.position),
        });
      })
      .catch((e) => console.log(e));
    //weather component
    axios
      .get(`http://localhost:3001/private/getweather?userid=${userid}`)
      .then((response) => {
        setWeather({
          ...response.data,
          position: handlePosition(response.data.position),
        });
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get(`http://localhost:3001/private/getnewsfeed?userid=${userid}`)
      .then((response) => {
        setNewsfeed({
          ...response.data,
        });
      })
      .catch((e) => console.log(e));
  }, [userid, count]);

  return (
    <div className="App">
      learn react
      <div className="topRow">
        <CustomClock clock={clock} />
        <Todo userid={userid} count={count} />
        <Calendar userid={userid} count={count} />
        <Weather weather={weather} count={count} />
        <Compliments userid={userid} count={count} />
        <Forecast userid={userid} count={count} />
      </div>
      <div className="buttomRow">
        <Newsfeed newsfeed={newsfeed} />
      </div>
    </div>
  );
}

export default App;
