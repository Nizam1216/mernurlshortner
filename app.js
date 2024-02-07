// app.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieparser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieparser());

// MongoDB Connection
const URI = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/urlshortener";
mongoose.connect(URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api", require("./routes/urlRoutes"));
app.get("/", async (req, res) => {
  res.send({ msg: "Check Route" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
