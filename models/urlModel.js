// models/Url.js
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  user: { type: mongoose.Types.ObjectId, ref: "user" },
});

const Url = mongoose.model("url", urlSchema);

module.exports = Url;
