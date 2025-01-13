import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';
import authRoutes from './routes/auth.routes';
import { authenticateJWT } from './middleware/auth.middleware';

const app = express();
const port = 3000;

app.use(cors()); // Allow CORS for all origins
app.use(bodyParser.json());
app.use(authenticateJWT);
app.use('/api', todoRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    if (!res.headersSent) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
