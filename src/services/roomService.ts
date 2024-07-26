import { Room } from "../entities/room/Room";
import { myDataSource } from "../app-data-source"
import { Audit } from "../entities/audit/Audit";
import AuditService from "./auditService";

class RoomService {
    audit: Audit = new Audit();
    auditService: AuditService = new AuditService();
    async createRoom(room: Room): Promise<Room | undefined> {
        const roomCreated = await myDataSource.getRepository(Room).create(room)
        const results = await myDataSource.getRepository(Room).save(roomCreated)
        this.audit.action = 'create';
        this.audit.entity = 'room';
        this.audit.entityId = results.id;
        this.audit.data = results;
        await this.auditService.createAudit(this.audit);
        return results || undefined;
    }

    async updateRoom(roomId: number, updatedRoom: Room): Promise<Room | undefined> {
        const room = await myDataSource.getRepository(Room).findOneBy({
            id: roomId,
        })
        var results = undefined;
        if (room) {
            myDataSource.getRepository(Room).merge(room, updatedRoom);
            if (updatedRoom.hasOwnProperty('occupiedBy') && updatedRoom.occupiedBy === null) {
                room.occupiedBy = null;
            }
            results = await myDataSource.getRepository(Room).save(room)
            this.audit.action = 'update';
            this.audit.entity = 'room';
            this.audit.entityId = results.id;
            this.audit.data = results;
            await this.auditService.createAudit(this.audit);
        }
        return results || undefined;
    }

    async getRooms(): Promise<Room[]> {
        let rooms = await myDataSource.getRepository(Room).find();
        return rooms;
    }

    async getRoom(roomId: number): Promise<Room | undefined> {
        const room = await myDataSource.getRepository(Room).findOneBy({ id: roomId });
        return room || undefined;
    }
}

export default RoomService;