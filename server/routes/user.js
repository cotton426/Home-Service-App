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
      service_id,
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
        service_id,
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
    price: total_price,
    address,
    date: booking_date,
    useTime: booking_time,
    subdistrict: sub_district,
    district,
    province,
    cart,
  } = req.body;

  console.log("data:", {
    profile_id,
    status,
    total_price,
    address,
    sub_district,
    district,
    province,
    booking_date,
    booking_time,
    staff_id,
  });

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
  const orderCode = generateOrderCode(orderCountToday, booking_date);
  const staff_id = "1";
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
        sub_district,
        district,
        province,
        booking_date,
        booking_time,
        staff_id,
        sub_district,
        district,
        province,
      },
    ])
    .select("order_id");

  // console.log(newOrder[0].order_id);

  if (newOrderError) {
    console.error("Error inserting order:", newOrderError);
    return res.status(400).json({ error: newOrderError.message });
  }

  const newCart = cart.map(item => {delete item.price
    return item
  })

  console.log(newCart);

  const { order_id } = newOrder[0];
  const addCart = newCart.map((subService) => {
    return {...subService, order_id : order_id}
  });

  console.log(addCart);

  const { data: orderItem, error: insertSubServiceError } = await supabase
    .from("order_items")
    .insert(addCart)
    .select("*");

  if (insertSubServiceError) {
    console.error("Error inserting data:", insertSubServiceError);
    return res.status(400).json({ error: insertSubServiceError.message });
  }

  return res.json(newOrder);
});

userRouter.get("/orders", async (req, res) => {
  const profile_id = req.query.profile_id;
  if (!profile_id) {
    return res.status(400).json({ message: "Please provide a profile_id." });
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .filter("profile_id", "eq", profile_id);

  if (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
});


export default userRouter;
