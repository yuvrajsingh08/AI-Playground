const express = require("express");
const { uploadPDF } = require("../controller/uploadController");
const { upload } = require("../utils/mutler");

const router = express.Router();

router.post("/", upload.single("file"), uploadPDF);

module.exports = router;
