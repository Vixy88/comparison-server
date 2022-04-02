import mongoose from "mongoose";
import dotenv from "dotenv";

// ? Function connects to the database
export async function connectToDB() {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  // ? Mongoose connect returns a promise.
  return mongoose.connect(process.env.ATLAS_URI, opts);
}

export async function disconnectDb() {
  // ? This will check the database is ready to be disconnected, then disconnect.
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect();
  }
}

// ! Added drop database
export async function dropDatabase() {
  mongoose.connection.db.dropDatabase();
}
