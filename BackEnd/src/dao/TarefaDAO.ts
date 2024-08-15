import { Pool } from 'pg';
import { Task } from '../models/Tarefa';

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export class TaskDao {
    async createTask(task: Task): Promise<Task> {
        const { tarefa , status } = task;
    
        const result = await pool.query(
            'INSERT INTO tarefa (tarefa, status) VALUES ($1, $2) RETURNING *',

            [tarefa, status]
        );
    
        return result.rows[0];
    }

    async updateTask(id: number, task: Partial<Task>): Promise<Task | null> {
        const { status } = task;
        const result = await pool.query(
            'UPDATE tarefa SET status = $1 WHERE id = $2',
            [ status, id]
        );
        return result.rows[0] || null;
    }

    async getTasks(status?: string): Promise<Task[]> {
        let query = 'SELECT * FROM tarefa';
        const values: any[] = [];
        if (status) {
            query += ' WHERE status = $1';
            values.push(status);
        }
        const result = await pool.query(query, values);
        return result.rows;
    }

    async getTaskById(id: string): Promise<Task | null> {
        const result = await pool.query('SELECT * FROM tarefa WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async deleteTask(id: number): Promise<void> {
        await pool.query('DELETE FROM tarefa WHERE id = $1', [id]);
    }
}