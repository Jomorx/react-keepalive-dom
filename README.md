## react-keepalive-dom
使用react-keepalive-dom 配合react-router-dom缓存组件的状态
### How To Use
```bash
pnpm i react-keepalive-dom@next
```

```tsx
//in src/main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { KeepAliveProvider } from "react-keepalive-dom"
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <KeepAliveProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </KeepAliveProvider>
)
```

```tsx
// in App.tsx
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

```
```tsx
//in src/pages/Profiletsx
import React from "react"

const Profile = () => {
  const list = new Array(100).fill(0)
  console.log("render")

  return (
    <>
      <h1>Profile</h1>
      <ul style={{ height: "200px", overflowY: "scroll" }}>
        {list.map((item, index) => {
          return <li key={index}>{index}</li>
        })}
      </ul>
    </>
  )
}

export default Profile

```
```tsx
// in src/pages/Home.tsx
import React, { useState } from "react"

const Home = () => {
  const [value, setValue] = useState<string>("1")
  const [counter, setCounter] = useState<number>(0)
  return (
    <>
    <h1>Home</h1>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => setCounter(counter + parseInt(value))}>
        ADD
      </button>
      <h1>{counter}</h1>
    </>
  )
}

export default Home

```
