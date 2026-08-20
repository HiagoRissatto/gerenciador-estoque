import pool from "../config/database.js";
import type { Product } from "../types/product.js";

export async function findAllProducts() {
    const result = await pool.query("SELECT * FROM products")
    return result.rows;
}

export async function saveProduct(product:Product) {
    const insert = await pool.query(
        "INSERT INTO products (nome, marca, quantidade, valor, estoque_minimo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
            product.nome,
            product.marca,
            product.quantidade,
            product.valor,
            product.estoque_minimo
        ]
    );
    return product;
}

export async function updateProductById(id:string, product:Product) {
    const update = await pool.query( `UPDATE products SET nome = $1, marca = $2, quantidade = $3, valor = $4, estoque_minimo = $5 WHERE id = $6 RETURNING *`,
        [
            product.nome,
            product.marca,
            product.quantidade,
            product.valor,
            product.estoque_minimo,
            id
        ]
    );

    return update.rows[0];
}

export async function deleteProductById(id:string) {
    const destroy = await pool.query(`DELETE FROM products WHERE id = $1 RETURNING *`,
        [id]
    );
    return destroy.rows[0];
    
}

export async function findProductById(id:string){
    const findProduct = await pool.query(`SELECT * FROM products WHERE id = $1`,
        [id]
    );
    return findProduct.rows[0];
}

export async function findLowStockProducts() {
    const result = await pool.query("SELECT * FROM products WHERE quantidade <= estoque_minimo");
    return result.rows;
}

