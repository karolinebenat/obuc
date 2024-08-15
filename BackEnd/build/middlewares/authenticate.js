"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        console.error("Token não fornecido.");
        return res.status(401).json({ message: 'Token not provided.' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Erro na verificação do token:", err.message);
            return res.status(403).json({ message: 'Invalid token.' });
        }
        next();
    });
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authenticate.js.map