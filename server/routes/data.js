import { Router } from "express";
import { supabase } from "../utils/supabase.js";

const dataRouter = Router();

dataRouter.get("/categories", async (req, res) => {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");
  return res.json(categories);
});

dataRouter.post("/categories", async (req, res) => {
  const { name } = req.body;
  const { data: categories, error } = await supabase
    .from("categories")
    .insert([{ name: name }]);
  console.log(error.message);
  if (error) {
    return res.status(400).json({ error: error.message });
  } 
  return res.json(categories);
});

dataRouter.get("/services" , async (req, res) => {
  const { data, error } = await supabase.from('services').select(`
  *,
  categories ( name )
`)

// Check for errors
if (error) {
  console.error('Error executing SQL query:', error);
} 
 return res.json(data)
})

export default dataRouter;
