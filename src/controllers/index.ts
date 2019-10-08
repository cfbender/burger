import express from "express";
import { orm as db } from "../config/orm";

const router = express.Router();

router.get("/", async (req, res) => {
  let data = await db.selectAll({ table: "burgers" });
  console.log(data);
  res.render("index", { burgers: data });
});
router.post("/api/burgers", async (req, res) => {
  console.log(`POST with ${JSON.stringify(req.body)}`);
});
router.put("/api/burgers/", async (req, res) => {
  db.updateOne({
    table: "burgers",
    values: [{ devoured: true }],
    id: parseInt(req.query.id)
  });
});

export default router;
