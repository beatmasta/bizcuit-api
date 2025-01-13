import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'no_jwt_secret';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    console.log('Requesting route:', req.path);

    const token = (req.headers?.authorization || '').split(' ')[1];

    if (req.path === '/api/auth/login') {
        next();
        return;
    }

    if (!token) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.sendStatus(403);
            return;
        }

        res.locals.user = user;
        next();
    });
};

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
    const { API_USER: apiUser, API_PASSWORD: apiPassword } = process.env;

    if (username === apiUser && password === apiPassword) {
        const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
        res.json({ token });
        return;
    }

    res.status(401).json({ message: 'Invalid credentials' });
};
