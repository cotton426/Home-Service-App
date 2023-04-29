import { Router } from "express";
import { supabase } from "../utils/supabase.js";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { fullName, phoneNumber, email, password } = req.body;
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    fullName,
    phoneNumber,
    email,
    password,
  });

  if (error) {
    console.log("Error signing up:", error.message);
  } else {
    console.log("Signed up successfully!");

    const { data, error } = await supabase.from("profiles").insert([
      {
        full_name: fullName,
        phone_number: phoneNumber,
        user_id: user.id,
      },
    ]);
    if (error) {
      console.log("Error creating profile:", error.message);
      return res.status(400).json({ error: error.message });
    } else {
      console.log("Profile created successfully!");
    }
  }

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(user);
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(401).json({ error: error.message });
  let { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", data.user.id);

  return res.status(200).json({ data, profiles });
});

authRouter.post("/logout", async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: "Sign out successful" });
});



export default authRouter;
