import express, { Request, Response } from 'express';
import RoomService from '../services/roomService';
import { Room } from '../entities/room/Room';

const router = express.Router();
const roomService = new RoomService();

router.get('/', async (req: Request, res: Response) => {
    try {
        const rooms = await roomService.getRooms();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const roomId = parseInt(req.params.id);
    try {
        const room = await roomService.getRoom(roomId);
        if (room !== undefined && room !== null) {
            res.json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const newRoom: Room = req.body;
    try {
        const createdRoom = await roomService.createRoom(newRoom);
        res.status(201).json(createdRoom);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const roomId = parseInt(req.params.id);
    const updatedRoom: Room = req.body;
    try {
        
        const room = await roomService.updateRoom(roomId, updatedRoom);
        if (room !== undefined && room !== null) {
            res.json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// router.delete('/:id', async (req: Request, res: Response) => {
//     const roomId = parseInt(req.params.id);
//     try {
//         const deletedRoom = await roomService.deleteRoom(roomId);
//         if (deletedRoom !== undefined) {
//             res.json(deletedRoom);
//         } else {
//             res.status(404).json({ message: 'Room not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

export default router;