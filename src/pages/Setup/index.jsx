import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// components
import Button from "../../components/Button";

// util
import {
  SetupState,
  getPathForSetupState,
} from "../../core/util/general-util.js";

// models
import Book from "../../core/models/Book";

// context
import SetupStateContext from "../../core/context/SetupStateContext";
import ContainerContext from "../../core/context/ContainerContext";

// styles
import "./style.css";

function Setup() {
  const navigate = useNavigate();
  const { setupState, setSetupState } = useContext(SetupStateContext);
  const containerContext = useContext(ContainerContext); // container styling

  // set page title
  useEffect(() => {
    containerContext.title.setPageTitle("Setup");
  }, [containerContext.title]);

  useEffect(() => {
    if (setupState !== SetupState.SETUP_IN_PROGRESS)
      navigate(getPathForSetupState(setupState));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="setup-container" style={containerContext.containerStyle}>
      <h1 className="setup-heading">Setup</h1>
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
  );
}

export default Setup;
