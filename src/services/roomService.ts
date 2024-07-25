import { Room } from "../entities/room/Room";
import { myDataSource } from "../app-data-source"

class RoomService {

    async createRoom(room: Room): Promise<Room | undefined> {
        const roomCreated = await myDataSource.getRepository(Room).create(room)
        const results = await myDataSource.getRepository(Room).save(roomCreated)
        return results || undefined;
    }

    // deleteRoom(roomId: number): void {
    //     this.rooms = this.rooms.filter(room => room.id !== roomId);
    // }

    async updateRoom(roomId: number, updatedRoom: Room): Promise<Room | undefined> {
        console.log(updatedRoom);
        const room = await myDataSource.getRepository(Room).findOneBy({
            id: roomId,
        })
        var results = undefined;
        if (room) {
            myDataSource.getRepository(Room).merge(room, updatedRoom);
            results = await myDataSource.getRepository(Room).save(room)
        }
        return results || undefined;
    }

    async getRooms(): Promise<Room[]> {
        const rooms = await myDataSource.getRepository(Room).find();
        return rooms;
    }

    async getRoom(roomId: number): Promise<Room | undefined> {
        const room = await myDataSource.getRepository(Room).findOneBy({ id: roomId });
        return room || undefined;
    }
}

export default RoomService;