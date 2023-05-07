import React, { useState } from "react"

const Input = () => {
  const [inputVal,setInputVal] = useState("")
  return <>
  <input type="text" value={inputVal} onChange={(e)=>setInputVal(e.target.value)}/></>
}

export default Input
