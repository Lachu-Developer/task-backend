require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(cors({
  origin: "*"
}))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API running 🚀")
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err))

const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")

app.use("/api", userRoutes)
app.use("/api", taskRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})