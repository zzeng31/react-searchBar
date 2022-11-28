import React, { useState } from "react";

import Button from "./Button";

import styles from "./ContentSearch.module.css";

const CourseInput = (props) => {
  const commonWords = ["and", "or", "the", "of", "to", "in", "for"];
  const [isValid, setIsValid] = useState(true);
  const [filter, setFilter] = useState([]);

  const [search, setSearch] = useState("");
  const inputChangeHandler = (event) => {
    setSearch(event.target.value);
  };
  const resetHandler = () => {
    window.location.reload(false);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    //Formating search array
    const searchArr = search
      .split(" ")
      .filter(
        (val) =>
          val.length > 0 && !commonWords.some((c) => c === val.toLowerCase())
      )
      .map((val) => val.toLowerCase());

    //Set filtered results
    const filteredSearch = props.items.filter((value) => {
      return searchArr.some((s) => {
        return (
          value.title.toLowerCase().includes(s.toLowerCase()) ||
          value.content.some((sub) => {
            return sub.subTitle.toLowerCase().includes(s.toLowerCase());
          }) ||
          value.content.some((sub) => {
            return sub.subContent.some((subContent) => {
              return subContent.toLowerCase().includes(s.toLowerCase());
            });
          })
        );
      });
    });
    console.log(`searched:${searchArr}`);
    //Sort filtered results by frequency
    const freQuencyFilteredSearch = filteredSearch
      .map((value) => {
        let matched = 0;
        //flatten whole object into string
        const content = value.title
          .toLowerCase()
          .concat(
            value.content.reduce((str, val) => {
              return str
                .concat(val.subTitle)
                .concat(
                  val.subContent.reduce((str, val) => str.concat(val), "")
                );
            }, "")
          )
          .toLowerCase();
        //count matching search words
        for (const word of searchArr) {
          if (content.includes(word)) {
            matched++;
          }
        }
        value.frequency = matched;
        return value;
      })
      .sort((a, b) => b.frequency - a.frequency); //sort with decreasing freqency
    console.log(freQuencyFilteredSearch);
    setFilter(freQuencyFilteredSearch);
    props.setDataContent(freQuencyFilteredSearch);
    props.setSearchWord(searchArr);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div
        className={`${styles["form-control"]} ${!isValid && styles.invalid}`}
      >
        <label>Type in keyword</label>
        <input type="text" onChange={inputChangeHandler} />
      </div>

      <Button type="submit">Search</Button>
      <span style={{ paddingLeft: "110px" }}>
        <Button onClick={resetHandler}>Reset</Button>
      </span>
    </form>
  );
};

export default CourseInput;
