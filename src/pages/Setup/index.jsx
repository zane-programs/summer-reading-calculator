import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import SetupStateContext from "../../core/context/SetupStateContext";
import {
  SetupState,
  getPathForSetupState,
} from "../../core/util/general-util.js";

import "./style.css";

function Setup() {
  const navigate = useNavigate();
  const { setupState, setSetupState } = useContext(SetupStateContext);

  useEffect(() => {
    if (setupState !== SetupState.SETUP_IN_PROGRESS)
      navigate(getPathForSetupState(setupState));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="setup-container">
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
