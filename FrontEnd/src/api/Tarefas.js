import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export const createTask = async (task) => {
    const response = await api.post('/tarefa', task);
    return response.data;
};

export const getTasks = async () => {
    const response = await api.get('/tarefa');
    return response.data;
};

export const getTaskById = async (id) => {
    const response = await api.get(`/tarefa/${id}`);
    return response.data;
};

export const updateTask = async (id, task) => {
    const response = await api.put(`/tarefa/${id}`, task);
    return response.data;
};

export const deleteTask = async (id) => {
    await api.delete(`/tarefa/${id}`);
};