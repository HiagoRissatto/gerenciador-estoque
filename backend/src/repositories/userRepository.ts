import  pool  from "../config/database.js";
import type { UserInput } from "../schemas/userSchema.js";

export async function saveUser(user: UserInput) {
  const insert = await pool.query(
    `INSERT INTO users
    (nome, email, senha, cpf, cnpj, endereco,role)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, nome, email, cpf, cnpj, endereco, role, created_at`,
    [
      user.nome,
      user.email,
      user.senha,
      user.cpf,
      user.cnpj,
      user.endereco,
      user.role
    ]
  );

  return insert.rows[0];
}

export async function findUserByEmail(email: string) {
  const result = await pool.query(
    `SELECT id, nome,senha,email, cpf, cnpj, endereco, role, created_at FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}