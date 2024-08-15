import { Router } from 'express';
import { registerUser, getUserByName, loginUser } from '../controllers/UsuarioController';
import { createTask, updateTask, getTasks, getTaskById, deleteTask } from '../controllers/TarefaController';
import { authMiddleware } from '../middlewares/authenticate';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getUserByName); 

router.post('/tasks', authMiddleware, createTask);
router.put('/tasks/:id', authMiddleware, updateTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', authMiddleware, getTaskById);
router.delete('/tasks/:id', authMiddleware, deleteTask);

export default router;