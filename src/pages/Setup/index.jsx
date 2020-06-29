import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// components
import Button from "../../components/Button";
import SetupBooksContainer from "./components/SetupBooksContainer";

// util
import {
  SetupState,
  getPathForSetupState,
} from "../../core/util/general-util.js";

// models
// import { Book } from "../../core/models/Book";

// context
import SetupStateContext from "../../core/context/SetupStateContext";
import ContainerContext from "../../core/context/ContainerContext";
// import BooksContext from "../../core/context/BooksContext";

// styles
import "./style.css";

export default function Setup() {
  const navigate = useNavigate();
  const { setupState, setSetupState } = useContext(SetupStateContext); // setup state
  // const { books, setBooks } = useContext(BooksContext); // books state
  const containerContext = useContext(ContainerContext); // container styling

  // on component mount:
  useEffect(() => {
    // check that we're on the right page
    if (setupState !== SetupState.SETUP_IN_PROGRESS)
      navigate(getPathForSetupState(setupState));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // set page title
  useEffect(() => {
    containerContext.title.setPageTitle("Setup");
  }, [containerContext.title]);

  return (
    <div className="setup-container" style={containerContext.containerStyle}>
      <div className="setup-container-grid">
        <h1 className="setup-heading">Setup</h1>
        <SetupBooksContainer />

        <Button
          classnames={["button-setup-next"]}
          onClick={() => {
            setSetupState(SetupState.FINISHED_SETUP);
            navigate(getPathForSetupState(SetupState.FINISHED_SETUP));
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
