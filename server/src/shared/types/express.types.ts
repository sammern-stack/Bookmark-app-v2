import type { Request } from "express";

export type GetAllRequest<T> = Request<{}, {}, {}, T>;
export type GetOneRequest = Request<{ id?: string }>;
export type CreateRequest<T> = Request<{}, {}, T>;
export type UpdateRequest<T> = Request<{ id?: string }, {}, T>;
export type DeleteRequest = Request<{ id?: string }>;
