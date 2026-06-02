//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import type { Response } from "express";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

type TSendSuccess = (
  res: Response,
  data: unknown,
  code?: number,
  meta?: Record<string, unknown>,
  message?: string,
) => void;

type TSendError = (res: Response, message: string, code?: number) => void;

//—————————————————————————————————————————————————————————————————
// Api Response Utilities
//—————————————————————————————————————————————————————————————————

export const sendSuccess: TSendSuccess = (res, data, code, meta, message) => {
  res.status(code ?? 200).json({
    ok: true,
    data,
    ...(meta && { meta }),
    ...(message && { message }),
  });
};

export const sendError: TSendError = (res, message, code) => {
  res.status(code ?? 500).json({ ok: false, message });
};
