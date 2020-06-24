import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// util
import {
  getUserSetupState as getUserSetupStateLocalStorage,
  setUserSetupState as setUserSetupStateLocalStorage,
} from "./core/util/general-util.js";

// context
import SetupStateContext from "./core/context/SetupStateContext";
import ContainerContext from "./core/context/ContainerContext";

// hooks
import useWindowDimensions from "./core/hooks/window-dimensions";

// pages
import Welcome from "./pages/Welcome";
import Setup from "./pages/Setup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// styles
import "./css/App.css";

function App() {
  const [setupState, setSetupState] = useState(getUserSetupStateLocalStorage()); // setup state context
  const setupStateContextValue = { setupState, setSetupState };

  const { height, width } = useWindowDimensions(); // get window dimensions

  // update local storage & page view on setupState change
  useEffect(() => {
    setUserSetupStateLocalStorage(setupState);
  }, [setupState]);

  const appContainerPadding = parseFloat(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--app-padding")
      .trim()
      .split("px")
      .join("")
  );
  const appContainerStyle = {
    height: height - 2 * appContainerPadding,
  };

  return (
    <SetupStateContext.Provider value={setupStateContextValue}>
      <ContainerContext.Provider
        value={{
          containerStyle: appContainerStyle,
        }}
      >
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="setup" element={<Setup />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ContainerContext.Provider>
    </SetupStateContext.Provider>
  );
}

export default App;
