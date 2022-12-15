import React, { useNavigate, Route, Routes } from "react-router-dom"
import { useContext } from "react"
import { withKeepAlive,CacheContext } from "react-keepalive-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
const KHome = withKeepAlive(Home, { cacheId: "/Home", scroll: true })
const KProfile = withKeepAlive(Profile, { cacheId: "/Profile", scroll: true })
const App = () => {
  const navigate = useNavigate()
  const { destroyCache } = useContext(CacheContext)

  return (
    <>
      <button onClick={() => navigate("/")}>to App</button>
      <button onClick={() => navigate("/Profile")}>to Profile</button>
      <button onClick={() => navigate("/Home")}>to Home</button>
      <hr />
      <button
        onClick={() => {
          destroyCache("/Profile")
        }}
      >
        destroy Profile
      </button>

      <button
        onClick={() => {
          destroyCache("/Home")
        }}
      >
        destroy Home
      </button>

      <hr />
      <Routes>
        <Route element={<KHome />} path="/Home"></Route>
        <Route element={<KProfile />} path="/Profile"></Route>
      </Routes>
    </>
  )
}

export default App
