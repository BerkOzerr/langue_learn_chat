const express = require("express");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const guestRouter = require("./routes/guestRouter.js");

const app = express();

app.use(cors());

app.use("/guest", guestRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
  },
});

// io.on("connection")

const PORT = process.env.SERVER_PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is runnig on ${PORT}`);
});
