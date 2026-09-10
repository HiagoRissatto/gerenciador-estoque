import pg from "pg";

const {Pool} = pg;

const connectionString = process.env.DATABASE_URL;
const sslEnabled = process.env.DB_SSL === "true";


const pool = new Pool(
  connectionString
    ? {
        connectionString,
        ssl: sslEnabled ? { rejectUnauthorized: false } : undefined
      }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: sslEnabled ? { rejectUnauthorized: false } : undefined
      }
);
pool.query("SELECT NOW()")
  .then((result) => {
    console.log("Banco conectado:", result.rows[0]);
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco:", error.message);
  });
export default pool;