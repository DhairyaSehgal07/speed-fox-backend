import express from "express";
import { protect, adminMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();
import {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
} from "../controllers/adminController.js";

router.get("/users", protect, adminMiddleware, getAllUsers);

router
  .route("/users/:id")
  .get(protect, adminMiddleware, getSingleUser)
  .put(protect, adminMiddleware, updateSingleUser)
  .delete(protect, adminMiddleware, deleteSingleUser);

export default router;
