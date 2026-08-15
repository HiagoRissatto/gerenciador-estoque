import "dotenv/config";
import database from "./src/config/database.js"
import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`servidor iniciado na porta ${PORT}`);
});