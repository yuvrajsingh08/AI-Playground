const express = require("express");
const { extractText } = require("../controllers/extractController");

const router = express.Router();

router.post("/", extractText);

module.exports = router;
