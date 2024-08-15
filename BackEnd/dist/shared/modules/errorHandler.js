"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorHandler(err) {
    const mensagemErro = {
        message: err.message,
        code: 500
    };
    return mensagemErro;
}
