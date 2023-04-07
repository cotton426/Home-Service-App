import express from "express";
import authRouter from "./routes/auth.js";
const init = async () => {
  const app = express();
  const port = 4000;

  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/auth", authRouter);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
};

init();
