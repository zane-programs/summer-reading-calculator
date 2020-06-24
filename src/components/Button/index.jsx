import React from "react";

import "./style.css";

export default function Button(props) {
  let classNamesArr = props.classnames || [];
  let buttonClassNames = (classNamesArr.length > 0) ? " " + classNamesArr.join(" ") : "";
  return (
    <button className={`button${buttonClassNames}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
