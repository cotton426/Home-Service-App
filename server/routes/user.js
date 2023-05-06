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
    service_id,
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
    note,
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
        note,
      },
    ])
    .select("order_id");

  // console.log(newOrder[0].order_id);

  if (newOrderError) {
    console.error("Error inserting order:", newOrderError);
    return res.status(400).json({ error: newOrderError.message });
  }

  const newCart = cart.map((item) => {
    delete item.price;
    return item;
  });

  console.log(newCart);

  const { order_id } = newOrder[0];
  const addCart = newCart.map((subService) => {
    return { ...subService, order_id: order_id };
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
    .select("*, order_items(*, sub_services(name,unit))")
    .filter("profile_id", "eq", profile_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ error: error.message });
  }
  console.log(data);
  return res.json(data);
});

userRouter.post("/check-promotion", async (req, res) => {
  console.log("req body:", req.body);
  const { promotionCode } = req.body;
  if (!promotionCode) {
    return res
      .status(400)
      .json({ message: "Please provide a promotion code." });
  }

  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .filter("promotion_code", "eq", promotionCode)
    .single();

  if (error) {
    console.error("Error fetching promotion code:", error);
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ message: "Promotion code not found." });
  }

  const currentDate = new Date();
  const expDate = new Date(data.exp_date);
  const expTime = new Date(data.exp_time);

  if (currentDate > expDate || currentDate > expTime) {
    return res.status(400).json({ message: "Promotion code has expired." });
  }

  if (data.quantity_used >= data.useable_quantity) {
    return res
      .status(400)
      .json({ message: "Promotion code has reached its usage limit." });
  }
  console.log("res is here :", data);
  return res.json({
    valid: true,
    ...data,
  });
});

export default userRouter;
