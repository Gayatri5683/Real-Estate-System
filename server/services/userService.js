import { executeQuery } from "../db/queryHelper.js";

export async function getallusersService() {
    const query = 'select * from users';
    return await executeQuery(query);
}

export async function createUserService(name, email, password) {
    const query = 'INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)';
    return await executeQuery(query,[name, email, password]);    
}

export async function getUserByIdService(id) {
    const query = 'SELECT name FROM users WHERE id = ?';
    return await executeQuery(query, [id]);
}

export async function updateUserService(id, name, email) {
    const query = 'UPDATE users SET name = ? , email = ? WHERE id = ?';
    return await executeQuery(query, [name, email, id]);
}

export async function deleteUserService(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    return await executeQuery(query, [id]);
}