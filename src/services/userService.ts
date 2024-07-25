import { User } from '../entities/user/User';
import { myDataSource } from "../app-data-source"

class UserService {
    async createUser(user: User): Promise<User | undefined> {
        const userCreated = await myDataSource.getRepository(User).create(user);
        const results = await myDataSource.getRepository(User).save(userCreated);
        return results || undefined;
    }

    // deleteUser(userId: number): void {
    //     this.users = this.users.filter(user => user.id !== userId);
    // }

    async updateUser(userId: number, updatedUser: User): Promise<User | undefined> {
        console.log(updatedUser);
        const user = await myDataSource.getRepository(User).findOneBy({
            id: userId,
        });
        var results = undefined;
        if (user) {
            myDataSource.getRepository(User).merge(user, updatedUser);
            results = await myDataSource.getRepository(User).save(user);
        }
        return results || undefined;
    }

    async getUsers(): Promise<User[]> {
        const users = await myDataSource.getRepository(User).find();
        return users;
    }

    async getUser(userId: number): Promise<User | undefined> {
        const user = await myDataSource.getRepository(User).findOneBy({ id: userId });
        return user || undefined;
    }
}

export default UserService;
