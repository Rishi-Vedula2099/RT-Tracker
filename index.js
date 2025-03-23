const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require('path');
const PORT = 3000;



const app = express();
const server = http.createServer(app)
const io = socketio(server)


app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));


io.on("connection" , function (socket){
    console.log("connected");
    socket.on("send-location", function (data){
        io.emit("receive-location",{
            id:socket.id,
            ...data,
        })
    })
});

