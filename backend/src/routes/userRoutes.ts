import express from "express";
import {
  createUserController,
  listUsersController,
  loginUserController,
  updateUserRoleController,
  getCurrentUserController
} from "../controllers/userController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getCurrentUserController);
router.get("/", authMiddleware, adminMiddleware, listUsersController);
router.post("/",authMiddleware, adminMiddleware, createUserController);
router.post("/login", loginUserController);
router.patch("/:id/role", authMiddleware, adminMiddleware, updateUserRoleController);

export default router;