import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

// context
import SetupStateContext from "../../core/context/SetupStateContext";
import ContainerContext from "../../core/context/ContainerContext";

import {
  SetupState,
  getPathForSetupState,
} from "../../core/util/general-util.js";

import "./style.css";

function Dashboard() {
  const navigate = useNavigate();
  const { setupState, setSetupState } = useContext(SetupStateContext);
  const containerContext = useContext(ContainerContext); // container styling

  // set page title
  useEffect(() => {
    containerContext.title.setPageTitle("Dashboard");
  }, [containerContext.title]);

  // check setup on load
  useEffect(() => {
    if (setupState !== SetupState.FINISHED_SETUP)
      navigate(getPathForSetupState(setupState));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="dashboard-container" style={containerContext.containerStyle}>
      <h1 className="dashboard-heading">Dashboard</h1>
      <Button
        onClick={() => {
          setSetupState(SetupState.NOT_SETUP);
          navigate(getPathForSetupState(SetupState.NOT_SETUP));
        }}
      >
        Reset Setup State (0)
      </Button>
    </div>
  );
}

export default Dashboard;
