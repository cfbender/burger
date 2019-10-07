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
  console.log(`PUT with id of ${req.query.id}. Will update to devoured: true`);
});

export default router;
