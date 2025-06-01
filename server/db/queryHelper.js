import pool from "../db/index.js";

export async function executeQuery(query, params = [])  {
    const connection = await pool.getConnection();
    try{
        const [rows] = await connection.query(query,params);
        return rows;
    }    
    finally{
        connection.release();
    }
}