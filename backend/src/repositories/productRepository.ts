import pool from "../config/database.js";
import type { Product } from "../types/product.js";

export async function findAllProducts() {
    const result = await pool.query("SELECT * FROM products")
    return result.rows;
}

export async function saveProduct(product:Product) {
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

export async function updateProductById(id:string, product:Product) {
    const update = await pool.query( `UPDATE products SET nome = $1, marca = $2, quantidade = $3, valor = $4 WHERE id = $5 RETURNING *`,
        [
            product.nome,
            product.marca,
            product.quantidade,
            product.valor,
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