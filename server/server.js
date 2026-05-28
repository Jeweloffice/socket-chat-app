const { Server } = require("socket.io");
const http = require('http');
const cors = require("cors");
const express = require("express")

const app = express();
app.use(cors());


const server = http.createServer(app);
const io = new Server(server,{cors:{
    origin:"http://localhost:3000",
    methods: ["GET","POST"],
}})

io.on("connection",(socket)=>{
    console.log("User connected",socket.id)

    socket.on("send_message",(data)=>{
        io.emit("receive_message",data)
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected",socket.id)
    })
    //server listen
    server.listen(5001,()=>{
        console.log("server running")
    })
})