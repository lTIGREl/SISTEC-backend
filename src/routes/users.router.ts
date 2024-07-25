import express, { Request, Response } from 'express';
import UserService from '../services/userService';
import { User } from '../entities/user/User';

const router = express.Router();
const userService = new UserService();

router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const user = await userService.getUser(userId);
        if (user !== undefined && user !== null) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const newUser: User = req.body;
    try {
        const createdUser = await userService.createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const updatedUser: User = req.body;
    try {
        const user = await userService.updateUser(userId, updatedUser);
        if (user !== undefined && user !== null) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
