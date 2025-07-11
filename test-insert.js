// test-insert.js
import { dbClient } from "./config/db-client.js";
import { env } from "./config/env.js";

const db = dbClient.db(env.MONGODB_DATABASE_NAME);
const shortenerCollection = db.collection("shortener");

const run = async () => {
  try {
    const result = await shortenerCollection.insertOne({
      shortCode: "test123",
      url: "https://example.com"
    });

    console.log("Inserted successfully:", result.insertedId);
  } catch (err) {
    console.error("Insert failed:", err);
  } finally {
    await dbClient.close();
  }
};

run();
