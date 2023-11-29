const express = require("express");
const router = express.Router();
const createRoomController = require("../controller/CreateRoom");
router.post("/", createRoomController.createRoom);
module.exports = router;
