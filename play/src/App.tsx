import { useRoutes } from "react-router-dom"
import routes from "./router"
import React from "react"
const App = () => {
  return <>{useRoutes(routes)}</>
}

export default App
