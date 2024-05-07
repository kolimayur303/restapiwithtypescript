import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../model/userModel';
const secret_key = 'fjfbqfg74fp7hfquwf8hr3230ru023rufn';


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secret_key, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response) => {
    const { id, email, password} = req.body;
  
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({ id : id, email : email, password: hashedPassword });
  
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, secret_key, { expiresIn: '1h' });
  
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error in registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };