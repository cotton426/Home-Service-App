import { supabase } from "../utils/supabase";

export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const { error } = supabase.auth.api.getUser(token);

  if (error) return res.status(401).json({ error: error.message });

  next();
};
