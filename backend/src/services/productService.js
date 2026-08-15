import { findAllProducts, saveProduct, updateProductById, deleteProductById } from "../repositories/productRepository.js";
export async function getProducts(){
return await findAllProducts();
}

export async function createNewProduct(product){
    return await saveProduct(product);
}

export async function updateExistingProduct(id, product) {
  return await updateProductById(id, product);
}

export async function deleteExistingProduct(id) {
  return await deleteProductById(id);
}