import { getProperties, saveProperty } from "../services/property.js";

export const addNewProperty = async (req, res) => {
    try {
        const users = await saveProperty(req.body);
        return res.json(users)
    } catch (error) {
        return res.status(500).json({ 
            message: "Error saving property", 
            error,
            errMsg: error.message
        });
    }
}

export const getAllProperties = async (req, res) => {
    try {
        const users = await getProperties();
        return res.json(users)
    } catch (error) {
        return res.status(500).json({ 
            message: "Error fetching properties", 
            error,
            errMsg: error.message
        });
    }
}