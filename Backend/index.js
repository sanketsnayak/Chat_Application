import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
const app=express()

app.use(cors())

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{

    socket.on("join_room",(data)=>{
        socket.join(data)
    })

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("recieve_message",data.message)
    })
})

server.listen(8000,()=>{
    console.log("server is running on port 8000")
})