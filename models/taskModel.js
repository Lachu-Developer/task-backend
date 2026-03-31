const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
  dueDate: Date,
  userId: String
})

module.exports = mongoose.model("Task", taskSchema)