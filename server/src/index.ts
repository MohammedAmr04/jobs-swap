import express, { Response } from "express";
import cors from "cors";
import apiRouter from "./routes/index.js";
import dotenv from "dotenv";
import { seedJobs } from "./seeding/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.get("/", (_, res: Response) => {
  res.send({ message: "Hello, server!" });
});

app.listen(3000, "0.0.0.0", async () => {
  console.log("Server is running on port 3000");
  await seedJobs();
});
