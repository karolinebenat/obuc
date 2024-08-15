"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioController_1 = require("../controllers/UsuarioController");
const TarefaController_1 = require("../controllers/TarefaController");
const authenticate_1 = require("../middlewares/authenticate");
const router = (0, express_1.Router)();
router.post('/register', UsuarioController_1.registerUser);
router.post('/login', UsuarioController_1.loginUser);
router.get('/users', UsuarioController_1.getUserByName);
router.post('/tasks', authenticate_1.authMiddleware, TarefaController_1.createTask);
router.put('/tasks/:id', authenticate_1.authMiddleware, TarefaController_1.updateTask);
router.get('/tasks', TarefaController_1.getTasks);
router.get('/tasks/:id', authenticate_1.authMiddleware, TarefaController_1.getTaskById);
router.delete('/tasks/:id', authenticate_1.authMiddleware, TarefaController_1.deleteTask);
exports.default = router;
//# sourceMappingURL=index.js.map