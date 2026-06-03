//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import type { Request, Response, NextFunction, RequestHandler } from "express";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

type TAsyncHandler = (
  fn: RequestHandler,
) => (req: Request, res: Response, next: NextFunction) => void;

//—————————————————————————————————————————————————————————————————
// Async Handler
//—————————————————————————————————————————————————————————————————

export const asyncHandler: TAsyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
