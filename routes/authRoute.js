const router = require("express").Router();
const authCtrl = require("../controllers/authCtrl");

const auth = require("../middleware/authMiddleware");
const UserData = require("../models/userModel");
router.post("/register", authCtrl.register);

router.post("/login", authCtrl.login);

router.post("/logout", authCtrl.logout);

router.post("/refresh_token", authCtrl.generateAccessToken);

// GET user data endpoint
// router.get("/user-data", auth, async (req, res) => {
//   try {
//     // Retrieve user-specific data from the database
//     const userData = await UserData.findOne({ user: req.user._id });
//     if (!userData) {
//       return res.status(404).json({ message: "User data not found" });
//     }
//     // Return the user-specific data
//     res.json(userData);
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;
