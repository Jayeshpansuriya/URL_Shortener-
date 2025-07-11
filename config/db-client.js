import { MongoClient } from "mongodb";
import { env } from "./env.js";

export const dbClient = new MongoClient(env.MONGODB_URI);
await dbClient.connect();
console.log("Connected to MongoDB");