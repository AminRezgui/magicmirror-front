import { useEffect, useState } from "react";
import AssignmentTurnedInSharpIcon from "@mui/icons-material/AssignmentTurnedInSharp";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import axios from "axios";
import "../../App.css";
/* import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"; */
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
function Todo({ userid }) {
  const [todo, setTodo] = useState({});
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
      .get(`http://localhost:3001/private/gettodolist?userid=${userid}`)
      .then((response) => {
        setTodo(response.data);
        handlePosition(response.data.position);
      });
  }, [userid]);
  console.log("bbtodo", position);
  return (
    <>
      {todo.active ? (
        <div className="Component" style={{ order: position }}>
          <h1>todo list</h1>
          <List>
            {todo.list.map((el) => (
              <ListItem
                style={{
                  padding: "unset",
                  paddingLeft: "10px",
                }}
              >
                <ListItemAvatar>
                  {el.done ? (
                    <AssignmentTurnedInSharpIcon />
                  ) : (
                    <WorkHistoryIcon />
                  )}
                </ListItemAvatar>
                <ListItemText primary={el.name} secondary={el.deadline} />
              </ListItem>
            ))}
          </List>
        </div>
      ) : (
        <div className="emptyComponent" style={{ order: position }}></div>
      )}
    </>
  );
}

export default Todo;
