import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils /generateToken.js";
//express async handler will allow us to use
// async await and not have everything wrapped
// around in a try catch

//@desc registers a new user
//@route POST/api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, companyName } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    companyName,
    isAdmin: false,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      status: "Success",
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      companyName: user.companyName,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc authenticates a user
//@route POST/api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      companyName: user.companyName,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc logs out a user
//@route POST /api/users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

//@desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    companyName: req.user.companyName,
  };
  res.status(200).json(user);
});

//@desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.companyName = req.body.companyName || user.companyName;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      compnayName: updatedUser.companyName,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Update user profile
// route PUT /api/users/profile
// @access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    await user.deleteOne().exec(); // Execute the deletion
    res.status(200).json({ message: "User deleted from db" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
