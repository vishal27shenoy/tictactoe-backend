const express = require("express");
const app = express();
const http = require("http");
const port = 6000;
const cors = require("cors");
const connectDB = require("./config/databaseConnection");
const socket = require("socket.io");
app.use(express.json());
app.use(
	cors({
		origin: "*",
	})
);
connectDB();
const server = http.createServer(app);
app.use("/createRoom", require("./routes/createRoomController"));
app.use("/joinRoom", require("./routes/joinRoomController"));

server.listen(port, () => {
	console.log("server started");
});

const io = socket(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "PUT"],
		credentials: false,
	},
});
let onlineUsers = new Map();
io.on("connection", (socket) => {
	console.log(socket.id,"user connected");

	socket.on("user-connect", (obj) => {
		const { userId, roomId } = obj;
		console.log(obj,"from user connect")
		if(userId){
			onlineUsers.set(userId, roomId);
			console.log(onlineUsers,"frm map");
			socket.join(onlineUsers.get(userId));
		}
	});	


	socket.on("ongame", (obj) => {
		const { userId, index, value,turn } = obj;
		// console.log(onlineUsers.get(userId),userId ,"testing");
		io.to(onlineUsers.get(userId)).emit(onlineUsers.get(userId), {
      	userId:userId,
		index:index,
		value:value,
		turn:turn
    });
		
	});
});
