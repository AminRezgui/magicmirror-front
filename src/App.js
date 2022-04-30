import { useState } from "react";
import "./App.css";
import Calendar from "./components/CalendarComponent/calendar";
import CustomClock from "./components/ClockComponent/clock";
import Compliments from "./components/complimentsComponent/compliments";
import Forecast from "./components/ForecastComponent/forecast";
import Todo from "./components/TodoComponent/todoList";
import Weather from "./components/WeatherComponent/weather";
import io from "socket.io-client";
function App() {
  const [userid, setUserid] = useState(null);
  const socket = io(`http://${window.location.hostname}:3001`);
  socket.on("chat message", (id) => {
    console.log("Received a chat message", id);
    setUserid(parseInt(id));
  });
  return (
    <div className="App">
      <div className="topRow">
        <CustomClock userid={userid} />
        <Todo userid={userid} />
        <Calendar userid={userid} />
        <Weather userid={userid} />
        <Compliments userid={userid} />
        <Forecast userid={userid} />
      </div>
      <div className="buttomRow"></div>
    </div>
  );
}

export default App;
