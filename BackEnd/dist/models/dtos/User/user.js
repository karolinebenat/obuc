"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = exports.userValidationSchema = void 0;
const createUser_1 = require("./createUser");
const userValidationSchema = {
    create: createUser_1.userCreateJoiSchema,
    read: createUser_1.userCreateJoiSchema,
    update: createUser_1.userCreateJoiSchema,
    delete: createUser_1.userCreateJoiSchema,
};
exports.userValidationSchema = userValidationSchema;
const userEntity = {
    "name": "user",
    "fields": {
        "id": "number",
        "nome": "string",
        "email": "string",
        "senha": "string"
    }
};
exports.userEntity = userEntity;
