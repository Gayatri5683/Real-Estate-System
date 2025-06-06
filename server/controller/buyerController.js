import { getBuyersWithPropertiesService } from "../services/buyerService.js";

export const getBuyersWithProperties = async (req, res) => {
  try {
    const buyers = await getBuyersWithPropertiesService();
    res.json(buyers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching buyers", error });
  }
};
