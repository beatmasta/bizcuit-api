import { Request, Response } from 'express';
import pool from '../services/mysql.service';
import { Todo } from '../models/todo.model';
import {ResultSetHeader, RowDataPacket} from "mysql2";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM todos');
    const todos: Todo[] = rows as Todo[];
    res.json(todos);
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
    const { title, deadline } = req.body;
    const [result] = await pool.query<ResultSetHeader>('INSERT INTO todos (title, completed, deadline) VALUES (?, ?, ?)', [title, false, deadline]);
    res.json({ id: result.insertId, title, completed: false, deadline });
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { completed } = req.body;
    await pool.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, id]);
    res.json(req.body);
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await pool.query('DELETE FROM todos WHERE id = ?', [id]);
    res.sendStatus(204);
};
