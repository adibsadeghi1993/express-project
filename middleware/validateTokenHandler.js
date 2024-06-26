const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("user is not authorized");
      }
      req.user = decoded.user;
      console.log(decoded);
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("user un authorized");
    }
  }
});

module.exports = validateToken;
