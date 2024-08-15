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
exports.UserController = void 0;
const httpsStatus_1 = require("../shared/enumerators/httpsStatus");
const baseController_1 = require("./baseController");
const errorHandler_1 = require("../shared/modules/errorHandler");
class UserController extends baseController_1.BaseController {
    constructor(UserRepository) {
        super();
        this.UserRepository = UserRepository;
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.UserRepository.getAll();
                res.status(httpsStatus_1.HttpStatusCode.OK).json(user);
            }
            catch (err) {
                const errorMessage = (0, errorHandler_1.errorHandler)(err);
                const errorCode = errorMessage.code;
                res.status(errorCode ? errorCode : httpsStatus_1.HttpStatusCode.InternalServerError).send(errorMessage);
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const user = yield this.UserRepository.getById(id);
                res.status(httpsStatus_1.HttpStatusCode.OK).json(user);
            }
            catch (err) {
                const errorMessage = (0, errorHandler_1.errorHandler)(err);
                const errorCode = errorMessage.code;
                res.status(errorCode ? errorCode : httpsStatus_1.HttpStatusCode.InternalServerError).send(errorMessage);
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.UserRepository.create(req.body);
                res.status(httpsStatus_1.HttpStatusCode.Created).json(newUser);
            }
            catch (err) {
                const errorMessage = (0, errorHandler_1.errorHandler)(err);
                const errorCode = errorMessage.code;
                res.status(errorCode ? errorCode : httpsStatus_1.HttpStatusCode.InternalServerError).send(errorMessage);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const updatedUser = yield this.UserRepository.update(id, req.body);
                res.status(httpsStatus_1.HttpStatusCode.Accepted).json(updatedUser);
            }
            catch (err) {
                const errorMessage = (0, errorHandler_1.errorHandler)(err);
                const errorCode = errorMessage.code;
                res.status(errorCode ? errorCode : httpsStatus_1.HttpStatusCode.InternalServerError).send(errorMessage);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                yield this.UserRepository.delete(id);
                res.sendStatus(httpsStatus_1.HttpStatusCode.NoContent);
            }
            catch (err) {
                const errorMessage = (0, errorHandler_1.errorHandler)(err);
                const errorCode = errorMessage.code;
                res.status(errorCode ? errorCode : httpsStatus_1.HttpStatusCode.InternalServerError).send(errorMessage);
            }
        });
    }
}
exports.UserController = UserController;
