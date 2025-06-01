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

    const query = insertQuery('property', ['name', 'type', 'price', 'bedrooms', 'bathrooms', 'area', 'city', 'streetAddress','locality', 'landmark', 'pincode', 'latitude', 'longitude', 'schools', 'hospitals', 'markets', 'transportation', 'description']); 
    await executeQuery(query,[
        data.name,
        data.type,
        data.price,
        data.bedrooms,
        data.bathrooms,
        data.area,
        data.city,
        data.streetAddress,
        data.locality,
        data.landmark,
        data.pincode,
        data.latitude,
        data.longitude,
        data.schools,
        data.hospitals,
        data.markets,
        data.transportation,
        data.description
    ]);    

    // insert images
    
}

export async function getProperties() {
    const query = 'select * from property';
    return await executeQuery(query);
}

export async function getPropertyByIdService(id) {
  const query = 'SELECT * FROM property WHERE id = ?';
  const results = await executeQuery(query, [id]);
  return results[0];
}