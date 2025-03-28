import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';

const server = express();

server.use(express.json());
server.use(cors());



const PORT = process.env.PORT || 5010;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.info(`🚀 Server avviato su http://localhost:${PORT}`);
  });
});