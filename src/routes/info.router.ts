import { Request, Response } from 'express';
import RegisterService from '../services/registerService';
import express from 'express';

const router = express.Router();

let registerService = new RegisterService();
router.get('/', async (req: Request, res: Response) => {
    try {
        const detailInfo = await registerService.getDetailInfo();
        res.status(200).json(detailInfo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;