const room = require("../model/room");
const joinRoom = async (req, res) => {
	console.log(req.body);
	const { roomID } = req.body;
	try {
		if (roomID?.length == 0) return;
		const isExist = await room.findOne({ roomID: roomID });
		if (!isExist) {
			res.json({ message: "room not found",status:400 });
			return;
		}
		console.log(isExist && isExist.userO == "none");
		if (isExist && isExist.userO == "none") {
			const updatedRoom = await room.updateOne(
				{ roomID: roomID },
				{ $set: { userO: "Exist" } }
			);
			if (updatedRoom) {
				res.json({ message: "user Joined",status:200 });
				return;
			}
		} else {
			res.json({ message: "room full", status: 200 });
			return;
		}
	} catch (err) {
		console.log(err, "this is error");
		res.json({ message: err.message, status: 200 });
	}
};

module.exports = {
	joinRoom,
};
