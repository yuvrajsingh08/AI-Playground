const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const uploadRoutes = require("./routes/uploadRoutes");
const extractRoutes = require("./routes/extractRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");
const documentRoutes = require("./routes/documentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// // Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/extract", extractRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/document", documentRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
