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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByName = exports.loginUser = exports.registerUser = void 0;
const UsuarioRepository_1 = require("../repositories/UsuarioRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository = new UsuarioRepository_1.UserRepository();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, senha } = req.body;
    if (!nome || !senha) {
        return res.status(400).json({ message: 'Nome e senha são obrigatórios.' });
    }
    const existingUser = yield userRepository.getUserByUsername(nome);
    if (existingUser) {
        return res.status(409).json({ message: 'Esse nome já existe.' });
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(senha, 10);
        yield userRepository.createUser({
            nome,
            senha: hashedPassword,
            id: 0
        });
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome } = req.body;
    const user = yield userRepository.getUserByUsername(nome);
    if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, nome: user.nome }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login bem-sucedido!', token });
});
exports.loginUser = loginUser;
const getUserByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome } = req.query;
    try {
        const user = yield userRepository.getUserByName(nome);
        if (user) {
            return res.status(200).json({ exists: true, user });
        }
        else {
            return res.status(404).json({ exists: false });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao verificar usuário', error });
    }
});
exports.getUserByName = getUserByName;
//# sourceMappingURL=UsuarioController.js.map