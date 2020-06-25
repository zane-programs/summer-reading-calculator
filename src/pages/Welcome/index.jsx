import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

// context
import SetupStateContext from "../../core/context/SetupStateContext";
import ContainerContext from "../../core/context/ContainerContext";

import { SetupState, getPathForSetupState } from "../../core/util/general-util";

import "./style.css";

function Welcome() {
  const navigate = useNavigate();
  const { setupState, setSetupState } = useContext(SetupStateContext); // setup state
  const containerContext = useContext(ContainerContext); // container styling

  // set page title
  useEffect(() => {
    containerContext.title.setPageTitle("Welcome");
  }, [containerContext.title]);

  useEffect(() => {
    if (setupState !== SetupState.NOT_SETUP)
      navigate(getPathForSetupState(setupState));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="welcome-container" style={containerContext.containerStyle}>
      <h1 className="welcome-heading">Reading Calculator</h1>
      <p className="welcome-explanation">
        Use this calculator to set smart goals for your reading.
      </p>
      <Button
        classnames={["button-welcome"]}
        onClick={() => {
          setSetupState(SetupState.SETUP_IN_PROGRESS);
          navigate(getPathForSetupState(SetupState.SETUP_IN_PROGRESS));
        }}
      >
        Get Started
      </Button>
    </div>
  );
}

export default Welcome;
