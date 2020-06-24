import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

// context
import SetupStateContext from "../../core/context/SetupStateContext";
import ContainerContext from "../../core/context/ContainerContext";

import {
  SetupState,
  navigateToPage,
} from "../../core/util/general-util";

import "./style.css";

function Welcome() {
  const navigate = useNavigate();
  const { setupState, setSetupState } = useContext(SetupStateContext); // setup state
  const { containerStyle } = useContext(ContainerContext); // container styling

  useEffect(() => {
    if (setupState !== SetupState.NOT_SETUP) navigateToPage(navigate, setupState);
  }, []);

  return (
    <div className="welcome-container" style={containerStyle}>
      <h1 className="welcome-heading">Reading Calculator</h1>
      <p className="welcome-explanation">
        Use this calculator to set smart goals for your reading.
      </p>
      <Button
        classnames={["button-welcome"]}
        onClick={() => {
          setSetupState(SetupState.SETUP_IN_PROGRESS);
          navigateToPage(navigate, SetupState.SETUP_IN_PROGRESS);
        }}
      >
        Get Started
      </Button>
    </div>
  );
}

export default Welcome;
