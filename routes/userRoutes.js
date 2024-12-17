import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/userController.js";

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);

export default router;
