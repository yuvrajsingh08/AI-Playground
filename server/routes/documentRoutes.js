const express = require("express");
const { saveDocument } = require("../controllers/documentController");

const router = express.Router();

router.post("/save", saveDocument);

module.exports = router;
