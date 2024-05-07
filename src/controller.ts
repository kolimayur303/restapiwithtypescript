// UserController.ts
import { Request, Response } from 'express';
import User from './model';
const secreate_key = "idwjeifjw8[fw8qjwdiw";
import * as jwt from "jsonwebtoken";


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await User.findAll();
        res.status(200).json({ users: result });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await User.findByPk(id);
        if (result) {
            res.status(200).json({ user: result });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const addUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        const existUser = await User.findOne({ where: { email: user.email } });

        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await User.create(user);

        const token = jwt.sign({ email: newUser.email, id: newUser.id }, secreate_key);

        res.status(201).json({ message: "User created successfully.", data: newUser, token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = req.body as User;
        const [updatedRows] = await User.update(user, { where: { id: id } });
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully.' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deletedRows = await User.destroy({ where: { id: id } });
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
