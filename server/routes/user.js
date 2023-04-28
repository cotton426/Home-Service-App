import { Router } from "express";
import { supabase } from "../utils/supabase.js";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("services")
    .select(
      `
    name,
    image,
    categories(name),
    sub_services (price)
    `
    )
    .limit(3);

  if (error) {
    console.error("Error executing SQL query:", error);
  }
  return res.json(data);
});

userRouter.get("/services", async (req, res) => {
  const keywords = req.query.keywords;

  //   if (keywords === undefined) {
  //     return res.status(400).json({
  //       message: "Please send keywords parameter in the URL endpoint",
  //     });
  //   }
  const { data, error } = await supabase.from("services").select(
    `
    name,
    image,
    categories(name),
    sub_services (price)
    `
  );

  // .ilike("name", `%${keywords}%`);
  console.log(data);
  if (error) {
    console.error("Error executing SQL query:", error);
  }
  return res.json(data);
});

export default userRouter;
