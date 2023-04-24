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


export default dataRouter;
