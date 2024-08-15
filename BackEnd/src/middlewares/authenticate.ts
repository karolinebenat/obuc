import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        console.error("Token não fornecido.");
        return res.status(401).json({ message: 'Token not provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            console.error("Erro na verificação do token:", err.message);
            return res.status(403).json({ message: 'Invalid token.' });
        }
        next();
    });
};
