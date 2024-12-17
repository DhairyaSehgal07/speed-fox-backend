import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("--password");
      next();
    } catch {
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const adminMiddleware = asyncHandler((req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Forbidden. Only admin users can access this resource." });
  }
});

export { protect, adminMiddleware };
