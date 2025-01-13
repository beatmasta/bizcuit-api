import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateJWT, login } from './auth.middleware';
import { mock } from 'jest-mock-extended';

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = mock<Request>() as unknown as Request;
        res = mock<Response>() as unknown as Response;
        next = jest.fn();
        res.sendStatus = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('authenticateJWT', () => {
        it('should call next if the route is /api/auth/login', () => {
            req = { ...req, path: '/api/auth/login' } as Request;
            authenticateJWT(req, res, next);
            expect(next).toHaveBeenCalled();
        });

        it('should return 401 if no token is provided', () => {
            req = { ...req, path: '/api/todos', headers: { authorization: '' } } as Request;
            authenticateJWT(req, res, next);
            expect(res.sendStatus).toHaveBeenCalledWith(401);
        });

        it('should return 403 if token verification fails', () => {
            req = { ...req, path: '/api/todos', headers: { authorization: 'Bearer invalidtoken' } } as Request;
            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(new Error('Invalid token'), null);
            });
            authenticateJWT(req, res, next);
            expect(res.sendStatus).toHaveBeenCalledWith(403);
        });

        it('should call next if token is valid', () => {
            req = { ...req, path: '/api/todos', headers: { authorization: 'Bearer validtoken' } } as Request;
            const user = { username: 'testuser' };
            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(null, user);
            });
            authenticateJWT(req, res, next);
            expect(res.locals.user).toEqual(user);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('login', () => {
        it('should return a token if credentials are valid', () => {
            req.body = { username: 'testuser', password: 'testpassword' };
            process.env.API_USER = 'testuser';
            process.env.API_PASSWORD = 'testpassword';
            const token = 'validtoken';
            (jwt.sign as jest.Mock).mockReturnValue(token);
            login(req, res);
            expect(res.json).toHaveBeenCalledWith({ token });
        });

        it('should return 401 if credentials are invalid', () => {
            req.body = { username: 'wronguser', password: 'wrongpassword' };
            process.env.API_USER = 'testuser';
            process.env.API_PASSWORD = 'testpassword';
            login(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
        });
    });
});
