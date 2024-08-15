"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor(UserDAO) {
        this.UserDAO = UserDAO;
    }
    getAll() {
        return this.UserDAO.getAll();
    }
    getById(id) {
        if (id) {
        } 
        throw new Error("Method not implemented.");
    }
    create(EntityDTO) {
        return this.UserDAO.create(EntityDTO);
    }
    update(id, EntityDTO) {
        return this.UserDAO.update(id, EntityDTO);
    }
    delete(id) {
        return this.UserDAO.delete(id);
    }
}
exports.UserRepository = UserRepository;
