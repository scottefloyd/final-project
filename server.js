"use strict";
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const port = process.env.PORT || 3000;
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use("/api", routes)

//socket.on receives new messages and then calls a function to send back the same message
io.on('connection', (socket) => {
  socket.on("total-scores", message => {
    //finalScores.push(message);
    //console.log(finalScores);
    io.emit("total-scores", message);
  });
});

const finalScores = [];

// io.on('connection', (socket) => {
//   socket.on("current-scores", message => {
//     io.emit("current-scores", message);
//   });
// });

io.on('connection', (socket) => {
  socket.on("new-player", message => {
    io.emit("new-player", message);
  });
});

io.on('connection', (socket) => {
  socket.on("all-scores", message => {    
    io.emit("all-scores", message);
  });
});

io.on('connection', (socket) => {
  socket.on("game-over", message => {
    io.emit("game-over", message);
  });
});

io.on('connection', (socket) => {
  socket.on("clear-scores", message => {
    io.emit("clear-scores", message);
  });
});

io.on('connection', (socket) => {
  socket.on("load-competitors", message => {
    io.emit("load-competitors", message);
  });
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});