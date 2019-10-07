import express from "express";
const expressHbs = require("express-handlebars");
import path from "path";
import routes from "./controllers";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use("/dist", express.static("dist"));

app.engine("handlebars", expressHbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.set("views", path.join(__dirname, "..", "src", "views"));

app.use(routes);

app.listen(PORT, function() {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
