const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    if (process.env.USE_MEMORY_DB === 'true') {
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log('Using in-memory MongoDB');
    } else if (!uri) {
      console.warn("WARNING: MONGO_URI is not defined, running without database.");
      return Promise.resolve();
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Do not exit process, just warn, so frontend can still load without backend crashing
    // process.exit(1);
  }
};

module.exports = connectDB;
