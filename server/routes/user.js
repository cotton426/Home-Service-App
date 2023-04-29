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
  console.log(keywords);
  //   if (keywords === undefined) {
  //     return res.status(400).json({
  //       message: "Please send keywords parameter in the URL endpoint",
  //     });
  //   }
  if (keywords === undefined) {
    let { data, error } = await supabase.from("services").select(
      `
    name,
    image,
    categories(name),
    sub_services (price)
    `
    );

    console.log(data);
    console.log(error);
    if (error) {
      console.error("Error executing SQL query:", error);
    }
    return res.json(data);
  } else {
    let { data, error } = await supabase
      .from("services")
      .select(
        `
    name,
    image,
    categories(name),
    sub_services (price)
    `
      )
      .ilike("name", `%${keywords}%`);
    if (error) {
      console.error("Error executing SQL query:", error);
    }
    return res.json(data);
  }

  // .ilike("name", `%${keywords}%`);
});

export default userRouter;
