const express = require("express");
const loginMiddleware = require("../middleware/loginMiddleware");
const { Todo } = require("../db");
const router = express.Router();

// Upload Todo
router.post("/post-todo", loginMiddleware, async (req, res) => {
  const title = req.body.title;
  const task = req.body.task;
  const completed = req.body.completed;

  const userId = req.userId;

  const newTodo = await Todo.create({
    title,
    task,
    completed,
    userId,
  });

  res.json({
    msg: "Todo created successfully",
    todo: newTodo,
    userId: userId,
  });
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
router.put("/put-todo/:todoId", loginMiddleware, async (req, res) => {
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

    const { title, task, completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, task, completed },
      { new: true }
    );

    res.json({ msg: "Todo updated successfully", todo: updatedTodo });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
