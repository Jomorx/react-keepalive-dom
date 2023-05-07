import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { KeepAliveProvider } from "react-keepalive-dom"
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <KeepAliveProvider>
      <App />
    </KeepAliveProvider>
  </BrowserRouter>
)
