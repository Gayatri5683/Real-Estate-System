import { executeQuery } from "../db/queryHelper.js";

const insertQuery = (tableName, columns) => {
    if (!Array.isArray(columns)) {
        return null;
    }
    let q = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${columns.map(x => '?').join(', ')})`;
    return q;
}

export async function saveProperty(data) {
    // 'INSERT INTO property (name, type, price, bedroom) VALUES (?, ?, ?, ?)';

    const { nearbyPlaces, address, coordinates } = data;
    data.nearbyPlaces = nearbyPlaces && JSON.parse(nearbyPlaces);
    data.address = address && JSON.parse(address);
    data.coordinates = coordinates && JSON.parse(coordinates);

    const query = insertQuery('property', ['name', 'type', 'price', 'bedrooms', 'bathrooms', 'area', 'city', 'streetAddress', 'locality', 'landmark', 'pincode', 'latitude', 'longitude', 'schools', 'hospitals', 'markets', 'transportation', 'description', 'amenities']);
    const results = await executeQuery(query, [
        data.name,
        data.type,
        data.price,
        data.bedrooms,
        data.bathrooms,
        data.area,
        data.location,
        data.address.street,
        data.address.locality,
        data.address.landmark,
        data.address.pincode,
        data.coordinates.latitude,
        data.coordinates.longitude,
        data.nearbyPlaces.schools,
        data.nearbyPlaces.hospitals,
        data.nearbyPlaces.markets,
        data.nearbyPlaces.transportation,
        data.description,
        data.amenities
    ]);

    return results.insertId;

}

export async function getProperties() {
    const query = 'select p.*, (select imagePath from property_images where propertyId = p.id and isPrimary = 1 limit 1) as image from property p';
    return await executeQuery(query);
}

export async function getPropertyByIdService(Id) {
    const query = 'SELECT p.*, (select imagePath from property_images where propertyId = p.id and isPrimary = 1 limit 1) as image FROM property p WHERE id = ?';
    const results = await executeQuery(query, [Id]);
    let property = null;
    if (results && results[0]) {
        property = { ...results[0] };
        const imgQuery = 'select * from property_images where propertyId = ?';
        const imgResults = await executeQuery(imgQuery, [property.ID]);
        property = {
            ...property,
            images: imgResults
        }
        return property;
    }
    return property;
}

export async function savePropertyImages(images, propertyId) {
    const query = insertQuery('property_images', ['propertyId', 'imagePath', 'isPrimary',]);
    if (images && Array.isArray(images)) {
        const promises = images.map(async (x, index) => {
            return await executeQuery(query, [
                propertyId,
                x.filename,
                index === 0
            ])
        })

        return Promise.all(promises);
    }

    return null;
}