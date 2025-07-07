import { createServer } from "http";
import { readFile } from "fs/promises";
import crypto from "crypto"
import path from "path";
import { writeFile } from "fs";
 
const PORT = 3003;

// const loadLinks = async ( ) => {

// };

const saveLinks = async (links)=>{
    await writeFile(DATA_FILE,JSON.stringify(links));
};

const DATA_FILE = path.join("data" , "links.json")

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

const loadLinks=async()=>{
    try {
        const data =  await readFile(url, 'UTF-8');
        return JSON.parse(data);
        
    } catch (error) {
         if(error.code === "ENOENT"){
            await writeFile(DATA_FILE,JSON.stringify({}));
            return {};
         }
         throw error;
    }

}

const server = createServer(async (req, res) => {
    console.log(req.url);

    if (req.method === 'GET') {
        if (req.url === "/") {
            return serverFile(res, path.join("public", "inde.html"), "text/html");
        }
        // Not foun
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }

    if(req.method === 'POST' && req.url === '/shorten'){
      const links = await loadLinks();
        let body =' ';
        req.on("data",(chunk)=>{
             body += chunk;
        });
        req.on('end', async ()=>{
            console.log(body);
            const {url,shortCode} = JSON.parse(body);
            
            if(!url){
                res.writeHead(400,{"content-Type":"text/plain"});
            return  res.end("url is required ");
                 
            }

            const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
            if(     links[finalShortCode]      ){
                   res.writeHead(400,{"content-Type":"text/plain"});
            return  res.end("url is required ");

            }
            links[finalShortCode] =url;

            await saveLinks(links);
            res.writeHead(200,{"Content-Type":"application/json"});
            res.end(JSON.stringify({success:true,shortCode:finalShortCode  }))
        })
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
