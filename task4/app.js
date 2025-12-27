import express from 'express';
const app = express();
import userRoutes from './routes/userRoutes.js';

app.use(express.json());
app.use('/users', userRoutes);

export default app;

