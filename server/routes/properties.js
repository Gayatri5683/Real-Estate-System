import express from "express";
import { addNewProperty, getAllProperties, getPropertyById } from "../controller/property.js";

const router = express.Router();

router.get('/all', getAllProperties);
router.post('/add', addNewProperty);
router.get('/:id', getPropertyById);

export default router;