import { Pool } from 'pg';
import { User } from '../models/Usuario';

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export class UserDao {
    async createUser(user: User): Promise<User> {
        const { nome, senha } = user;
        const result = await pool.query(
            'INSERT INTO usuario (nome, senha) VALUES ($1, $2) RETURNING *',
            [nome, senha]
        );
        return result.rows[0];
    }

    async getUserByUsername(nome: string): Promise<User | null> {
        const result = await pool.query('SELECT * FROM usuario WHERE nome = $1', [nome]); 
        return result.rows[0] || null;
    }

    async getUserByName(nome: string): Promise<User | null> {
        const result = await pool.query('SELECT * FROM usuario WHERE nome = $1', [nome]);
        return result.rows[0] || null;
    }
}
