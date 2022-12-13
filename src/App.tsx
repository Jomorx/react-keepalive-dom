import React, { useNavigate, Route, Routes } from "react-router-dom"
import { useContext } from "react"
import { withKeepAlive } from "../keep-alive"
import CacheContext from "../keep-alive/cacheContext"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
const KHome = withKeepAlive(Home, { cacheId: "/Home", scroll: true })
const KProfile = withKeepAlive(Profile, { cacheId: "/Profile", scroll: true })
import { CacheStatus } from "../keep-alive/cache-types"

const App = () => {
  const navigate = useNavigate()
  const { dispatch } = useContext(CacheContext)
  return (
    <>
      <button onClick={() => navigate("/")}>to App</button>
      <button onClick={() => navigate("/Profile")}>to Profile</button>
      <button onClick={() => navigate("/Home")}>to Home</button>
      <hr />
      <button
        onClick={() => {
          dispatch({
            type: CacheStatus.DESTROY,
            payload: { cacheId: "/Profile" }
          })
        }}
      >
        destroy Profile
      </button>

      <button
        onClick={() => {
          dispatch({ type: CacheStatus.DESTROY, payload: { cacheId: "/Home" } })
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
