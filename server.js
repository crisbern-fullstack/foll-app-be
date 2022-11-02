const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const { ChoiceSchema } = require("./Models");

require("dotenv").config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

const PORT = process.env.PORT;

io.on("connection", (socket) => {
  console.log("A user has connected!!!");

  socket.on("increment", (data) => {
    io.emit("update_value", data);
  });
});

app.get("/", async (req, res) => {
  const new_document = await ChoiceSchema.create({ name: "One" });
  return res.status(200).json({ data: new_document });
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then((response) => {
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    console.log(process.env.url);
  });
