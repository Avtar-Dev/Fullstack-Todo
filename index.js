const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");

app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/todo", todoRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
