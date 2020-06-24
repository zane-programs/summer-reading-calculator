import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

// context
import SetupStateContext from "../../core/context/SetupStateContext";
import ContainerContext from "../../core/context/ContainerContext";

import {
  SetupState,
  navigateToPage,
} from "../../core/util/general-util.js";

import "./style.css";

function Dashboard() {
  const navigate = useNavigate();
  const { setupState, setSetupState } = useContext(SetupStateContext);
  const { containerStyle } = useContext(ContainerContext); // container styling

  // check setup on load
  useEffect(() => {
    if (setupState !== SetupState.FINISHED_SETUP)
      navigateToPage(navigate, setupState);
  }, []);

  return (
    <div className="dashboard-container" style={containerStyle}>
      <h1 className="dashboard-heading">Dashboard</h1>
      <Button
        onClick={() => {
          setSetupState(SetupState.NOT_SETUP);
          navigateToPage(navigate, SetupState.NOT_SETUP);
        }}
      >
        Reset Setup State (0)
      </Button>
    </div>
  );
}

export default Dashboard;
