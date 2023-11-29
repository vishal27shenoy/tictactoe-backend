const express = require("express");
const router = express.Router();
const joinRoomController = require("../controller/JoinRoom");
router.put("/", joinRoomController.joinRoom);
module.exports = router;
