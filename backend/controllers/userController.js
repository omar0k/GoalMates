const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Goal = require("../models/goalModel");
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
  const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
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

  // check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // check if user is verified and password is correct
  if (user.verified && (await bcrypt.compare(password, user.password))) {
    res.json({
      token: generateToken(user._id),
      _id: user.id,
      name: user.name,
      email: user.email,
      verified: user.verified,
    });
  } else if (!user.verified) {
    let token = await Token.findOne({ userId: user._id });

    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
      await sendEmail(user.email, "Verify Email", url);
    }

    return res.status(400).json({
      message: `An email has been sent to your email. Please verify your email to login.`,
    });
  } else {
    return res.status(400).json({ message: "Invalid credentials" });
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
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Invalid link" });
    }
    if (user.verified) {
      return res.status(400).send({ message: "Email verified already" });
    }
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).json({ message: "invalid link" });
    }
    await User.updateOne({ _id: user._id }, { verified: true });
    await token.remove();
    return res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    throw new Error(error);
  }
});
const getPact = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const pact = user.pact;
    res.status(200).json({ pact: pact });
  } catch (error) {
    throw new Error(error);
  }
});
const addToPact = asyncHandler(async (req, res) => {
  try {
    if (!req.body.email) {
      res.status(400).json({
        message: "Please enter email",
      });
    }
    const userAddedTo = await User.findById(req.user.id);
    const userToAdd = await User.findOne({ email: req.body.email });
    if (!userToAdd) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (userAddedTo._id === userToAdd._id) {
      return res.status(400).json({ message: "Invalid email." });
    }
    const userData = {
      _id: userToAdd._id,
      name: userToAdd.name,
      email: userToAdd.email,
    };
    if (userAddedTo.pact.some((obj) => obj.email === userToAdd.email)) {
      return res.status(400).json({ message: "User is already in pact" });
    }
    userAddedTo.pact.push(userData);
    await userAddedTo.save();
    return res
      .status(200)
      .json({ userAddedId: userToAdd._id, pact: userAddedTo.pact });
  } catch (error) {
    throw new Error(error);
  }
});

const removeFromPact = asyncHandler(async (req, res) => {
  try {
    const userRemovedFrom = await User.findById(req.user.id);
    const userToRemove = await User.findOne({ _id: req.params.memberId });
    if (!userToRemove) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (
      !userRemovedFrom.pact.some(
        (member) => member.email === userToRemove.email
      )
    ) {
      return res.status(400).json({
        message: "User not in pact",
      });
    }
    // console.log(userRemovedFrom, userToRemove);
    userRemovedFrom.pact = userRemovedFrom.pact.filter(
      (member) => member._id.toString() !== req.params.memberId
    );
    await userRemovedFrom.save();
    return res.status(200).json({
      message: "User removed from pact",
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});
const emailPact = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const goal = await Goal.findById(req.body.goalId);
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  if (!goal) {
    return res.status(400).json({
      message: "Goal not found",
    });
  }
  const pactToEmail = req.body.pactMembers;
  if (!pactToEmail) {
    return res.status(400).json({
      message: "No pact members to email",
    });
  }
  for (const pactMember of pactToEmail) {
    await sendEmail(
      pactMember.email,
      `${user.name} has just created a goal!`,

      `Hello ${pactMember.name}, hope all is well. ${user.name} has just created a goal they want to achieve and you have been chosen out of their pact to hold them accountable for completing this goal. Below are their goal's description
      
      Goal: ${goal.text}
      Created at: ${goal.createdAt}
      DueDate: ${goal.dueDate}`
    );
  }
  return res.status(200).json({ message: "Emails sent successfully" });
});
module.exports = {
  registerUser,
  loginUser,
  getMe,
  verifyUser,
  getPact,
  addToPact,
  removeFromPact,
  emailPact,
};
