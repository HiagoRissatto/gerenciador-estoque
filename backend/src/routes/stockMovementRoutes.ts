import express  from "express";
import { createMovement, listStockMovements } from "../controllers/stockMovementController.js";

const router = express.Router();

router.post("/", createMovement);
router.get("/", listStockMovements);
export default router;