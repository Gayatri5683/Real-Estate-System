import dotenv from "dotenv"
import app from "./app.js"
import pool from "./db/index.js";

dotenv.config();

(async () => {
    try{
        const connection = await pool.getConnection();
        console.log("You are connected to the database");
        connection.release();
    }
    catch(err){
        console.error("Db error", err);
        process.exit(1);
    }
})();

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
})