import "./styles.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faQuoteLeft);

export default function App() {
  var colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#8a8975",
    "#77B1A9",
    "#73A857"
  ];
  const serverUrl = "https://type.fit/api/quotes";

  const [quote, setQuote] = useState("");

  useEffect(() => {
    getNewQuote();
  }, []);

  function getNewQuote() {
    fetch(serverUrl)
      .then((res) => res.json())
      .then((data) => {
        let random = Math.floor(Math.random() * data.length);
        setQuote(data[random]);
      });
  }

  let random = Math.floor(Math.random() * colors.length);

  let style = {
    backgroundColor: colors[random],
    color: colors[random]
  };

  return (
    <div className="App" style={style}>
      <div id="quote-box">
        <div id="quote-text">
          <FontAwesomeIcon icon={faQuoteLeft} id="icon" />
          <p
            id="text"
            style={{
              fontSize: `${toString(quote.text).length > 170 ? "16px" : ""}`
            }}
          >
            {quote.text}
          </p>
        </div>
        <div id="author"> - {quote.author} </div>
        <div>
          <button
            id="new-quote"
            style={{ backgroundColor: colors[random] }}
            onClick={getNewQuote}
          >
            New quote
          </button>
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${quote.text}%20-${quote.author}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Tweet this quote!"
          >
            <FontAwesomeIcon
              icon={["fab", "twitter"]}
              id="twitter"
              style={{ backgroundColor: colors[random] }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
