const room = require("../model/room");
const joinRoom = async (req, res) => {
	console.log(req.body);
	const { roomID } = req.body;
	try {
		if (roomID?.length == 0) return;
		const isExist = await room.findOne({ roomID: roomID });
		if (!isExist) {
			res.status(400).send({ message: "room not found" });
			return;
		}
		console.log(isExist && isExist.userO == "none");
		if (isExist && isExist.userO == "none") {
			const updatedRoom = await room.updateOne(
				{ roomID: roomID },
				{ $set: { userO: "Exist" } }
			);
			if (updatedRoom) {
				res.status(200).send({ message: "user Joined" });
				return;
			}
		} else {
			res.status(200).send({ message: "room full" });
			return;
		}
	} catch (err) {
		console.log(err, "this is error");
		res.status(400).send({ message: err.message });
	}
};

module.exports = {
	joinRoom,
};
