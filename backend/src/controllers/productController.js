import { getProducts, createNewProduct } from "../services/productService.js"
import { productSchema } from "../schemas/productSchema.js";


export function listProducts(req, res) {
    const products = getProducts();
    res.send(products)
}

export function createProduct(req, res) {
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

    const productCreated = createNewProduct(product);
    res.status(201).send(productCreated);
}