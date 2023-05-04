import express from "express";
import authRouter from "./routes/auth.js";
import dataRouter from "./routes/data.js";
import userRouter from "./routes/user.js";
import cors from "cors";

const init = async () => {
  const app = express();
  const port = 4000;

  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/auth", authRouter);
  app.use("/data", dataRouter);
  app.use("/user", userRouter);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
};
 
init();
