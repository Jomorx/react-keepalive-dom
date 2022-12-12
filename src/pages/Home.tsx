import React, { useState } from "react"

const Home = ({ dispatch }) => {
  const [value, setValue] = useState<string>("1")
  const [counter, setCounter] = useState<number>(0)
  return (
    <>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={(e) => setCounter(counter + parseInt(value))}>
        ADD
      </button>
      <h1>{counter}</h1>
    </>
  )
}

export default Home
