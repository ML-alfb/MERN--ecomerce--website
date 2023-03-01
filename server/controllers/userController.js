require("dotenv").config();
const User = require("../models/userModel");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, passwordC, email } = req.body;
  let error = false;
  //chick filed
  if (!username || !password || !passwordC || !email) {
    error = true;
    return res.status(400).json({ msg: "All inputs required" });
  }
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!mailformat.test(email)) {
    error = true;
    return res.status(400).json({ msg: "enter a valid email" });
  }
  if (!(password === passwordC)) {
    error = true;
    return res.status(400).json({ msg: "passwords do not match" });
  }
  // chick if username exists

  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    error = true;
    return res.status(400).json({ msg: "user exists" });
  }
  //chick if emai exists
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    error = true;
    return res.status(400).json({ msg: "email exists" });
  }
  if (!error) {
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    if (user) {
      return res.status(200).json({
        id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ msg: "invalid user data" });
    }
  }
});

const logInUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  //chick filed
  if (!username || !password) {
    return res.status(400).json({ msg: "All inputs required" });
  }

  // chick if username exists

  const user = await User.findOne({ username });
  console.log(user);
  if (user && (await bycrypt.compare(password, user.password))) {
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECERT
    );
    user.refreshToken = refreshToken;
    user.save();
    //send refreshToken in a cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: false,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // maxAge: 30 * 1000,
    });
    res.status(200).json({
      id: user._id,
      username: user.username,

      accessToken: generateToken({ userId: user._id, userRoles: user.roles }),
    });
  } else {
    return res.status(400).json({ msg: "invalid data" });
  }
});
const getUser = (req, res) => {
  res.status(200).json({ msg: "get user" });
};

const getNewAccessToken = asyncHandler(async (req, res) => {
  //get refreshToken from request cookies and verify if it exists and not expired
  const cookie = req.cookies;

  if (!cookie?.jwt) return res.status(401).json({ msg: " Unauthorized" });
  // verify if the user exists
  const cookieToken = cookie.jwt;

  const decoded = jwt.verify(cookieToken, process.env.REFRESH_TOKEN_SECERT);
  if (!decoded) return res.status(401).json({ msg: " unvalid token" });

  const user = await User.findById(decoded.id);
  if (!user) return res.status(401).json({ msg: "u" });

  //send a new accessToken (add roles)
  const newAccessToken = generateToken({
    userId: user._id,
    userRoles: user.roles,
  });
  return res.status(200).json({
    id: user._id,
    username: user.username,

    accessToken: newAccessToken,
  });
});

const logout = (req, res) => {
  //remove the refreshToken from the database
};

const generateToken = (user) => {
  //add roles
  return jwt.sign(
    { id: user.userId, roles: user.userRoles },
    process.env.ACCESS_TOKEN_SECERT,
    {
      expiresIn: "15m",
    }
  );
};

module.exports = {
  registerUser,
  logInUser,
  getUser,
  logout,
  getNewAccessToken,
};
