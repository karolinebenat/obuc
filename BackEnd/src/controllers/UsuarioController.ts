import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UsuarioRepository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userRepository = new UserRepository();

export const registerUser = async (req:Request, res:Response ) => {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
        return res.status(400).json({ message: 'Nome e senha são obrigatórios.' });
    }

    const existingUser = await userRepository.getUserByUsername(nome);
    if (existingUser) {
        return res.status(409).json({ message: 'Esse nome já existe.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        await userRepository.createUser({
            nome, 
            senha: hashedPassword,
            id: 0  
        });
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { nome } = req.body;
    const user = await userRepository.getUserByUsername(nome);
    
    if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }
    const token = jwt.sign(
        { id: user.id, nome: user.nome },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login bem-sucedido!', token });
};

export const getUserByName = async (req: Request, res: Response) => {
    const { nome } = req.query; 

    try {
        const user = await userRepository.getUserByName(nome as string); 

        if (user) {
            return res.status(200).json({ exists: true, user }); 
        } else {
            return res.status(404).json({ exists: false }); 
        }
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao verificar usuário', error });
    }
};