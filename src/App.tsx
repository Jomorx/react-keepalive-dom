import React, { useContext } from "react";
import { useNavigate, useRoutes, Route, Routes } from "react-router-dom";
import { KeepAliveProvider, withKeepAlive } from "./keep-alive";
import CacheContext from "./keep-alive/cacheContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import routes from "./router";
const KHome = withKeepAlive(Home, { cacheId: "/Home", scroll: true });
const KProfile = withKeepAlive(Profile, { cacheId: "/Profile", scroll: true });
const App = () => {
  const navigate = useNavigate();
  return (
    <KeepAliveProvider>
      <button onClick={(e) => navigate("/")}>to App</button>
      <button onClick={(e) => navigate("/Profile")}>to Profile</button>
      <button onClick={(e) => navigate("/Home")}>to Home</button>
      <hr />
      <hr />
      <Routes>
        <Route element={<KHome />} path="/Home"></Route>
        <Route element={<KProfile />} path="/Profile"></Route>
      </Routes>
    </KeepAliveProvider>
  );
};

export default App;

