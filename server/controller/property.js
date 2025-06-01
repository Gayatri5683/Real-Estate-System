import { getProperties, saveProperty, getPropertyByIdService } from "../services/property.js";

export const addNewProperty = async (req, res) => {
    try {
        await saveProperty(req.body);
        // Always send a JSON response
        return res.json({ success: true, message: "Property added successfully" });
    } catch (error) {
        console.error(error);
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

export const getPropertyById = async (req, res) => {
  try {
    const property = await getPropertyByIdService(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error });
  }
};