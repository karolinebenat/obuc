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
exports.UserDao = void 0;
const pg_1 = require("pg");
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
class UserDao {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, senha } = user;
            const result = yield pool.query('INSERT INTO usuario (nome, senha) VALUES ($1, $2) RETURNING *', [nome, senha]);
            return result.rows[0];
        });
    }
    getUserByUsername(nome) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query('SELECT * FROM usuario WHERE nome = $1', [nome]);
            return result.rows[0] || null;
        });
    }
    getUserByName(nome) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query('SELECT * FROM usuario WHERE nome = $1', [nome]);
            return result.rows[0] || null;
        });
    }
}
exports.UserDao = UserDao;
//# sourceMappingURL=UsuarioDAO.js.map