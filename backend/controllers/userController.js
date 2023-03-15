const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @desc Register new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields.");
  }
  //   check if user already exists in the databse
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  const token = await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();
  const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
  await sendEmail(user.email, "Verify Email", url);
  if (user) {
    res.status(201).json({
      token: generateToken(user._id),
      _id: user.id,
      name: user.name,
      email: user.email,
      message: "An email has been sent to your email. Please verify email.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check for user email
  const user = await User.findOne({ email });

  if (
    user &&
    (await bcrypt.compare(password, user.password)) &&
    user.verified
  ) {
    res.json({
      token: generateToken(user._id),
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else if (!user.verified) {
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
      await sendEmail(user.email, "Verify Email", url);
    }
    return res.status({
      message: `An email has been sent to your ${user.email} email. Please verify email.`,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
// @desc get user data
// @route POST /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

//Generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const verifyUser = asyncHandler(async (req, res) => {
  console.log("verify");
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Invalid link" });
    }
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).send({ message: "invalid link" });
    }
    await User.updateOne({ id: user._id, verified: true });
    await token.remove();
    res.status(200).send({ message: "Email verfied successfully." });
    console.log("email verified");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});
module.exports = { registerUser, loginUser, getMe, verifyUser };
