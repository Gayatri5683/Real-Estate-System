import { executeQuery } from "../db/queryHelper.js";

export async function getBuyersWithPropertiesService() {
  const query = `
    SELECT users.id as buyerId, users.name, users.email, users.phone, property.ID as propertyId, property.title
    FROM users
    JOIN purchases ON users.id = purchases.buyerId
    JOIN property ON purchases.propertyId = property.ID
  `;
  return await executeQuery(query);
}
