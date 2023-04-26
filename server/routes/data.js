import { Router } from "express";
import { supabase } from "../utils/supabase.js";

const dataRouter = Router();

dataRouter.get("/categories", async (req, res) => {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("category_id");
  return res.json(categories);
});

dataRouter.get("/categories/:id", async (req, res) => {
  const categoryId = req.params.id;
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("category_id", categoryId);

  if (error) {
    // Handle the error
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data" });
  }

  if (!categories || categories.length === 0) {
    // Handle the case when no data is found for the given categoryId
    return res.status(404).json({ message: "Category not found" });
  }

  return res.json(categories[0]);
});

dataRouter.post("/categories", async (req, res) => {
  const { name } = req.body;
  const { data: categories, error } = await supabase
    .from("categories")
    .insert([{ name: name }]);
  console.log(error?.message);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.json(categories);
});

dataRouter.put("/categories/:id", async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  console.log(typeof categoryId);
  console.log(name);
  const { data: categories, error } = await supabase
    .from("categories")
    .update([{ name: name }])
    .eq("category_id", categoryId);

  // .order("id", { ascending: false });
  console.log(error?.message);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(categories);
});

dataRouter.delete("/categories/:id", async (req, res) => {
  const categoryId = req.params.id;
  console.log(categoryId);
  const { data: categories, error } = await supabase
    .from("categories")
    .delete()
    .eq("category_id", categoryId)

  // .order("id", { ascending: false });
  console.log(error?.message);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(categories);
});

dataRouter.get("/services", async (req, res) => {
  const { data, error } = await supabase.from("services").select(`
  *,
  categories ( name )
`);

dataRouter.post("/services", async (req, res) => {
  const { serviceName, category, image, subServiceList } = req.body;
  const { data: categories, error } = await supabase
    .from("categories")
    .insert([{ name: name }]);
  console.log(error?.message);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.json(categories);
});


  // Check for errors
  if (error) {
    console.error("Error executing SQL query:", error);
  }
  return res.json(data);
});

export default dataRouter;
