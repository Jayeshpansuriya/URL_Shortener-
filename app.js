import { createServer } from "http";
import { readFile, writeFile } from "fs/promises";
import crypto from "crypto";
import path from "path";

// Port to run the server
const PORT = 3003;

// Path to data file
const DATA_FILE = path.join("data", "links.json");

// Serve static file
const serverFile = async (res, filepath, contentType) => {
  try {
    const data = await readFile(filepath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { "Content-Type": contentType });
    res.end("404 page not found");
  }
};

// Load links from JSON file
const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

// Save links to JSON file
const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links, null, 2));
};

// Create server
const server = createServer(async (req, res) => {
  console.log(req.method, req.url);

  if (req.method === "GET") {
    if (req.url === "/") {
      return serverFile(res, path.join("public", "inde.html"), "text/html");
    } else if (req.url === "/links") {
      const links = await loadLinks();
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(links));
    }

    // Redirect short URL if exists
    const links = await loadLinks();
    const code = req.url.slice(1); // remove leading "/"
    if (links[code]) {
      res.writeHead(302, { Location: links[code] });
      return res.end();
    }

    // Not found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }

  if (req.method === "POST" && req.url === "/shorten") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const { url, shortCode } = JSON.parse(body);

        if (!url) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end("URL is required");
        }

        const links = await loadLinks();
        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

        if (links[finalShortCode]) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end("Short code already exists. Choose a different one.");
        }

        links[finalShortCode] = url;
        await saveLinks(links);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, shortCode: finalShortCode }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error");
        console.error("Error in POST /shorten:", err);
      }
    });
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
