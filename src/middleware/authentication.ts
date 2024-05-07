import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const secret_key = 'fjfbqfg74fp7hfquwf8hr3230ru023rufn';

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token not provided.' });
  }

  jwt.verify(token, secret_key, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Access denied. Invalid token.' });
    }
    req.user = user;
    next();
  });
};
