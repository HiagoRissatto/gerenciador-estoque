import express  from "express";
import { createMovement } from "../controllers/stockMovementController.js";

const router = express.Router();

router.post("/", createMovement);

export default router;