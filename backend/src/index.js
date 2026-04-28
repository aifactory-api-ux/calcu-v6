import express from 'express';
import dotenv from 'dotenv';
import { healthCheck } from './health.controller.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.get('/api/health', healthCheck);
app.listen(PORT, () => {
    console.log(`Backend service running on port ${PORT}`);
});
