const express = require("express");
const { chatWithCharacter } = require("../controllers/chatController.js");

const router = express.Router();

router.post("/", chatWithCharacter);

module.exports = router;
