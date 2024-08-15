"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouterV2 = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const user_1 = require("../../models/dtos/User/user");
const baseDAO_1 = require("../../dao/baseDAO");
const userRepository_1 = require("../../repositories/interfaces/userRepository");
const userController_1 = require("../../controllers/userController");
const UserRouterV2 = (0, express_1.default)();
exports.UserRouterV2 = UserRouterV2;
UserRouterV2.use((0, cors_1.default)({ origin: true }));
UserRouterV2.use(bodyParser.json());
const userDAO = new baseDAO_1.BaseDAO(user_1.userEntity);
const userRepository = new userRepository_1.UserRepository(userDAO);
const userController = new userController_1.UserController(userRepository);
UserRouterV2.post('/register', userController.create);
UserRouterV2.post('/login', userController.create);
