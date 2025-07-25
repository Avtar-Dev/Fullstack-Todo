const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User } = require("../db");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword);

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
      password: hashedPassword,
      userId: id,
    });
    res.json({
      msg: "User created successfully",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ msg: "Incorrect email or password" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({ msg: "Incorrect email or password" });
  }

  const token = jwt.sign(
    { email: user.email, userId: user.userId },
    JWT_SECRET
  );

  res.json({ token });
});

module.exports = router;
