import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { sendResponse } from "../utils/response.js";

interface CreateJobRequestBody {
  title: string;
  description: string;
  company: string;
}

export const createJob = async (
  req: Request<{}, {}, CreateJobRequestBody>,
  res: Response,
) => {
  const { title, description, company } = req.body;
  try {
    const newJob = await prisma.job.create({
      data: { title, description, company },
    });
    sendResponse(res, 201, "Job created successfully", newJob);
  } catch (err) {
    sendResponse(res, 500, "Failed to create job", null, err);
  }
};

export const getJobs = async (
  req: Request<{}, { userId: string }>,
  res: Response,
) => {
  const { userId } = req.query;

  try {
    let whereClause = {};

    if (userId) {
      whereClause = {
        AND: [
          { applies: { none: { userId: Number(userId) } } },
          { ignoredBy: { none: { userId: Number(userId) } } },
        ],
      };
    }
    const jobs = await prisma.job.findMany({
      where: whereClause,
    });
    sendResponse(res, 200, "Jobs fetched successfully", jobs);
  } catch (err) {
    sendResponse(res, 500, "Error fetching jobs", null, err);
  }
};

export const ignoreJob = async (req: Request, res: Response) => {
  const { userId, jobId } = req.body;
  try {
    await prisma.ignoredJob.create({
      data: { userId, jobId },
    });
    sendResponse(res, 200, "Job added to ignore list");
  } catch (err) {
    sendResponse(
      res,
      400,
      "Error ignoring job (Maybe already ignored)",
      null,
      err,
    );
  }
};
export const applyToJob = async (
  req: Request<{}, {}, { userId: string; jobId: string }>,
  res: Response,
) => {
  const { userId, jobId } = req.body;

  if (!userId || !jobId) {
    return sendResponse(res, 400, "userId and jobId are required");
  }

  try {
    const application = await prisma.appliedJob.create({
      data: {
        userId: Number(userId),
        jobId: Number(jobId),
      },
    });

    sendResponse(res, 201, "Applied to job successfully", application);
  } catch (err: any) {
    if (err.code === "P2002") {
      return sendResponse(res, 400, "You have already applied to this job");
    }
    sendResponse(
      res,
      500,
      "Internal server error during application",
      null,
      err,
    );
  }
};
