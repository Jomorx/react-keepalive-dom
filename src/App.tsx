import React, { useNavigate, Route, Routes } from "react-router-dom"
import { KeepAliveProvider, withKeepAlive } from "./keep-alive"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
const KHome = withKeepAlive(Home, { cacheId: "/Home", scroll: true })
const KProfile = withKeepAlive(Profile, { cacheId: "/Profile", scroll: true })
const App = () => {
  const navigate = useNavigate()
  return (
    <KeepAliveProvider>
      <button onClick={() => navigate("/")}>to App</button>
      <button onClick={() => navigate("/Profile")}>to Profile</button>
      <button onClick={() => navigate("/Home")}>to Home</button>
      <hr />
      <hr />
      <Routes>
        <Route element={<KHome />} path="/Home"></Route>
        <Route element={<KProfile />} path="/Profile"></Route>
      </Routes>
    </KeepAliveProvider>
  )
}

export default App
