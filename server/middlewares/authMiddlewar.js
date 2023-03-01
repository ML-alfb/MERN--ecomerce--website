require("dotenv").config();
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  const headerToken = req?.headers?.authorization?.startsWith("Bearer");
  if (headerToken) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
      const user = await User.findById(decoded.id).select("-password");

      req.user = user;
      //add roles
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: "Not authorised" });
    }
  }
  if (!headerToken) {
    res.status(401).json({ msg: "Not authorised,no token" });
  }
});

module.exports = { protect };
