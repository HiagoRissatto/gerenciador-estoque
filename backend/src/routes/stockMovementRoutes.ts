import express  from "express";
import { allowRole } from "../middlewares/roleMiddleware.js";
import { createMovement, listStockMovements } from "../controllers/stockMovementController.js";

const router = express.Router();

router.post("/", allowRole(["admin", "funcionario"]), createMovement);
router.get("/", allowRole(["admin", "funcionario"]), listStockMovements);
export default router;