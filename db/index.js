const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://avtar92749:avtar92749@cluster0.swa0xjj.mongodb.net/todo-app?retryWrites=true&w=majority&appName=Cluster0"
);

const newUser = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const loginUser = mongoose.Schema({
  email: String,
  password: String,
});
const todoData = mongoose.Schema({
  title: String,
  text: String,
  doneOrnot: Boolean,
});

const Admin = mongoose.model("Admin", newUser);
const User = mongoose.model("User", loginUser);
const Todo = mongoose.model("Todo", todoData);

module.exports = { Admin, User, Todo };
