import pool from "../config/database.js";

export async function findAllProducts() {
    const result = await pool.query("SELECT * FROM products")
    return result.rows;
}

export async function saveProduct(product) {
    const insert = await pool.query(
        "INSERT INTO products (nome, marca, quantidade, valor) VALUES ($1, $2, $3, $4)",
        [
            product.nome,
            product.marca,
            product.quantidade,
            product.valor
        ]
    );
    return product;
}