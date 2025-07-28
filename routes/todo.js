const express = require("express");
const loginMiddleware = require("../middleware/loginMiddleware");
const { Todo } = require("../db");
const router = express.Router();

// Upload Todo
router.post("/post-todo", loginMiddleware, async (req, res) => {
  const { title, task, completed, scheduledTime, fcmToken } = req.body;
  const userId = req.userId;

  try {
    const newTodo = await Todo.create({
      title,
      task,
      completed,
      scheduledTime: scheduledTime ? new Date(scheduledTime) : null,
      fcmToken,
      userId,
    });

    res.json({
      msg: "Todo created successfully",
      todo: newTodo,
      userId,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ msg: "Failed to create todo", error });
  }
});

module.exports = router;

// Get Todo
router.get("/get-todo", loginMiddleware, async (req, res) => {
  const userId = req.userId;

  const allTodos = await Todo.find({ userId });
  res.json({
    todos: allTodos,
  });
});

// Delete Todo
router.delete("/delete-todo/:todoId", loginMiddleware, async (req, res) => {
  const todoId = req.params.todoId;
  const userId = req.userId;

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.userId !== userId) {
      return res.status(403).json({ msg: "You are not authorized" });
    }
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    res.json({ msg: "Todo deleted successfully", todo: deletedTodo });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Update todo
router.put("/edit-todo/:todoId", loginMiddleware, async (req, res) => {
  const todoId = req.params.todoId;
  const userId = req.userId;

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.userId !== userId) {
      return res.status(403).json({ msg: "You are not authorized" });
    }

    const { title, task, completed, scheduledTime } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, task, completed, scheduledTime },
      { new: true }
    );

    res.json({ msg: "Todo updated successfully", todo: updatedTodo });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// toggle api
router.put("/toggle/:id", loginMiddleware, async (req, res) => {
  const todoId = req.params.id;
  const userId = req.userId;

  try {
    const todo = await Todo.findOne({ _id: todoId, userId });

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found or unauthorized" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json({ msg: "Todo completion status updated", todo });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
