import React, { useState } from "react";

import Item from "./Item";

import Highlighter from "react-highlight-words";
import "./ContentList.module.css";

const ContentList = (props) => {
  return (
    <ul className="goal-list">
      {props.items.map((data, index) => (
        <Item key={index} id={index}>
          <Highlighter
            searchWords={props.searchWord}
            autoEscape={true}
            textToHighlight={data.title}
          ></Highlighter>
          <br />
          ----------------------------------------------------
          <br />
          {data.ppt}
          <br />
          ----------------------------------------------------
          {data.content.map((value, index) => {
            return (
              <Item key={index} id={index}>
                <Highlighter
                  searchWords={props.searchWord}
                  autoEscape={true}
                  textToHighlight={value.subTitle}
                ></Highlighter>
                <br />
                {value?.subContent.map((value, index) => {
                  return (
                    <p key={index} id={index}>
                      {index + 1}:
                      {
                        <Highlighter
                          searchWords={props.searchWord}
                          autoEscape={true}
                          textToHighlight={value}
                        ></Highlighter>
                      }
                    </p>
                  );
                })}
              </Item>
            );
          })}
          <br />
          {data.image.length > 0 &&
            data.image.map((value, index) => {
              return (
                <img
                  key={index}
                  style={{ width: "100%" }}
                  src={process.env.PUBLIC_URL + value.url}
                ></img>
              );
            })}
        </Item>
      ))}
    </ul>
  );
};

export default ContentList;
