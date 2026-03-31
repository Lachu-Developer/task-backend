const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const {
  createTask,
  getTasks,
  deleteTask,
  toggleTask,
  updateTask
} = require("../controllers/taskController")

router.post("/tasks", auth, createTask)
router.get("/tasks", auth, getTasks)
router.delete("/tasks/:id", auth, deleteTask)
router.put("/tasks/:id", auth, toggleTask)

// ✏️ EDIT ROUTE
router.put("/tasks/edit/:id", auth, updateTask)

module.exports = router