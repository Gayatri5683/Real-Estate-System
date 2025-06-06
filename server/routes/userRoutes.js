import { getUsers, createUser, getUser, updateUser, deleteUser, } from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.get('/all',getUsers);

router.post('/create', createUser);

router.get('/:id', getUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);



export default router;