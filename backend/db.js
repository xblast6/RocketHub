import mongoose from 'mongoose';

// Validazione della variabile d'ambiente
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ Errore: MONGODB_URI non definito nelle variabili d\'ambiente.');
  process.exit(1);
}

// Ascolto degli eventi della connessione
mongoose.connection.on('connected', () => {
  console.info('✅ Connessione a MongoDB stabilita.');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ Errore di connessione a MongoDB:', error);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Connessione a MongoDB interrotta.');
});

// Funzione per connettersi a MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    return mongoose.connection;
  } catch (error) {
    console.error('❌ Impossibile connettersi a MongoDB:', error);
    process.exit(1);
  }
};

// Chiusura ordinata in caso di terminazione dell'applicazione
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.info('Connessione a MongoDB chiusa a causa della terminazione dell\'applicazione.');
  process.exit(0);
});
