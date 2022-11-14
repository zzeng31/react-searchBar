import React, { useState } from "react";

import Button from "./Button";

import styles from "./ContentSearch.module.css";

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");

  const [isValid, setIsValid] = useState(true);
  const [filter, setFilter] = useState([]);
  const [match, setMatch] = useState(0);
  const [search, setSearch] = useState("");
  const inputChangeHandler = (event) => {
    setSearch(event.target.value);
    // console.log(`search:${search}`);
    // console.log(`items:`, props.items);
  };
  const resetHandler = () => {
    window.location.reload(false);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const searchArr = search.split(" ").filter((val) => val.length > 0);
    console.log("search:", searchArr);

    const filteredSearch = props.items.filter((value) => {
      return (
        searchArr.some((s) => {
          // console.log("s:" + s);
          // console.log(
          //   "title match:",
          //   value.title.toLowerCase().includes(s.toLowerCase())
          // );
          return value.title.toLowerCase().includes(s.toLowerCase());
        }) ||
        searchArr.some((s) => {
          return value.content.some((sub) => {
            // console.log("subTitle:", sub.subTitle.toLowerCase());
            // console.log(
            //   "subTitle match:",
            //   sub.subTitle.toLowerCase().includes(s.toLowerCase())
            // );
            return sub.subTitle.toLowerCase().includes(s.toLowerCase());
          });
        }) ||
        searchArr.some((s) => {
          return value.content.some((sub) => {
            return sub.subContent.some((subContent) => {
              // console.log("subContent:", subContent);
              // console.log(
              //   "subContent Matched:",
              //   subContent.toLowerCase().includes(s.toLowerCase())
              // );
              return subContent.toLowerCase().includes(s.toLowerCase());
            });
          });
        })
      );

      // value.content.some((val) =>
      //   val.subTitle.toLowerCase().includes(search.toLowerCase())
      // ) ||
      // value.content.forEach((val) => {
      //   val.subContent.some((sub) => {
      //     sub.toLowerCase().includes(search.toLowerCase());
      //   });
      // })
    });
    setFilter(filteredSearch);
    props.setDataContent(filteredSearch);
    props.setSearchWord(searchArr);
    console.log("filter", filteredSearch);
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
