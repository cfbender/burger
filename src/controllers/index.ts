import express from "express";
import { orm as db } from "../config/orm";

const router = express.Router();

router.post("/api/burgers/new", async (req, res) => {
  db.insertOne({
    table: "burgers",
    values: { burger_name: req.body.burger, devoured: false }
  });
  res.sendStatus(200);
});
router.put("/api/burgers/", async (req, res) => {
  db.updateOne({
    table: "burgers",
    values: { devoured: true },
    id: parseInt(req.query.id)
  });
  res.sendStatus(200);
});

router.get("/", async (req, res) => {
  let data = await db.selectAll({ table: "burgers" });
  console.log(data);
  res.render("index", {
    burgers: data,
    remaining: data.filter(
      (burger: { [k: string]: number }) => !burger.devoured
    ).length
  });
});
export default router;
