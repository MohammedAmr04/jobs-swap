// routes/index.ts
import { Router } from "express";
import jobRoutes from "./job.routes.js";

const apiRouter = Router();

apiRouter.use("/jobs", jobRoutes);

export default apiRouter;
