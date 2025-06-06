import express from "express";
import { getBuyersWithProperties } from "../controller/buyerController.js";
const router = express.Router();

router.get("/", getBuyersWithProperties);

export default router;
