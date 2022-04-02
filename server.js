import router from "./views/router.js";
import express from "express";
import { connectToDB } from "./db/helpers.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import dotenv from "dotenv";

async function startServer() {
  const app = express();

  dotenv.config();

  const PORT = process.env.PORT ? process.env.PORT : 4000;

  app.use(cors()); // allowing cross origin resource sharing

  app.use(express.json()); // parse income requests with JSON requests and put parsed data in req

  // ! Using my new middleware
  app.use(logger);

  app.use(router);

  // ! Error handling is the last piece of middleware
  app.use(errorHandler);

  // ! Before I listen, I want to connect to the database!
  await connectToDB();

  app.listen(PORT, () => console.log(`Express server running on Port ${PORT}`));
}

startServer();
