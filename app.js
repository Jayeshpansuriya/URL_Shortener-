import express from "express";
import { shortenRouters as router } from "./routes/shortener.routes.js";

const app = express();
const PORT = 3003;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Mount router at /shorten
app.use("/shorten", router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
