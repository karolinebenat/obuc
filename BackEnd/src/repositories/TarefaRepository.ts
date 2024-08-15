import { Task } from '../models/Tarefa';
import { TaskDao } from '../dao/TarefaDAO';

export class TaskRepository {
    private taskDao = new TaskDao();

    async createTask(task: Task): Promise<Task> {
        return await this.taskDao.createTask(task);
    }

    async updateTask(id: string, task: Partial<Task>) { 
        const numericId = parseInt(id);
        return await this.taskDao.updateTask(numericId, task);
    }

    async getTasks(status?: string): Promise<Task[]> {
        return await this.taskDao.getTasks(status);
    }

    async getTaskById(id: string): Promise<Task | null> {
        return await this.taskDao.getTaskById(id);
    }

    async deleteTask(id: number): Promise<void> {
        await this.taskDao.deleteTask(id);
    }
}