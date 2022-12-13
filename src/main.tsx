import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { KeepAliveProvider } from "../keep-alive"
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <KeepAliveProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </KeepAliveProvider>
)
