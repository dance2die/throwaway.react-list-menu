import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import produce from "immer";
import classNames from "classnames";

import "./styles.scss";

function reducer(state = {}, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "TOGGLE_ISCLICKED":
        Object.keys(draft).forEach(item => (draft[item].isClicked = false));
        draft[action.id].isClicked = !draft[action.id].isClicked;
        return;
      default:
        return state;
    }
  });
}

function YearsTabs() {
  const years = ["2019", "2018", "2017", "2016"];
  const [state, dispatch] = React.useReducer(reducer, {}, () =>
    years.reduce((state, year) => {
      state[year] = { isClicked: false };
      return state;
    }, {})
  );

  const toggleClicked = e => {
    e.preventDefault();
    dispatch({ type: "TOGGLE_ISCLICKED", id: e.target.id });
  };

  const getClickedClassName = year => (state[year].isClicked ? "clicked" : "");

  return (
    <nav className="menu">
      {years.map(year => (
        <li
          className={classNames("menuItem", getClickedClassName(year))}
          key={year}
          id={year}
          onClick={toggleClicked}
        >
          <span className="menuItemContent" id={year}>
            {year}
          </span>
        </li>
      ))}
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <YearsTabs />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
