import { Room } from "../entity/room/Room";

class RoomService {
    private rooms: Room[];

    constructor() {
        this.rooms = [];
    }

    createRoom(room: Room): void {
        this.rooms.push(room);
    }

    deleteRoom(roomId: number): void {
        this.rooms = this.rooms.filter(room => room.id !== roomId);
    }

    updateRoom(roomId: number, updatedRoom: Room): void {
        this.rooms = this.rooms.map(room => {
            if (room.id === roomId) {
                return { ...room, ...updatedRoom };
            }
            return room;
        });
    }

    getRooms(): Room[] {
        return this.rooms;
    }
}

export default RoomService;