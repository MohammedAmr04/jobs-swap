import { Router } from "express";
import {
  applyToJob,
  createJob,
  getJobs,
  ignoreJob,
} from "../controllers/job.controller.js";

const router = Router();

router.post("/create", createJob);
router.get("/", getJobs);
router.post("/apply", applyToJob);
router.post("/ignore", ignoreJob);

export default router;
