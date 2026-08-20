import type { StockMovement } from "../types/stockMovement.js";
import pool from "../config/database.js"
import type {PoolClient} from "pg"


export async function saveStockMovement(client: PoolClient, movement: StockMovement) {
    const insert = await client.query(
        "INSERT INTO stock_movements (product_id,type,quantity) VALUES ($1, $2, $3) RETURNING *",[
            movement.product_id,
            movement.type,
            movement.quantity
        ]
    );
    return insert.rows[0]
}

export async function updateProductQuantity(client: PoolClient, productId: number, newQuantity: number) {
    const update = await client.query(
        "UPDATE products SET quantidade = $1 WHERE id = $2 RETURNING *",[
            newQuantity,
            productId
        ]
    );
    return update.rows[0]
}

export async function findAllStockMovements() {
    const result = await pool.query("SELECT * FROM stock_movements ORDER BY created_at DESC");
    return result.rows;
}