// import fs from "fs/promises";
// import crypto from "crypto";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { postURLShortener,getShortenerPage,redirectToShortLink  } from "../controllers/postshortener.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const DATA_FILE = path.join("data", "links.json");

// app.post("/shorten", async (req, res) => {
//   console.log("Form Data:", req.body); // ✅ Check what is coming

//   const { url, shortCode } = req.body;
//   await saveLinks({ url, shortCode });

//   console.log("Inserted into DB"); // ✅ Confirm insertion
//   res.redirect("/");
// });




// GET /shorten
router.get("/",getShortenerPage );

router.post("/", postURLShortener);

router.get("/:shortCode",redirectToShortLink );



// GET /shorten/:shortCode

export const shortenRouters = router;
