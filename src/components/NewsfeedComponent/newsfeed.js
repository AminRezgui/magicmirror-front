import { useEffect, useState } from "react";
import AssignmentTurnedInSharpIcon from "@mui/icons-material/AssignmentTurnedInSharp";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import axios from "axios";
import "../../App.css";
import "./newsfeed.css";
function Newsfeed({ newsfeed }) {
  const [allNews, setAllNews] = useState([]);

  const getnewsfeed = async () => {
    let promises = [];
    let news = [];
    for (let i = 0; i < newsfeed?.feeds?.length; i++) {
      const element = newsfeed.feeds[i];
      promises.push(
        axios
          .get(
            `https://newsapi.org/v2/top-headlines?country=${element.country}&category=${element.category}&apiKey=635d7cfd64f24528ac417256c8cef301`
          )
          .then((response) => {
            news = allNews.concat(response.data.articles);
            setAllNews(news);
          })
      );
    }
    await Promise.all(promises).then(() => {});
  };
  useEffect(() => {
    getnewsfeed();
    console.log("newsfeed");
  }, [newsfeed.id]);

  var count = 0;
  const [value, setValue] = useState({ title: "Mirror" });
  useEffect(() => {
    const interval = setInterval(() => {
      setValue({ ...allNews[count++] });
      if (count >= allNews.length) count = 0;
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [newsfeed.id]);
  console.log("newsfeed : ", allNews);
  return (
    <>
      {newsfeed.active ? (
        <>
          {newsfeed.feeds.length > 0 ? (
            <>
              <div className="title">
                <p>{value.title}</p>
              </div>
              <div className="description">
                <p>{value.description}</p>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Newsfeed;
