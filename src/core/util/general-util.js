const SetupState = {
  NOT_SETUP: 0,
  SETUP_IN_PROGRESS: 1,
  FINISHED_SETUP: 2,
};

const setUserSetupState = (state) =>
  localStorage.setItem("readingSetupState", state.toString());

const getUserSetupState = () => {
  let currentSetupState = localStorage.getItem("readingSetupState");
  if (currentSetupState === null) {
    // no setup state yet
    setUserSetupState(0);
  }
  return parseInt(currentSetupState);
};

const navigateToPage = (navigate, setupState) => {
  let pathToNavigate;
  if (setupState === SetupState.NOT_SETUP) {
    // not setup yet
    pathToNavigate = "/";
  } else if (setupState === SetupState.SETUP_IN_PROGRESS) {
    // setup in progress
    pathToNavigate = "/setup";
  } else if (setupState === SetupState.FINISHED_SETUP) {
    // finished setup
    pathToNavigate = "/dashboard";
  }
  navigate(pathToNavigate);
};

// const navigateToCorrectPage = navigate => navigateToPage(navigate, getUserSetupState());

export {
  SetupState,
  setUserSetupState,
  getUserSetupState,
  navigateToPage,
  // navigateToCorrectPage,
};
