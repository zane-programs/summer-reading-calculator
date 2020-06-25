import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import ContainerContext from "../../core/context/ContainerContext";

function Setup() {
  const containerContext = useContext(ContainerContext); // container styling
  const { pathname } = useLocation();

  // set page title
  useEffect(() => {
    containerContext.title.setPageTitle("Not Found");
  }, [containerContext.title]);

  return (
    <>
      <h1>Not Found</h1>
      <p>
        The page you're looking (<strong>{pathname}</strong>) for does not exist.{" "}
        <Link to="/">Click here</Link> to return to home.
      </p>
    </>
  );
}

export default Setup;
