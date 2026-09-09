import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import StockMovementRoutes from "./routes/stockMovementRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/erroHandler.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
const app = express();
app.use(express.json());

const allowedOrigins = (process.env.CORS_ORIGIN ||
  "https://gerenciador-estoque-kooo.onrender.com/")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use("/produtos", authMiddleware, productRoutes);
app.use("/movimentacoes", authMiddleware, StockMovementRoutes);
app.use("/usuarios", userRoutes);
app.get("/funcional", (req, res) => {
  res.send("funcionando");
});
app.use(errorHandler);
export default app;
