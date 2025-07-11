import crypto from "crypto"; 
import {loadLinks, saveLinks, getLinkByShortCode} from "../models/shortener.model.js";

export const getShortenerPage  = async (req, res) => {
   
      try {
        // const file = await fs.readFile(path.join(__dirname, "../views/index.html"), "utf-8");
         const links = await loadLinks();
          res.render("index", {
      links,
      host: `${req.protocol}://${req.get("host")}`, // ✅ dynamically set host
    });
    


      //   const listItems = Object.entries(links)
      //     .map(([shortCode, url]) => {
      //       const displayUrl = url.length >= 30 ? `${url.slice(0,30)}...` : url;
      //       return `<li><a href="${url}" target="_blank">${shortCode}</a> (${displayUrl})</li>`;
      //     })
      //     .join("");
      //   const content = file.replace("{{ shortened_urls }}", listItems);
      //  return res.send(content);




      } catch (error) {
        console.error("Error in GET /:", error);
        res.status(500).send("Server Error");
      }
    };


export const postURLShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;

    console.log("Received from form:", url, shortCode); // ✅ DEBUG

    if (!url || !shortCode) {
      return res.status(400).send("Missing url or shortCode");
    }

    await saveLinks({ url, shortCode });

    res.redirect("/shorten");
  } catch (err) {
    console.error("Error in postURLShortener:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const redirectToShortLink = async (req,res) =>{
  try {
    const { shortCode } = req.params;
    const link = await getLinkByShortCode(shortCode);
    if (!link) {
      return res.status(404).send("Short URL not found");
    }

   return res.redirect(link.url);
  } catch (error) {
    console.error("Error in GET /:shortCode:", error);
    res.status(500).send("Server Error");
  }
}
