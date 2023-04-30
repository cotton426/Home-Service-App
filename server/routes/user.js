import { Router } from "express";
import { supabase } from "../utils/supabase.js";
import { generateOrderCode } from "../utils/orderCode.js";

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

userRouter.post("/orders", async (req, res) => {
  console.log("Request body:", req.body);
  const {
    profile_id,
    status,
    total_price,
    address,
    booking_date,
    booking_time,
    staff_id,
  } = req.body;

  const { data: ordersToday, error: ordersTodayError } = await supabase
    .from("orders")
    .select("order_id")
    .filter("booking_date", "eq", booking_date);

  if (ordersTodayError) {
    console.error("Error fetching orders count for today:", ordersTodayError);
    return res.status(500).json({ error: ordersTodayError.message });
  }

  const orderCountToday = ordersToday.length;
  console.log("Orders count for today:", orderCountToday);

  // Generate unique order code
  const orderCode = generateOrderCode(orderCountToday);

  // Save the order to the database
  const { data: newOrder, error: newOrderError } = await supabase
    .from("orders")
    .insert([
      {
        order_code: orderCode,
        profile_id,
        status,
        total_price,
        address,
        booking_date,
        booking_time,
        staff_id,
      },
    ]);

  if (newOrderError) {
    console.error("Error inserting order:", newOrderError);
    return res.status(400).json({ error: newOrderError.message });
  }

  return res.json(newOrder);
});

userRouter.get("/orders", async (req, res) => {
  try {
    const { data, error } = await supabase.from("orders").select("*");

    if (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: error.message });
  }
});


export default userRouter;
