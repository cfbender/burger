import express from "express";
import path from "path";
import routes from "./controllers";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "..", "dist")));
app.use("/static", express.static(path.join(__dirname, "..", "public")));

app.use(routes);

app.listen(PORT, function() {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
