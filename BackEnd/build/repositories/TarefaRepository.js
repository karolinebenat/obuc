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
exports.TaskRepository = void 0;
const TarefaDAO_1 = require("../dao/TarefaDAO");
class TaskRepository {
    constructor() {
        this.taskDao = new TarefaDAO_1.TaskDao();
    }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskDao.createTask(task);
        });
    }
    updateTask(id, task) {
        return __awaiter(this, void 0, void 0, function* () {
            const numericId = parseInt(id);
            return yield this.taskDao.updateTask(numericId, task);
        });
    }
    getTasks(status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskDao.getTasks(status);
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskDao.getTaskById(id);
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.taskDao.deleteTask(id);
        });
    }
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=TarefaRepository.js.map