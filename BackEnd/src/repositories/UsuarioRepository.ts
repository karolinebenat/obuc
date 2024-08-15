import { User } from '../models/Usuario';
import { UserDao } from '../dao/UsuarioDAO';

export class UserRepository {
    private userDao = new UserDao();

    async createUser(user: User): Promise<User> {
        return await this.userDao.createUser(user);
    }

    async getUserByUsername(nome: string): Promise<User | null> {
        return await this.userDao.getUserByUsername(nome);
    }

    async getUserByName(nome: string): Promise<User | null> { 
        return await this.userDao.getUserByName(nome);
    }
}