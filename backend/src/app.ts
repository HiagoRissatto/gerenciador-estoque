import express from "express";
import productRoutes from "./routes/productRoutes.js"

const app = express();
app.use(express.json());
app.use("/produtos", productRoutes);
app.get( '/funcional', (req, res) =>{
    res.send('funcionando')
})


export default app;