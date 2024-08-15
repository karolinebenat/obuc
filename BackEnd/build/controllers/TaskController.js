"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.getTaskById = exports.getTasks = exports.updateTask = exports.createTask = void 0;
const TaskRepository_1 = require("../repositories/TaskRepository");
const taskRepository = new TaskRepository_1.TaskRepository();
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, tarefa, status } = req.body;
    if (!tarefa || !status) {
        return res.status(400).json({ message: 'Nome e status são obrigatórios.' });
    }
    const validStatuses = ['não iniciada', 'em andamento', 'concluída'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Status inválido. Os status válidos são: não iniciada, em andamento, concluída.' });
    }
    try {
        const task = yield taskRepository.createTask({ id, tarefa, status });
        res.status(201).json(task);
    }
    catch (error) {
        console.error('Erro ao criar a tarefa:', error);
        res.status(500).json({ message: 'Falha ao criar a tarefa. Tente novamente.' });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { status } = req.body;
    const existingTask = yield taskRepository.getTaskById(id);
    if (!existingTask) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    if (existingTask.status === 'concluída') {
        return res.status(400).json({ message: 'Tarefa já está concluida' });
    }
    const updatedTask = yield taskRepository.updateTask(id, { status });
    res.json(updatedTask);
});
exports.updateTask = updateTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.query.status;
    const tasks = yield taskRepository.getTasks(status);
    res.json(tasks);
});
exports.getTasks = getTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield taskRepository.getTaskById(id);
    if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(task);
});
exports.getTaskById = getTaskById;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield taskRepository.deleteTask(id);
    res.status(204).send();
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=TaskController.js.map