import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { AliveScope } from "react-keepalive-dom"
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AliveScope>
      <App />
    </AliveScope>
  </BrowserRouter>
)
