"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskController_1 = require("../controllers/TaskController");
const authenticate_1 = require("../middlewares/authenticate");
const taskRouter = (0, express_1.Router)();
taskRouter.post('/tasks', TaskController_1.createTask);
taskRouter.put('/tasks/:id', TaskController_1.updateTask);
taskRouter.get('/tasks', authenticate_1.authMiddleware, TaskController_1.getTasks);
taskRouter.get('/tasks/:id', authenticate_1.authMiddleware, TaskController_1.getTaskById);
taskRouter.delete('/tasks/:id', authenticate_1.authMiddleware, TaskController_1.deleteTask);
exports.default = taskRouter;
//# sourceMappingURL=taskRouter.js.map