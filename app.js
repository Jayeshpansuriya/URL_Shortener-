import { createServer } from "http";
import { readFile } from "fs/promises";
import path from "path";

const PORT = 3002;

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

const server = createServer(async (req, res) => {
    console.log(req.url);

    if (req.method === 'GET') {
        if (req.url === "/") {
            return serverFile(res, path.join("public", "inde.html"), "text/html");
        }

        // // Optional: handle CSS/JS files
        // if (req.url.endsWith(".css")) {
        //     return serverFile(res, path.join("public", req.url), "text/css");
        // }

        // if (req.url.endsWith(".js")) {
        //     retur
        // n serverFile(res, path.join("public", req.url), "text/javascript");
        // }

        // Not found
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
