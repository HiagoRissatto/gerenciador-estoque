import express from "express";
import {allowRole} from "../middlewares/roleMiddleware.js";
import { listProducts,createProduct, updateProduct, deleteProduct, getProductById, getLowStockProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/", allowRole(["admin", "funcionario"]), listProducts)
router.get("/estoque-minimo", allowRole(["admin", "funcionario"]), getLowStockProducts)
router.get("/:id", allowRole(["admin", "funcionario"]), getProductById)
router.post("/", allowRole(["admin"]), createProduct)
router.put("/:id", allowRole(["admin"]), updateProduct);
router.delete("/:id", allowRole(["admin"]), deleteProduct);
export default router;