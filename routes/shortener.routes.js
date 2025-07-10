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

// // Load links from file
// const loadLinks = async () => {
//   try {
//     const data = await fs.readFile(DATA_FILE, "utf-8");
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
// const saveLinks = async (links) => {
//   await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2));
// };

// router.get("/report",(req,res)=>{
//     const student = {
//         name: "Mogly",
//         age: 20,
//         course: "BCA",
//         subjects: ["JavaScript", "Node.js", "Express.js"],
//         skills: ["HTML", "CSS", "JavaScript", "Node.js"]
//     }
//   return  res.render("report", { student });
// })



// GET /shorten
router.get("/",getShortenerPage );

router.post("/", postURLShortener);

router.get("/:shortCode",redirectToShortLink );

// POST /shorten
// router.post("/", async (req, res) => {
//   try {
//     const { url, shortcode } = req.body;
//     if (!url) return res.status(400).send("URL is required");

//     const links = await loadLinks();
//     const finalShortCode = shortcode || crypto.randomBytes(4).toString("hex");

//     if (links[finalShortCode]) {
//       return res.status(400).send("Short code already exists.");
//     }

//     links[finalShortCode] = url;
//     await saveLinks(links);

//     res.redirect("/shorten"); // 👈 redirect back to form
//   } catch (error) {
//     console.error("Error in POST /:", error);
//     res.status(500).send("Server Error");
//   }
// });

// GET /shorten/:shortCode

export const shortenRouters = router;
