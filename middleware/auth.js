//Middleware is just a function that has access to request and response cycle and request and response object, so everytime we hit an end point we can fireoff this middleware and we just want to check if ther is a token in header

const jwt = require("jsonwebtoken");
const config = require("config");

// Next means move on to the next piece of middleware
module.exports = function (req, res, next) {
  // Get token from header
  //   "x-auth-token" that the key to the token inside the header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token is not valid",
    });
  }
};
