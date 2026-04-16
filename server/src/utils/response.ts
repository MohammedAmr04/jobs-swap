import { Response } from "express";

interface IApiResponse<T> {
  status: "success" | "error";
  message: string;
  data?: T | null;
  error?: any;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T | null = null,
  error: any = null,
): Response => {
  const responsePayload: IApiResponse<T> = {
    status: statusCode < 400 ? "success" : "error",
    message,
    data,
  };

  if (error) {
    responsePayload.error = error;
  }

  return res.status(statusCode).json(responsePayload);
};
