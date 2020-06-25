export const SetupState = {
  NOT_SETUP: 0,
  SETUP_IN_PROGRESS: 1,
  FINISHED_SETUP: 2,
};

// pages for setup process purposes
const AppPages = [
  {
    path: "/",
    setupState: SetupState.NOT_SETUP
  },
  {
    path: "/setup",
    setupState: SetupState.SETUP_IN_PROGRESS
  },
  {
    path: "/dashboard",
    setupState: SetupState.FINISHED_SETUP
  }
];

export const setUserSetupState = (state) =>
  localStorage.setItem("readingSetupState", state.toString());

export const getUserSetupState = () => {
  let currentSetupState = localStorage.getItem("readingSetupState");
  if (currentSetupState === null) {
    // no setup state yet
    setUserSetupState(0);
  }
  return parseInt(currentSetupState);
};

export const getPathForSetupState = givenSetupState => {
  let setupState = givenSetupState;
  if (isNaN(setupState) || typeof setupState !== "number") {
    setUserSetupState(0);
    setupState = 0;
  }
  const selectedPage = AppPages.find(page => page.setupState === setupState);
  if (!selectedPage)
    throw new Error(`Requested page could not found (with setupState ${setupState})`);
  return selectedPage.path;
};

// const navigateToPage = (navigate, setupState) => {
//   let pathToNavigate;
//   if (setupState === SetupState.NOT_SETUP) {
//     // not setup yet
//     pathToNavigate = "/";
//   } else if (setupState === SetupState.SETUP_IN_PROGRESS) {
//     // setup in progress
//     pathToNavigate = "/setup";
//   } else if (setupState === SetupState.FINISHED_SETUP) {
//     // finished setup
//     pathToNavigate = "/dashboard";
//   }
//   navigate(pathToNavigate);
// };

// const navigateToCorrectPage = navigate => navigateToPage(navigate, getUserSetupState());

// export {
//   SetupState,
//   getPathForSetupState,
//   setUserSetupState,
//   getUserSetupState,
//   // navigateToCorrectPage,
// };
