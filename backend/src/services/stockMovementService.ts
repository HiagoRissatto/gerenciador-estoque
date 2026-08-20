import { saveStockMovement } from "../repositories/stockMovementRepository.js";
import type { StockMovement } from "../types/stockMovement.js";
import { findProductById } from "../repositories/productRepository.js";
import { updateProductQuantity } from "../repositories/stockMovementRepository.js";
import { findAllStockMovements } from "../repositories/stockMovementRepository.js";
import pool from "../config/database.js";

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
    const client = await pool.connect();

    try{
        await client.query("BEGIN");
        await updateProductQuantity(client, movement.product_id, newQuantity);
        const movementCreated = await saveStockMovement(client, movement);
        await client.query("COMMIT");
        return movementCreated;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
    }


export async function getStockMovements() {
    return await findAllStockMovements();
}