import { User } from '../entities/user/User';
import { myDataSource } from "../app-data-source"
import { Audit } from '../entities/audit/Audit';
import AuditService from './auditService';

class UserService {
    audit: Audit = new Audit();
    auditService: AuditService = new AuditService();
    async createUser(user: User): Promise<User | undefined> {

        const userCreated = await myDataSource.getRepository(User).create(user);
        const results = await myDataSource.getRepository(User).save(userCreated);
        this.audit.action = 'create';
        this.audit.entity = 'user';
        this.audit.entityId = userCreated.id;
        this.audit.data = userCreated;
        await this.auditService.createAudit(this.audit);
        return results || undefined;
    }

    // deleteUser(userId: number): void {
    //     this.users = this.users.filter(user => user.id !== userId);
    // }

    async updateUser(userId: number, updatedUser: User): Promise<User | undefined> {
        const user = await myDataSource.getRepository(User).findOneBy({
            id: userId,
        });
        var results = undefined;
        if (user) {
            myDataSource.getRepository(User).merge(user, updatedUser);
            results = await myDataSource.getRepository(User).save(user);
            this.audit.action = 'update';
            this.audit.entity = 'user';
            this.audit.entityId = user.id;
            this.audit.data = user;
            await this.auditService.createAudit(this.audit);
        }
        return results || undefined;
    }

    async getUsers(): Promise<User[]> {
        const users = await myDataSource.getRepository(User).find();
        return users;
    }

    async getUser(userId: number): Promise<User | undefined> {
        const user = await myDataSource.getRepository(User).findOne({
            where: { id: userId }, lock: { mode: 'optimistic', version: 1 }
        });
        return user || undefined;
    }
}

export default UserService;
