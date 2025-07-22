const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const PORT = 3000;

// Middleware
// We use cors (Cross-Origin Resource Sharing) in a Node.js/Express backend to allow your frontend (like React, Next.js, or any client) to make HTTP requests to your backend from a different domain or port.
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
