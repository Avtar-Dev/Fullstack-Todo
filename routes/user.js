const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User } = require("../db");

router.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const id = Date.now();

  const checkUser = await User.findOne({
    email,
  });

  if (checkUser) {
    res.json({
      msg: "User already exists",
    });
  } else {
    await User.create({
      name: name,
      email: email,
      password: password,
      userId: id,
    });
    res.json({
      msg: "User created successfully",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  console.log("user", user);

  if (user) {
    const token = jwt.sign(
      { email: user.email, userId: user.userId },
      JWT_SECRET
    );
    res.json({ token });
  } else {
    res.status(411).json({
      msg: "Incorrect email or password",
    });
  }
});

module.exports = router;

// const saltRounds = 10;
// const hashedPassword = await bcrypt.hash("mypassword123", saltRounds);

//   const isMatch = await bcrypt.compare(password, user.password);
