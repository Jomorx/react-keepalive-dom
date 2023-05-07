import React from "react"
import { AliveContext } from "../context/AliveContext"

export const AliveScope = ({ children }) => {
  return <AliveContext.Provider value={{count:1}}>
    {children}
  </AliveContext.Provider>
}
