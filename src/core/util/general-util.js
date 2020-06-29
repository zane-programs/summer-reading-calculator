export const SetupState = {
  NOT_SETUP: 0,
  SETUP_IN_PROGRESS: 1,
  FINISHED_SETUP: 2,
};

// pages for setup process purposes
const AppPages = [
  {
    path: "/",
    setupState: SetupState.NOT_SETUP,
  },
  {
    path: "/setup",
    setupState: SetupState.SETUP_IN_PROGRESS,
  },
  {
    path: "/dashboard",
    setupState: SetupState.FINISHED_SETUP,
  },
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

export const getPathForSetupState = (givenSetupState) => {
  let setupState = givenSetupState;
  if (isNaN(setupState) || typeof setupState !== "number") {
    setUserSetupState(0);
    setupState = 0;
  }
  const selectedPage = AppPages.find((page) => page.setupState === setupState);
  if (!selectedPage)
    throw new Error(
      `Requested page could not found (with setupState ${setupState})`
    );
  return selectedPage.path;
};

export const updateBooksLocalStorage = (books) =>
  localStorage.setItem("books", JSON.stringify(books));

export const isInteger = (value) => /^\d+$/.test(value);

export const datesAreSameDay = (date1, date2) => {
  // set dates at same time of day (12 AM)
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  // compare dates' times
  return date1.getTime() === date2.getTime();
};

export const dateHappenedBefore = (beforeDate, afterDate) => {
  // set dates at same time of day (12 AM)
  beforeDate.setHours(0, 0, 0, 0);
  afterDate.setHours(0, 0, 0, 0);
  // compare dates' times
  return beforeDate.getTime() < afterDate.getTime();
};
