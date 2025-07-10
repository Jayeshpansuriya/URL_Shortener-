import fs from "fs/promises";
import crypto from "crypto";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

// Load links from file
export const loadLinks = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

// Save links to file
export const saveLinks = async (links) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2));
};