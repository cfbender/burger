import express from "express";
const expressHbs = require("express-handlebars");
import path from "path";

import { orm as db } from "./config/orm";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", expressHbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "..", "src", "views"));

app.get("/", async function(req, res) {
  let data = await db.selectAll({ table: "burgers" });
  console.log(data);
  res.render("index", { burgers: data });
});

app.listen(PORT, function() {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
