const JWT_TOKEN = require("../config");
const jwt = require("jsonwebtoken");

function loginMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const jwtToken = token.split(" ")[1];

  try {
    const decoded = jwt.verify(jwtToken, JWT_TOKEN);
    // console.log("decode", decoded);

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json({
      msg: "You are not authenticated",
    });
  }
}

module.exports = loginMiddleware;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYXJyeUBleGFtcGxlLmNvbSIsInVzZXJJZCI6IjE3NTMzMzczMTEzMTQiLCJpYXQiOjE3NTMzMzczOTN9.v9EYVIsPje5O-PeXRX4V8Y7p0Hw37s8OPJPMbrHBejI
