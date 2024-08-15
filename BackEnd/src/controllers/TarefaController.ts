import { Request, Response } from 'express';
import { TaskRepository } from '../repositories/TarefaRepository';

const taskRepository = new TaskRepository();

export const createTask = async (req: Request, res: Response) => {
    const { id, tarefa, status } = req.body;

    if (!tarefa || !status) {
        return res.status(400).json({ message: 'Nome e status são obrigatórios.' });
    }

    const validStatuses = ['não iniciada', 'em andamento', 'concluída'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Status inválido. Os status válidos são: não iniciada, em andamento, concluída.' });
    }

    try {
        const task = await taskRepository.createTask({ id, tarefa, status });
        
        res.status(201).json(task);
    } catch (error) {
        console.error('Erro ao criar a tarefa:', error);
        res.status(500).json({ message: 'Falha ao criar a tarefa. Tente novamente.' });
    }
};


export const updateTask = async (req: Request, res: Response) => {
    const id = req.params.id; 
    const { status } = req.body;

    const existingTask = await taskRepository.getTaskById(id);
    if (!existingTask) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    if (existingTask.status === 'concluída') {
        return res.status(400).json({ message: 'Tarefa já está concluida' });
    }
    const updatedTask = await taskRepository.updateTask(id, { status });
    res.json(updatedTask);
};


export const getTasks = async (req: Request, res: Response) => {
    const status = req.query.status as string; 
    const tasks = await taskRepository.getTasks(status);
    res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await taskRepository.getTaskById(id);
    if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await taskRepository.deleteTask(id);
    res.status(204).send();
};