import type { Response } from "express";

export const sendSuccess = (
  res: Response,
  statusCode: number,
  message: string,
  data: unknown = {},
  meta: Record<string, unknown> = {},
): void => {
  const success = { ok: true, message, data, meta };
  res.status(statusCode).json(success);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
): void => {
  const failed = { ok: false, message };
  res.status(statusCode).json(failed);
};
