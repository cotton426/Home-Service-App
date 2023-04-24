import { Router } from "express";
import { supabase } from "../utils/supabase.js";

const dataRouter = Router();

dataRouter.get("/categories", async (req, res) => {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");
  console.log(categories);
  return res.json(categories);
});

dataRouter.post("/categories", async (req, res) => {
  const { name } = req.body;
  console.log(req);
  console.log(name);
  const { data: categories, error } = await supabase
    .from("categories")
    .insert([{ name: name }]);
  console.log(categories);
  return res.json(categories);
});

export default dataRouter;
