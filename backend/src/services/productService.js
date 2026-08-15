import { findAllProducts, saveProduct } from "../repositories/productRepository.js";
export function getProducts(){
return findAllProducts();
}

export function createNewProduct(product){
    return saveProduct(product);
}