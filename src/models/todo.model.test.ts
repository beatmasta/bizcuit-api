import { Todo } from './todo.model';

describe('Todo Model', () => {
    it('should create a valid Todo object', () => {
        const todo: Todo = {
            id: 1,
            title: 'Test Todo',
            completed: false,
            deadline: new Date('2023-12-31')
        };

        expect(todo.id).toBe(1);
        expect(todo.title).toBe('Test Todo');
        expect(todo.completed).toBe(false);
        expect(todo.deadline).toEqual(new Date('2023-12-31'));
    });

    it('should allow null for the deadline', () => {
        const todo: Todo = {
            id: 2,
            title: 'Another Test Todo',
            completed: true,
            deadline: null
        };

        expect(todo.id).toBe(2);
        expect(todo.title).toBe('Another Test Todo');
        expect(todo.completed).toBe(true);
        expect(todo.deadline).toBeNull();
    });
});
