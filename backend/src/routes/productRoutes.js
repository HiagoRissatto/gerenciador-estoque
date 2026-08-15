import express from "express";
import { listProducts,createProduct, updateProduct, deleteProduct, getProductById } from "../controllers/productController.js";
import { getProducts } from "../services/productService.js";

const router = express.Router();

router.get("/", listProducts)
router.get("/:id",getProductById)
router.post("/", createProduct)
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;