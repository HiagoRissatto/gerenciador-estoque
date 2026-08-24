import express from "express";
import { createUserController,listUsersController,loginUserController, updateUserRoleController,getCurrentUserController } from "../controllers/userController.js";
import { allowRole } from "../middlewares/roleMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware,getCurrentUserController)
router.get("/",authMiddleware ,allowRole(["admin"]), listUsersController);
router.post("/", createUserController);
router.post("/login", loginUserController);
router.patch("/:id/role", authMiddleware, allowRole(["admin"]), updateUserRoleController);
export default router;