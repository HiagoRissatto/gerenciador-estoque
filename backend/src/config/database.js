import pg from "pg";

const {Pool} = pg;

const pool = new Pool({
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
pool.query("SELECT NOW()")
  .then((result) => {
    console.log("Banco conectado:", result.rows[0]);
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco:", error.message);
  });
export default pool;