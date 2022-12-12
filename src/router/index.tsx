import React, { RouteObject } from "react-router-dom"
import Home from "@/pages/Home"
import Profile from "@/pages/Profile"
import { withKeepAlive } from "@/keep-alive"
const KHome = withKeepAlive(Home, { cacheId: "/Home", scroll: true })
const KProfile = withKeepAlive(Profile, { cacheId: "/Profile", scroll: true })

const routes: RouteObject[] = [
  {
    path: "/Home",
    element: <KHome />
  },
  {
    path: "/Profile",
    element: <KProfile />
  }
]

export default routes
