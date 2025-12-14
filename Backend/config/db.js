const mongoose = require("mongoose");
let mongodInstance = null;

async function startInMemoryMongo() {
  const { MongoMemoryServer } = require('mongodb-memory-server');
  const mongod = await MongoMemoryServer.create();
  mongodInstance = mongod;
  return mongod.getUri();
}

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI not set');
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected`);
  } catch (err) {
    console.error("MongoDB connection failed", err.message || err);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    try {
      console.log('Falling back to in-memory MongoDB for development');
      const uri = await startInMemoryMongo();
      await mongoose.connect(uri);
      console.log('Connected to in-memory MongoDB');
    } catch (memErr) {
      console.error('In-memory MongoDB failed', memErr);
      process.exit(1);
    }
  }
};

process.on('exit', async () => {
  if (mongodInstance) await mongodInstance.stop();
});

module.exports = connectDB;
