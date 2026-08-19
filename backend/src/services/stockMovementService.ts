import { saveStockMovement } from "../repositories/stockMovementRepository.js";
import type { StockMovement } from "../types/stockMovement.js";
import { findProductById } from "../repositories/productRepository.js";
import { updateProductQuantity } from "../repositories/stockMovementRepository.js";

export async function createStockMovement(movement: StockMovement) {
    const product = await findProductById(String(movement.product_id));

    if (!product) {
        throw new Error("Produto não encontrado");
    }

    let newQuantity = product.quantidade;

    if (movement.type === "entrada") {
        newQuantity += movement.quantity;
    } else if (movement.type === "saida") {
        if (product.quantidade < movement.quantity) {
            throw new Error("Quantidade insuficiente em estoque");
        }

        newQuantity -= movement.quantity;
    }

    await updateProductQuantity(movement.product_id, newQuantity);

    return await saveStockMovement(movement);
}