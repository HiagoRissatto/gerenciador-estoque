import express from "express";
import { listProducts,createProduct, updateProduct, deleteProduct, getProductById, getLowStockProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/", listProducts)
router.get("/estoque-minimo", getLowStockProducts)
router.get("/:id",getProductById)
router.post("/", createProduct)
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;