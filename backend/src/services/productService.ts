import { findAllProducts, saveProduct, updateProductById, deleteProductById,findProductById, findLowStockProducts  } from "../repositories/productRepository.js";
import type { Product } from "../types/product.js";
export async function getProducts(){
return await findAllProducts();
}

export async function createNewProduct(product:Product){
    return await saveProduct(product);
}

export async function updateExistingProduct(id:string, product:Product) {
  return await updateProductById(id, product);
}

export async function deleteExistingProduct(id:string) {
  return await deleteProductById(id);
}

export async function getProductByIdService(id:string){
    return await findProductById(id);
}

export async function getLowStockProductsService() {
    return await findLowStockProducts();
}