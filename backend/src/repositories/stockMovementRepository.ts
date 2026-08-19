import type { StockMovement } from "../types/stockMovement.js";
import pool from "../config/database.js"

export async function saveStockMovement(movement: StockMovement) {
    const insert = await pool.query(
        "INSERT INTO stock_movements (product_id,type,quantity) VALUES ($1, $2, $3)",[
            movement.product_id,
            movement.type,
            movement.quantity
        ]
    );
    return insert.rows[0]
}

export async function updateProductQuantity(productId: number, newQuantity: number) {
    const update = await pool.query(
        "UPDATE products SET quantidade = $1 WHERE id = $2 RETURNING *",[
            newQuantity,
            productId
        ]
    );
    return update.rows[0]
}