import { Request, Response } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from './todo.handler';
import pool from '../services/mysql.service';
import { mock } from 'jest-mock-extended';

jest.mock('../services/mysql.service');

describe('Todo Handlers', () => {
    let req: Request;
    let res: Response;

    beforeEach(() => {
        req = mock<Request>() as unknown as Request;
        res = mock<Response>() as unknown as Response;
        res.json = jest.fn().mockReturnValue(res);
        res.sendStatus = jest.fn().mockReturnValue(res);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getTodos should return all todos', async () => {
        const todos = [{ id: 1, title: 'Test Todo', completed: false, deadline: '2023-12-31' }];
        (pool.query as jest.Mock).mockResolvedValue([todos]);

        await getTodos(req, res);

        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM todos');
        expect(res.json).toHaveBeenCalledWith(todos);
    });

    test('createTodo should create a new todo', async () => {
        req.body = { title: 'New Todo', deadline: '2023-12-31' };
        const result = { insertId: 1 };
        (pool.query as jest.Mock).mockResolvedValue([result]);

        await createTodo(req, res);

        expect(pool.query).toHaveBeenCalledWith('INSERT INTO todos (title, completed, deadline) VALUES (?, ?, ?)', ['New Todo', false, '2023-12-31']);
        expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'New Todo', completed: false, deadline: '2023-12-31' });
    });

    test('updateTodo should update an existing todo', async () => {
        req.params = { id: '1' };
        req.body = { completed: true };
        (pool.query as jest.Mock).mockResolvedValue([{ affectedRows: 1 }]);

        await updateTodo(req, res);

        expect(pool.query).toHaveBeenCalledWith('UPDATE todos SET completed = ? WHERE id = ?', [true, '1']);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    test('deleteTodo should delete an existing todo', async () => {
        req.params = { id: '1' };
        (pool.query as jest.Mock).mockResolvedValue([{ affectedRows: 1 }]);

        await deleteTodo(req, res);

        expect(pool.query).toHaveBeenCalledWith('DELETE FROM todos WHERE id = ?', ['1']);
        expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
});
