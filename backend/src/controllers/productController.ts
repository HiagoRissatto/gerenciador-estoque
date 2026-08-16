import { getProducts, createNewProduct, updateExistingProduct, deleteExistingProduct, getProductByIdService } from "../services/productService.js"
import { productSchema } from "../schemas/productSchema.js";
import type { Request,Response } from "express";
 type ProductParams = {
        id:string
    }
export async function listProducts(req:Request,res:Response) {
    const products = await getProducts();
    res.send(products)
}

export async function createProduct(req:Request,res:Response) {
    const result = productSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.issues.map((issue) => {
            return {
                field: issue.path[0],
                message: issue.message
            };
        });

        return res.status(400).json({
            message: "Dados inválidos",
            errors
        });
    }

    const product = result.data;

    const productCreated = await createNewProduct(product);
    res.status(201).send(productCreated);
}

export async function updateProduct(req:Request<ProductParams>,res:Response) {
    const { id } = req.params;
   

    const result = productSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.issues.map((issue) => {
            return {
                field: issue.path[0],
                message: issue.message
            };
        });

        return res.status(400).json({
            message: "Dados inválidos",
            errors
        });
    }
    const updatedProduct = await updateExistingProduct(id, result.data);
    if (!updatedProduct) {
        return res.status(404).json({
            message: "Produto não encontrado"
        });
    }
    res.status(200).json(updatedProduct);
}

export async function deleteProduct(req:Request<ProductParams>,res:Response) {
    const { id } = req.params;
    const deletedProduct = await deleteExistingProduct(id);
    if (!deletedProduct) {
        return res.status(404).json({
            message: "Produto não encontrado"
        });
    }

    res.status(200).json(deletedProduct);

}

export async function getProductById(req:Request<ProductParams>,res:Response) {
    const {id} = req.params;
    const product = await getProductByIdService(id);

    if(!product){
        return res.status(404).json({
            message:"Produto não encontrado"
        });
    }
    res.status(200).json(product);
    
}