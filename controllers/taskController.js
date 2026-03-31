const Task = require("../models/taskModel")

// CREATE
exports.createTask = async (req, res) => {
  try {
    const { title, dueDate } = req.body

    if (!title) {
      return res.status(400).json({ error: "Title required" })
    }

    const task = new Task({
      title,
      dueDate,
      userId: req.userId
    })

    await task.save()
    res.json(task)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId })
  res.json(tasks)
}

// DELETE
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
}

// TOGGLE
exports.toggleTask = async (req, res) => {
  const task = await Task.findById(req.params.id)
  task.completed = !task.completed
  await task.save()
  res.json(task)
}

// ✏️ EDIT TASK
exports.updateTask = async (req, res) => {
  try {
    const { title, dueDate } = req.body

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, dueDate },
      { new: true }
    )

    res.json(task)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}