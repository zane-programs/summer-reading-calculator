import React, { useContext } from "react";
import Swal from "sweetalert2";

// context
import SetupPageBookContext from "../../../core/context/SetupPageBookContext";

export function SetupBookControlledInput(props) {
  const { bookInState, modifyBook } = useContext(SetupPageBookContext); // the book that this input works for

  // nice wrapper for onChange functions needed by the input elements
  function onChangeModifyHandler(propertyName) {
    return function (event) {
      let bookObj = {};
      bookObj[propertyName] = event.target.value;
      try {
        modifyBook(bookObj);
      } catch (e) {
        // for now. I will make this more graceful later
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error:\n\n" + e.message,
        });
        
        event.preventDefault(); // prevent change from happening
      }
    };
  }

  return (
    <input
      type={props.type}
      defaultValue={bookInState[props.modifyProperty]}
      placeholder={props.placeholder}
      onChange={onChangeModifyHandler(props.modifyProperty)}
      aria-label={props.label || props.placeholder}
      aria-required={props.required || false}
      className={`setup-box-input_${props.modifyProperty}`}
    />
  );
}
