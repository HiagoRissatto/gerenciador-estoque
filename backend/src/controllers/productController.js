import { getProducts, createNewProduct, updateExistingProduct, deleteExistingProduct, getProductByIdService } from "../services/productService.js"
import { productSchema } from "../schemas/productSchema.js";

export async function listProducts(req, res) {
    const products = await getProducts();
    res.send(products)
}

export async function createProduct(req, res) {
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

export async function updateProduct(req, res) {
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

export async function deleteProduct(req, res) {
    const { id } = req.params;
    const deletedProduct = await deleteExistingProduct(id);
    if (!deletedProduct) {
        return res.status(404).json({
            message: "Produto não encontrado"
        });
    }

    res.status(200).json(deletedProduct);

}

export async function getProductById(req,res) {
    const {id} = req.params;
    const product = await getProductByIdService(id);

    if(!product){
        return res.status(404).json({
            message:"Produto não encontrado"
        });
        res.status(200).json(product);
    }
    
}