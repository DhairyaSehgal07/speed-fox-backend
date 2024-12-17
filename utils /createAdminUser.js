import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const createAdminUser = asyncHandler(async (req, res) => {
  const adminExists = await User.findOne({
    email: "superadmin007@gmail.com",
  });

  if (!adminExists) {
    await User.create({
      name: "Admin user",
      email: "superadmin007@gmail.com",
      password: "123456",
      isAdmin: true,
      companyName: "abc",
    });
    console.log("Admin user created");
  } else {
    return;
  }
});

export default createAdminUser;
