require("dotenv").config();

const express = require("express");
const viteExpress = require("vite-express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static("public"));

const db = require("./db/client");
db.connect();

const apiRouter = require("./api");
app.use("/api", apiRouter);

app.get("/api/products", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM shoes");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

viteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000 gangstas...")
);
