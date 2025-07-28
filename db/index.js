const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://avtar92749:avtar92749@cluster0.swa0xjj.mongodb.net/todo-app?retryWrites=true&w=majority&appName=Cluster0"
);

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userId: String,
});

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  task: { type: String, required: true },
  userId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  scheduledTime: { type: Date },
  fcmToken: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = { User, Todo };
