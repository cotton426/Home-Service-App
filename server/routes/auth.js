import { Router } from "express";
import { supabase } from "../utils/supabase.js";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { fullName, phoneNumber, email, password } = req.body;
  console.log(req.body);
  const { user, error } = await supabase.auth.signUp({
    fullName,
    phoneNumber,
    email,
    password,
  });
  console.log(fullName);
  console.log(phoneNumber);

  if (error) {
    console.log("Error signing up:", error.message);
  } else {
    console.log("Signed up successfully!");

    const { data, error } = await supabase.from("profiless").insert([
      {
        full_name: fullName,
        phone_number: phoneNumber,
        email: email,
        password: password,
      },
    ]);

    if (error) {
      console.log("Error creating profile:", error.message);
    } else {
      console.log("Profile created successfully!");
    }
  }

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(user);
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(user);
  //return res.json({ data: "work!!!" });
});

authRouter.post("/logout", async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: "Sign out successful" });
});

export default authRouter;
