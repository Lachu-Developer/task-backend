const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
)

// PROFILE
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.userId).select("-password")
  res.json(user)
}

