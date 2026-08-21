import express from "express";

import productRoutes from "./routes/productRoutes.js";
import StockMovementRoutes from "./routes/stockMovementRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { errorHandler } from "./middlewares/erroHandler.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();

app.use(express.json());

app.use("/produtos", authMiddleware, productRoutes);
app.use("/movimentacoes", authMiddleware, StockMovementRoutes);

app.use("/usuarios", userRoutes);

app.get("/funcional", (req, res) => {
  res.send("funcionando");
});

app.use(errorHandler);

export default app;