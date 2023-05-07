import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [value, setValue] = useState<string>("1")
  const [counter, setCounter] = useState<number>(0)
  const navigate = useNavigate()
  return (
    <>
    <button onClick={()=>{navigate("/profile")}}></button>
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
