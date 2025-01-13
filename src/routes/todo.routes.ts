import { Router } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../handlers/todo.handler';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.get('/todos', getTodos);
router.post('/todos', createTodo);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

export default router;
