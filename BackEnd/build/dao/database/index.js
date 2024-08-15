"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../../shared/credentials/postgres.json");
const pgp = (0, pg_promise_1.default)({});
const db = pgp(`postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`);
exports.default = db;
//# sourceMappingURL=index.js.map