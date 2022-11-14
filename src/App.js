import React, { useState } from "react";

import ContentList from "./components/ContentList";
import ContentSearch from "./components/ContentSearch";
import Button from "./components/Button";
import "./App.css";

const App = () => {
  const data = require("./components/data.json");
  const [searchWord, setSearchWord] = useState([]);
  //console.log(data);
  const [dataContent, setDataContent] = useState(data);

  let content = <p style={{ textAlign: "center" }}>No Information found</p>;

  if (dataContent.length > 0) {
    content = (
      <ContentList
        items={dataContent}
        setDataContent={setDataContent}
        searchWord={searchWord}
      />
    );
  }

  return (
    <div>
      <section id="goal-form">
        <ContentSearch
          items={dataContent}
          setDataContent={setDataContent}
          setSearchWord={setSearchWord}
        />

      </section>

      <section id="goals">{content}</section>
    </div>
  );
};

export default App;
