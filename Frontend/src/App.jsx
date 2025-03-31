import { useEffect, useState } from 'react'
import './App.css'
import io from "socket.io-client"
const socket=io.connect("http://localhost:8000")
function App() {
  const [room,setRoom]=useState("")
  const [message,setMessage]=useState("")
  const [recmsg,setRecmsg]=useState("") 

  const joinRoom=()=>{
      socket.emit("join_room",room)
  }
  const sendMessage=()=>{
      socket.emit("send_message",{message,room})
  }
  useEffect(() => {
    socket.on("recieve_message",(data)=>{
      setRecmsg(data)
    })
  }, [])
  

  return (
    <>
      <input type="text" placeholder='Enter the room id...' onChange={(e)=>setRoom(e.target.value)} />
      <button onClick={joinRoom}>join room</button>
      <input type="text" placeholder='message...' onChange={(e)=>setMessage(e.target.value)}/>
      <button onClick={sendMessage}>send message</button>
      <h1>Message</h1>
      <div>{recmsg}</div>
    </>
  )
}

export default App
