import express from "express";
import { createUserController,loginUserController } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUserController);
router.post("/login", loginUserController);
export default router;