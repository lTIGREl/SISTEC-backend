import { User } from "../entities/user/User";
import { Room } from "../entities/room/Room";
import { myDataSource } from "../app-data-source";
import { Audit } from "../entities/audit/Audit";
import AuditService from "./auditService";

class RegisterService {
    audit: Audit = new Audit();
    auditService: AuditService = new AuditService();
    async assignRoomToUser(userId: number, roomId: number) {

        const user = await myDataSource.getRepository(User).findOne({ where: { id: userId } });
        const room = await myDataSource.getRepository(Room).findOne({ where: { id: roomId } });

        if (user && room) {
            room.occupiedBy = user;
            room.isAvailable = false;
            await myDataSource.getRepository(Room).save(room);
            this.audit.action = 'assign';
            this.audit.entity = 'room';
            this.audit.entityId = room.id;
            this.audit.data = room;
            await this.auditService.createAudit(this.audit);
        }

    }
    async getDetailInfo() {
        const userRepository = myDataSource.getRepository(User);
        const query = userRepository.createQueryBuilder('users')
            .leftJoinAndSelect('rooms', 'rooms', 'users.id = rooms.occupiedBy')
            .select(['users.name', 'users.idNumber', 'rooms.id']);
        const result = await query.getRawMany();
        const filteredResult = result.filter(item => item.rooms_id !== null);
        return filteredResult;
    }
}
export default RegisterService;