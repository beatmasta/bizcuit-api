import { Router, Request, Response } from 'express';
import { login } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', login);

export default router;
