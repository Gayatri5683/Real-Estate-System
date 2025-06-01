import { executeQuery } from "../db/queryHelper.js";

const insertQuery = (tableName, columns) => {
    if(!Array.isArray(columns)){
        return null;
    }
    let q = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${columns.map(x => '?').join(', ')})`;
    return q;
}

export async function saveProperty(data) {
    // 'INSERT INTO property (name, type, price, bedroom) VALUES (?, ?, ?, ?)';

    const query = insertQuery('property', ['name', 'type', 'price', 'bedroom']); 
    await executeQuery(query,[
        data.name,
        data.type,
        data.price,
        data.bedrooms
    ]);    

    // insert images
    
}

export async function getProperties() {
    const query = 'select * from property';
    return await executeQuery(query);
}