import { getallusersService, createUserService, getUserByIdService, updateUserService, deleteUserService } from "../services/userService.js";

export const getUsers = async (req, res) => {
    try {
        const users = await getallusersService();
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error});
    }
}

export const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const newUser = await createUserService(name, email, password);
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message: "Error creating user", error})
    }
}

export const getUser = async (req,res) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message: "Error fetching user", error});
    }
}

export const updateUser = async (req, res) => {
    try {
        const { name, email }= req.body;
        const updateUser = await updateUserService(req.params.id, name, email);
        if( !updateUser) {
            return res.status(404).json({message : "User not found"});
        }
        res.json(updateUser);
    } catch (error) {
        res.status(500).json({message: "Error updating user", error});
    }
}

export const deleteUser = async(req, res) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await deleteUserService(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" , error });
    }
}