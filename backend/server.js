import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import session from 'express-session';
import passport from './middlewares/passport.js';

// rotte 
import companiesRouter from "./routers/companies.routes.js";
import uploadRouter from "./routers/upload.routes.js";
import rocketsRouter from "./routers/rockets.routes.js";
import countdownRouter from "./routers/countdown.routes.js"
import verifyToken from './middlewares/verifyToken.js';
import authRouter from './routers/auth.routes.js';

const server = express();
server.use(express.json());
server.use(cors());

server.use(session({
  secret: process.env.SESSION_SECRET || 'sessionsecret',
  resave: false,
  saveUninitialized: true,
}));

// Inizializza Passport
server.use(passport.initialize());
server.use(passport.session());

// Monta le rotte
server.use("/companies", companiesRouter)
server.use("/upload", uploadRouter);
server.use("/rockets", rocketsRouter);
server.use("/countdowns", countdownRouter)
server.use('/auth', authRouter);

import isAdmin from './middlewares/isAdmin.js';
server.get('/backoffice', verifyToken, isAdmin, (req, res) => {
  res.json({ message: 'Benvenuto nel backoffice' });
});


//Connesione a MongoDB
const PORT = process.env.PORT || 5010;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.info(`🚀 Server avviato su http://localhost:${PORT}`);
  });
});