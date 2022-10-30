const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

const PORT = 4000;

io.on("connection", (socket) => {
  console.log("A user has connected!!!");

  socket.on("increment", (data) => {
    io.emit("update_value", data);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
