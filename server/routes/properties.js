import express from "express";
import { addNewProperty, getAllProperties } from "../controller/property.js";

const router = express.Router();

router.get('/all', getAllProperties);
router.post('/add', addNewProperty);

export default router;