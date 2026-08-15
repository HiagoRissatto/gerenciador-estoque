import { findAllProducts, saveProduct } from "../repositories/productRepository.js";
export async function getProducts(){
return await findAllProducts();
}

export async function createNewProduct(product){
    return await saveProduct(product);
}