const express = require("express");
const { analyzeText } = require("../controller/analyzeController");

const router = express.Router();

router.post("/", analyzeText);

module.exports = router;
