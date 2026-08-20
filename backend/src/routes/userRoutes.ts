import express from "express";
import { createUserController } from "../controllers/userController.js";

const router = express.Router();

router.post("/cadastroUsuario", createUserController);

export default router;