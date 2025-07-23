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

    // ✅ Attach decoded user info (like userId or email) to req.user
    req.userId = decoded.userId;
    console.log(decoded);

    next();
  } catch (err) {
    return res.status(403).json({
      msg: "You are not authenticated",
    });
  }
}

module.exports = loginMiddleware;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF2dGFyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzUzMjU5MDA5fQ.6lum_73czx25kVxxqsdJ7Y798_gdNTk9EQJq8MZK6Lg
