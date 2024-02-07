const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  console.log("This is auth middleware");
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(500).json({ msg: "Invalid Authentication." });

    console.log("Normal Token", token);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded)
      return res.status(500).json({ msg: "Invalid Authentication." });

    console.log("Decoded - token", decoded);
    const user = await Users.findOne({ _id: decoded.id });

    req.user = user;
    console.log("Middleware successfull");
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
