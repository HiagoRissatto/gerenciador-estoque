
import { findAllProducts, saveProduct, updateProductById, deleteProductById,findProductById } from "../repositories/productRepository.js";
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

export async function getProductByIdService(id){
    return await findProductById(id);
}