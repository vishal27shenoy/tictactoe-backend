const room = require("../model/room");
const createRoom = async (req, res) => {
	console.log(req.body);
	const { roomID } = req.body;
	try {
		if (roomID?.length == 0) return;
		const isExist = await room.findOne({ roomID: roomID });
		if (isExist) {
			res.status(400).send({ message: "room id already exist" });
			return;
		}
		const create = new room({
			roomID: roomID,
			userX: "Exist",
		});
		const result = await create.save();
		if (result) {
			res.status(200).send({
				message: "Room created sucessfully",
			});
		}
	} catch (err) {
		console.log(err, "this is error");
		res.status(400).send({ message: err.message });
	}
};

module.exports = {
	createRoom,
};
