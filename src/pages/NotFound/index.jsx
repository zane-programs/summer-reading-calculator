import React, { useContext } from "react";
import { Link } from "react-router-dom";

function Setup() {
  return (
    <>
      <h1>Not Found</h1>
      <p>
        The page you're looking for does not exist.{" "}
        <Link to="/">Click here</Link> to return to home.
      </p>
    </>
  );
}

export default Setup;