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
  socket.on("new-message", message => {
    io.emit("new-message", message);
  });
});


server.listen(port, () => {
  console.log(`started on port: ${port}`);
});