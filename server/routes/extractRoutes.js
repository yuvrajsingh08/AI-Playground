const express = require("express");
const { extractText } = require("../controller/extractController");

const router = express.Router();

router.post("/", extractText);

module.exports = router;
