import React, { useState } from "react"

const Home = () => {
  const [value, setValue] = useState<string>("1")
  const [counter, setCounter] = useState<number>(0)
  return (
    <>
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
