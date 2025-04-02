import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
// rotte 
import companiesRouter from "./routers/companies.routes.js";
import uploadRouter from "./routers/upload.routes.js";
import rocketsRouter from "./routers/rockets.routes.js";

const server = express();
server.use(express.json());
server.use(cors());

// Monta le rotte
server.use("/companies", companiesRouter)
server.use("/upload", uploadRouter);
server.use("/rockets", rocketsRouter);


//Connesione a MongoDB
const PORT = process.env.PORT || 5010;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.info(`🚀 Server avviato su http://localhost:${PORT}`);
  });
});