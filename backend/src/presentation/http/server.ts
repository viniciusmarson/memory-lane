import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import { router } from './router';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb' }));

app.use(cors());
app.use(router);

app.use('/uploads', express.static(path.join(__dirname, '../../../uploads')));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
