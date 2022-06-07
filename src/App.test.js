import { render, screen } from "@testing-library/react";
import axios from "axios";
import App from "./App";
import Todo from "./components/TodoComponent/todoList";
import calculService from "./calculService";

//integration test
test("check location changed successfully", async () => {
  const weather = await axios.put(
    `http://localhost:3001/private/updateweather`,
    {
      id: 11,
      location: "Ariana, Tunisia",
      active: true,
    }
  );
  expect(weather.data.location).toBe("Ariana, Tunisia");
});

test("check fullname changed successfully", async () => {
  const user = await axios.put(`http://localhost:3001/private/editProfile`, {
    id: 54,
    fullname: "Amin Rezgui",
    avatar: "",
  }).data;
  expect(user.fullname).toBe("Amin");
});

//unit test
test("check addition function", async () => {
  const total = calculService.sum_variation(15, 30);
  expect(total).toBe(45);
});

test("check percent function", async () => {
  const total = calculService.percent(10, 50);
  expect(total).toBe("20 %");
});
