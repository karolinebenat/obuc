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
exports.TaskDao = void 0;
const pg_1 = require("pg");
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
class TaskDao {
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tarefa, status } = task;
            const result = yield pool.query('INSERT INTO tarefa (tarefa, status) VALUES ($1, $2) RETURNING *', [tarefa, status]);
            return result.rows[0];
        });
    }
    updateTask(id, task) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status } = task;
            const result = yield pool.query('UPDATE tarefa SET status = $1 WHERE id = $2', [status, id]);
            return result.rows[0] || null;
        });
    }
    getTasks(status) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'SELECT * FROM tarefa';
            const values = [];
            if (status) {
                query += ' WHERE status = $1';
                values.push(status);
            }
            const result = yield pool.query(query, values);
            return result.rows;
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query('SELECT * FROM tarefa WHERE id = $1', [id]);
            return result.rows[0] || null;
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query('DELETE FROM tarefa WHERE id = $1', [id]);
        });
    }
}
exports.TaskDao = TaskDao;
//# sourceMappingURL=TarefaDAO.js.map