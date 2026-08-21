import express from "express";
import { createUserController,listUsersController,loginUserController } from "../controllers/userController.js";
import { allowRole } from "../middlewares/roleMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",authMiddleware ,allowRole(["admin"]), listUsersController);
router.post("/", createUserController);
router.post("/login", loginUserController);
export default router;