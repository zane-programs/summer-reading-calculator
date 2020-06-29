import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// util
import {
  getUserSetupState as getUserSetupStateLocalStorage,
  setUserSetupState as setUserSetupStateLocalStorage,
  updateBooksLocalStorage,
} from "./core/util/general-util.js";

// models
import { initializeBookFromJSON } from "./core/models/Book";

// context
import SetupStateContext from "./core/context/SetupStateContext";
import ContainerContext from "./core/context/ContainerContext";
import BooksContext from "./core/context/BooksContext";

// hooks
import useWindowDimensions from "./core/hooks/window-dimensions";

// pages
import Welcome from "./pages/Welcome";
import Setup from "./pages/Setup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// styles
import "./css/App.css";

// config
import * as appConfig from "./config.json";

export default function App() {
  // page title state
  const [pageTitle, setPageTitle] = useState("Loading...");
  const pageTitleSettingContextValue = { pageTitle, setPageTitle };

  // setup state
  const [setupState, setSetupState] = useState(getUserSetupStateLocalStorage()); // setup state context
  const setupStateContextValue = { setupState, setSetupState };

  // books state
  const [books, setBooks] = useState([]);
  const booksStateContextValue = { books, setBooks };

  // const { height, width } = useWindowDimensions(); // get window dimensions
  const { height } = useWindowDimensions(); // get window HEIGHT only (for now)

  // on component mount
  useEffect(() => {
    // should I make a function called getBooks and put it in ./core/util/general-util.js?
    const booksFromLocalStorage = localStorage.getItem("books");
    if (booksFromLocalStorage) {
      // books are in localStorage, so
      // initialize them as Books
      setBooks(
        JSON.parse(booksFromLocalStorage).map((book) =>
          initializeBookFromJSON(book)
        )
      );
    } else {
      // books not present
      updateBooksLocalStorage(books);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // update local storage & page view on setupState change
  useEffect(() => {
    setUserSetupStateLocalStorage(setupState);
  }, [setupState]);

  // change document title on context change
  useEffect(() => {
    document.title = `${pageTitle} | ${appConfig.short_name}`;
  }, [pageTitle]);

  // monitor book state for localStorage
  useEffect(() => {
    updateBooksLocalStorage(books);
  }, [books]);

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
          title: pageTitleSettingContextValue,
        }}
      >
        <BooksContext.Provider value={booksStateContextValue}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="setup" element={<Setup />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BooksContext.Provider>
      </ContainerContext.Provider>
    </SetupStateContext.Provider>
  );
}
