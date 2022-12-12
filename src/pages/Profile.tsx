import React from "react"

const Profile = () => {
  const list = new Array(100).fill(0)
  console.log("render")

  return (
    <ul style={{ height: "200px", overflowY: "scroll" }}>
      {list.map((item, index) => {
        return <li key={index}>{index}</li>
      })}
    </ul>
  )
}

export default Profile
