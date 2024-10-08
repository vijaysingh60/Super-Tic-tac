const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors")
const {Server} = require("socket.io");
const path = require('path')
const server = http.createServer(app);


app.use(cors());
app.use(express.json());

const io = new Server(server,{
    cors:{
        origin : "https://super-tic-tac-client.vercel.app",
        methods : ["GET","POST"],
        allowedHeaders: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"],
    },
});

const player = {};

io.on("connection",(socket)=>{
    
    if(!player.o){
        console.log("O = ",socket.id)
        player.o = socket.id;
        socket.emit("playerRole","O")
    }
    else if(!player.x){
        console.log("X = ",socket.id)
        player.x = socket.id;
        socket.emit("playerRole","X")
    }else{
        socket.emit("playerRole","")
    }
    console.log(player)

    socket.on("disconnect",()=>{
        console.log("disconnext ",socket.id)
        if(socket.id == player.o){
            delete player.o;
        }else if(socket.id == player.x){
            delete player.x;
        }
    });

    socket.on("move",(playerRole,block)=>{
        if(playerRole === "")return;
        if(playerRole === "O" && socket.id !== player.o)return;
        if(playerRole === "X" && socket.id !== player.x)return;
        console.log(playerRole + " on :  "  + block)
        io.emit("move",playerRole,block)
    })
})

app.get("/",(req,res)=>{
    res.send("heloo")
})

server.listen(3000);