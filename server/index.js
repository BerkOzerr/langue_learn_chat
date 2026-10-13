const express = require("express");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const guestRouter = require("./routes/guestRouter.js");
const roomRouter = require("./routes/roomRouter.js");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/guest", guestRouter);
app.use("/room", roomRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Kullanici bağlandi", socket.id);
  socket.on("createRoom", (data) => {
    console.log("room", data);
    socket.emit("room-aply", "Room Kaydi başariyla alindi.");
  });
});

const PORT = process.env.SERVER_PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is runnig on ${PORT}`);
});
