// Will be deleting this soon. Was using to test react-router-dom
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import "./css/App.css";

function Home() {
  return <div>Home</div>;
}

function Profile() {
  let { profileName } = useParams();
  return <h1>{profileName}'s Profile</h1>;
}

function Dash() {
  const [ipAddr, setIpAddr] = useState("loading");
  const [isLoading, setLoadingState] = useState(false);

  useEffect(() => {
    async function getIp() {
      setLoadingState(true); // start loading
      let testReq = await fetch("https://httpbin.org/get");
      let testResp = await testReq.json();
      setIpAddr(testResp.origin);
      setLoadingState(false); // not loading anymore
    }
    getIp();
  }, []);

  let ipInfo = isLoading ? "Loading..." : `Your IP is ${ipAddr}`;

  return (
    <>
      <h1>Dashboard</h1>
      <p>{ipInfo}</p>
    </>
  );
}

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="dashboard">Dashboard</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dash />} />
        <Route path="profile/:profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
