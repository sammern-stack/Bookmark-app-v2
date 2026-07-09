//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError.js";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

type TErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
// All for parameters are required to let the Express know that its for error handing

//—————————————————————————————————————————————————————————————————
// Helper
//—————————————————————————————————————————————————————————————————

const createErrObj = (message: string): object => ({ ok: false, message });

//—————————————————————————————————————————————————————————————————
// Error Handler
//—————————————————————————————————————————————————————————————————

export const errorHandler: TErrorHandler = (error, req, res, next) => {
  // Errors thrown using AppError.ts
  if (error instanceof AppError) {
    const { statusCode, message } = error;
    res.status(statusCode).json(createErrObj(message));
    return;
  }

  // Catch Unknown Errors
  console.log(`Unexpected Error: ${error}`);
  const message =
    process.env.NODE_ENV === "production"
      ? "Something when wrong"
      : error instanceof Error
        ? error.message
        : "Unknown Error";
  res.status(500).json(createErrObj(message));
};
