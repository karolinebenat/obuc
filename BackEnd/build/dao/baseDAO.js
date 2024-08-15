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
exports.BaseDAO = void 0;
const appConfig_1 = require("../shared/appConfig");
const index_1 = __importDefault(require("./database/index"));
// eslint-disable-next-line @typescript-eslint/ban-types
class BaseDAO {
    constructor(_entity, _model) {
        this.entity = _entity;
        this.schema = `${appConfig_1.postgresConfig.schema}`;
        this.tableReference = `${this.schema}.tbl${this.entity.name}`;
        if (_model != null) {
            this.model = _model;
        }
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield index_1.default.query(`SELECT * FROM ${this.tableReference} WHERE id${this.entity.name} = ${id}`, [id]);
                return queryResult;
            }
            catch (error) {
                console.log('Error:', error);
                throw new Error(`Não foi possível buscar ${this.entity.name} com id ${id}`);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield index_1.default.query(`SELECT * FROM ${this.tableReference}`);
                return queryResult;
            }
            catch (error) {
                console.log('Error:', error);
                throw new Error(`Não foi possivel buscar ${this.entity.name}`);
            }
        });
    }
    create(EntityDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fields = Object.keys(EntityDTO);
                const values = Object.values(EntityDTO);
                const valuesList = this.getValuesList(values);
                const query = [
                    `INSERT INTO ${this.tableReference} (${fields.join(', ')})`,
                    `VALUES (${valuesList})`,
                    `RETURNING *`
                ].join(' ');
                const result = yield index_1.default.one(query, values);
                return result;
            }
            catch (error) {
                console.log('Error:', error); // TODO: Remover
                throw new Error(`Não foi possível criar ${this.entity.name}`);
            }
        });
    }
    update(id, EntityDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const referenceID = `id${this.entity.name}`;
                const updateList = this.getUpdateList(EntityDTO);
                const queryParams = [...Object.values(EntityDTO), id];
                const query = [
                    `UPDATE ${this.tableReference}`,
                    `SET ${updateList}`,
                    `WHERE ${referenceID} = $${queryParams.length}`,
                    `RETURNING *`
                ].join(' ');
                const result = yield index_1.default.result(query, queryParams);
                if (result.rowCount === 0) {
                    throw new Error(`Não foi possível atualizar ${this.entity.name}`);
                }
                return EntityDTO;
            }
            catch (error) {
                console.log('Error:', error); // TODO: Remover
                throw new Error(`Não foi possível atualizar ${this.entity.name}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const referenceID = `id${this.entity.name}`;
                const query = [
                    `DELETE FROM ${this.tableReference}`,
                    `WHERE ${referenceID} = $1`
                ].join(' ');
                const queryResult = yield index_1.default.result(query, [id]);
                if (queryResult.rowCount === 0) {
                    throw new Error(`${this.entity.name} não encontrado`);
                }
                else {
                    return true;
                }
            }
            catch (error) {
                console.log('Error:', error); // TODO: Remover
                throw new Error(`Não foi possível excluir ${this.entity.name}`);
            }
        });
    }
    // Funções auxiliares
    /**
     * Converte lista de colunas em lista de referencias ($1, $2, ...)
     * @param values Lista de colunas da entidade
     * @returns {string} $1, $2, $3, ...
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getValuesList(values) {
        const result = values.map((_, i) => `$${i + 1}`).join(', ');
        return result;
    }
    /**
     * Converte lista de colunas em lista de updates
     * a = $1, b = $2, c = $3 ...
     * @param EntityDTO Entidade
     * @returns {string} Lista de Updates
     */
    getUpdateList(EntityDTO) {
        const _setList = Object.entries(EntityDTO).map(([key,], i) => `${key} = $${i + 1}`).join(', ');
        return _setList;
    }
}
exports.BaseDAO = BaseDAO;
//# sourceMappingURL=baseDAO.js.map