import React, { useState } from "react";

import Button from "./Button";

import styles from "./ContentSearch.module.css";

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const commonWords = ["and", "or", "the", "of"];
  const [isValid, setIsValid] = useState(true);
  const [filter, setFilter] = useState([]);
  // const [match, setMatch] = useState(0);
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

    const searchArr = search
      .split(" ")
      .filter(
        (val) =>
          val.length > 0 && !commonWords.some((c) => c === val.toLowerCase())
      );
    console.log("search:", searchArr);

    // const filteredSearch = props.items.filter((value) => {
    //   return (
    //     searchArr.some((s) => {
    //       return value.title.toLowerCase().includes(s.toLowerCase());
    //     }) ||
    //     searchArr.some((s) => {
    //       return value.content.some((sub) => {
    //         return sub.subTitle.toLowerCase().includes(s.toLowerCase());
    //       });
    //     }) ||
    //     searchArr.some((s) => {
    //       return value.content.some((sub) => {
    //         return sub.subContent.some((subContent) => {
    //           return subContent.toLowerCase().includes(s.toLowerCase());
    //         });
    //       });
    //     })
    //   );
    // });
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
