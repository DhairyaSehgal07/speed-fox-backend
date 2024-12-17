import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//@desc gets all registered users
//@route GET/api/admin/users
//@access Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } else {
    res.status(409).json({
      status: "Fail",
      message: "No user found",
    });
  }
});

//@desc gets single user by id
//@route GET/api/admin/users/:id
//@access Admin
const getSingleUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (user) {
    res.status(200).json({
      status: "Success",
      data: user,
    });
  } else {
    res.status(404).json({
      status: "Fail",
      message: "User not found",
    });
  }
});

//@desc update single user by id
//@route PUT/api/admin/users/:id
//@access Admin
const updateSingleUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Delete single user by id
//@route DELETE/api/admin/users/:id
//@access Admin
const deleteSingleUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (user) {
    await user.deleteOne().exec(); // Execute the deletion
    res.status(200).json({ message: "User deleted from db via admin" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

export { getAllUsers, getSingleUser, updateSingleUser, deleteSingleUser };
