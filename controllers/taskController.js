const Task = require("../models/taskModel")

exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      userId: req.userId
    })
    await task.save()
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId })
  res.json(tasks)
}

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
}

exports.toggleTask = async (req, res) => {
  const task = await Task.findById(req.params.id)
  task.completed = !task.completed
  await task.save()
  res.json(task)
}