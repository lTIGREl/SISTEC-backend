import { User } from '../entity/user/User';

class UserService {
    private users: User[];

    constructor() {
        this.users = [];
    }

    createUser(user: User): void {
        this.users.push(user);
    }

    updateUser(userId: number, updatedUser: User): void {
        const index = this.users.findIndex(user => user.id === userId);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...updatedUser };
        }
    }
}

export default UserService;