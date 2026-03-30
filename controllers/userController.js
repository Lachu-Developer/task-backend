const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email & password required" })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = new User({ email, password: hashed })
    await user.save()

    res.json({ message: "User created" })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email & password required" })
    }

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ error: "User not found" })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: "Wrong password" })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

    res.json({ token })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}