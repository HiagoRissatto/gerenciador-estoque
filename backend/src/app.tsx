import express from "express";
import productRoutes from "./routes/productRoutes.js"
import  StockMovementRoutes  from "./routes/stockMovementRoutes.js";
import { errorHandler } from "./middlewares/erroHandler.js";

const app = express();
app.use(express.json());

//rotas products
app.use("/produtos", productRoutes);
app.get( '/funcional', (req, res) =>{
    res.send('funcionando')
})

//rotas stock
app.use("/movimentacoes", StockMovementRoutes)
app.use(errorHandler);


export default app;