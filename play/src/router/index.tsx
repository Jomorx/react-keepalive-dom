import { RouteObject } from "react-router-dom"
import Input from "../pages/Input"
import React from "react"
import { KeepAlive } from "react-keepalive-dom"
const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <KeepAlive>
        <Input />
      </KeepAlive>
    )
  }
]
export default routes
