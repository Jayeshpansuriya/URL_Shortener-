// import fs from "fs/promises";
// import crypto from "crypto";
// import path from "path";
// import express from "express";
// import { fileURLToPath } from "url";

// // Load links from file
// // const data = await fs.readFile(DATA_FILE, "utf-8");
// export const loadLinks = async () => {
//   try {
//     return JSON.parse(data);
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       await fs.writeFile(DATA_FILE, JSON.stringify({}));
//       return {};
//     }
//     throw error;
//   }
// };

// // Save links to file
// export const saveLinks = async (links) => {
//   await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2));
// };


import { dbClient } from "../config/db-client.js";
import { env } from "../config/env.js";

const db = dbClient.db(env.MONGODB_DATABASE_NAME);
const shortenerCollection =  db.collection("shortener");

export const loadLinks = async()=>{
  return await shortenerCollection.find().toArray();

};

export const saveLinks = async (links)=>{
  return shortenerCollection.insertOne(links);
};

export const getLinkByShortCode =  async (shortCode)=>{
  return await shortenerCollection.findOne({shortCode: shortCode});
};