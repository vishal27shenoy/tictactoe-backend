const {instrument} = require('@socket.io/admin-ui');
const express = require("express");
const app = express();
const http = require("http");
const port = 5000;
const cors = require("cors");
const connectDB = require("./config/databaseConnection");
const socket = require("socket.io");
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4200",
      "https://admin.socket.io/",
      "https://tictactoe-frontend-ten.vercel.app",
    ],
    methods: ["GET", "POST","PUT"],
  })
);
connectDB();
const server = http.createServer(app);
app.use("/createRoom", require("./routes/createRoomController"));
app.use("/joinRoom", require("./routes/joinRoomController"));

server.listen(port, () => {
	console.log("server started");
});




let onlineUsers = new Map();
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: [
      "https://admin.socket.io",
      "http://localhost:3000",
      "http://localhost:4200",
      "https://tictactoe-frontend-ten.vercel.app",
    ],
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("users-connect", (object) => {
    const { userId, roomId } = object;
    console.log(onlineUsers);
    socket.join(roomId);
  });

  socket.on("ongame", (obj) => {
    const { userId, index, value, turn,roomId } = obj;
    io.to(roomId).emit(roomId, {
      userId: userId,
      index: index,
      value: value,
      turn: turn,
    });
  });

  socket.on("playagain", (obj) => {
    const {roomId,turn} = obj;
    io.to(roomId).emit(roomId,{
      message : "reset",
      turn:turn
    });
  });


});

instrument(io, { auth: false });