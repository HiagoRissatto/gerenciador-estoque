import express from "express";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { allowRole } from "../middlewares/roleMiddleware.js";
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getLowStockProducts
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", allowRole(["admin", "funcionario"]), listProducts);
router.get("/estoque-minimo", allowRole(["admin", "funcionario"]), getLowStockProducts);
router.get("/:id", allowRole(["admin", "funcionario"]), getProductById);
router.post("/", adminMiddleware, createProduct);
router.put("/:id", adminMiddleware, updateProduct);
router.delete("/:id", adminMiddleware, deleteProduct);

export default router;