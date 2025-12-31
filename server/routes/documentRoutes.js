const express = require("express");
const { saveDocument } = require("../controller/documentController");

const router = express.Router();

router.post("/save", saveDocument);

module.exports = router;
