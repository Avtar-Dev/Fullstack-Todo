const express = require("express");
const loginMiddleware = require("../middleware/loginMiddleware");
const { User, Todo } = require("../db");
const router = express.Router();

router.post("/todo", loginMiddleware, async (req, res) => {
  const title = req.body.title;
  const task = req.body.task;
  const completed = req.body.completed;

  const userId = req.userId; // ✅ Use the correct property

  //   console.log("user", req);

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
