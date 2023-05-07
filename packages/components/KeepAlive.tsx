import React, { useContext } from "react"
import { AliveContext } from "../context/AliveContext"

export const KeepAlive = ({ children }) => {
  const {count} = useContext(AliveContext)
  return <>{children}
  {count}
  </>
}

