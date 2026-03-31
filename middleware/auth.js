const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization

    if (!header) {
      return res.status(401).json({ error: "No token" })
    }

    const token = header.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.userId
    next()

  } catch (err) {
    res.status(401).json({ error: "Token expired or invalid" })
  }
}