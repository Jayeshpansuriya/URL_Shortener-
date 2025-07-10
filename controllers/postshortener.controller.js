import crypto from "crypto"; 
import {loadLinks, saveLinks} from "../models/shortener.model.js";

export const getShortenerPage  = async (req, res) => {
   
      try {
        const file = await fs.readFile(path.join(__dirname, "../views/index.html"), "utf-8");
        const links = await loadLinks();
    
        const listItems = Object.entries(links)
          .map(([shortCode, url]) => `<li><a href="${url}" target="_blank">${shortCode}</a></li>`)
          .join("");
    
        const content = file.replace("{{ shortened_urls }}", listItems);
        res.send(content);
      } catch (error) {
        console.error("Error in GET /:", error);
        res.status(500).send("Server Error");
      }
    };


export const postURLShortener=  async (req, res) => {
  try {
    const { url, shortcode } = req.body;
    if (!url) return res.status(400).send("URL is required");

    const links = await loadLinks();
    const finalShortCode = shortcode || crypto.randomBytes(4).toString("hex");

    if (links[finalShortCode]) {
      return res.status(400).send("Short code already exists.");
    }

    links[finalShortCode] = url;
    await saveLinks(links);

    res.redirect("/shorten"); // 👈 redirect back to form
  } catch (error) {
    console.error("Error in POST /:", error);
    res.status(500).send("Server Error");
  }

};

export const redirectToShortLink = async (req,res) =>{
  try {
    const { shortCode } = req.params;
    const links = await loadLinks();
    if (!links[shortCode]) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(links[shortCode]);
  } catch (error) {
    console.error("Error in GET /:shortCode:", error);
    res.status(500).send("Server Error");
  }
}
