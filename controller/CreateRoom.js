const room = require("../model/room");
const createRoom = async (req, res) => {
	console.log(req.body);
	const { roomID } = req.body;
	try {
		if (roomID?.length == 0) return;
		const isExist = await room.findOne({ roomID: roomID });
		if (isExist) {
			res.send({ message: "room id already exist",status:400 });
			return;
		}
		const create = new room({
			roomID: roomID,
			userX: "Exist",
		});
		const result = await create.save();
		if (result) {
			res.send({
				message: "Room created sucessfully",
				status : 200,
			});
		}
	} catch (err) {
		console.log(err, "this is error");
		res.send({ message: err.message,status :400 });
	}
};

module.exports = {
	createRoom,
};
