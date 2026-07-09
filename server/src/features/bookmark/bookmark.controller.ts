import type { Response, Request } from "express";
import * as bookmarkService from "./bookmark.service.js";

import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import { sendSuccess } from "@/shared/utils/apiResponse.js";

import type {
  GetAllRequest,
  GetOneRequest,
  CreateRequest,
  UpdateRequest,
  DeleteRequest,
} from "@/shared/types/express.types.js";
import type {
  BookmarkFilterQuery,
  BookmarkCreateBody,
  BookmarkUpdateBody,
} from "./bookmark.types.js";

export const getBookmarks = asyncHandler(
  async (req: GetAllRequest<BookmarkFilterQuery>, res: Response) => {
    const bookmarks = await bookmarkService.getBookmarks(req.query);
    sendSuccess(res, 200, "Bookmarks fetched successfully", bookmarks);
  },
);

export const createBookmark = asyncHandler(
  async (req: CreateRequest<BookmarkCreateBody>, res: Response) => {
    const bookmark = await bookmarkService.createBookmark(req.body);
    sendSuccess(res, 200, "Bookmark created successfully", bookmark);
  },
);

export const updateBookmark = asyncHandler(
  async (req: UpdateRequest<BookmarkUpdateBody>, res: Response) => {
    const updatedBookmark = await bookmarkService.updateBookmark(
      req.params.id!,
      req.body,
    );
    sendSuccess(res, 200, "Bookmark updated successfully", updatedBookmark);
  },
);

export const deleteBookmark = asyncHandler(
  async (req: DeleteRequest, res: Response) => {
    await bookmarkService.deleteBookmark(req.params.id!);
    sendSuccess(res, 200, "Bookmark deleted successfully", {});
  },
);

export const updateIsArchived = asyncHandler(
  async (req: GetOneRequest, res: Response) => {
    await bookmarkService.updateIsArchived(req.params.id!);
    sendSuccess(res, 200, "Bookmark archived status updated successfully", {});
  },
);

export const updatePinned = asyncHandler(
  async (req: GetOneRequest, res: Response) => {
    await bookmarkService.updatePinned(req.params.id!);
    sendSuccess(res, 200, "Bookmark pinned status updated successfully", {});
  },
);

export const increaseVisitCount = asyncHandler(
  async (req: GetOneRequest, res: Response) => {
    await bookmarkService.increaseVisitCount(req.params.id!);
    sendSuccess(res, 200, "Bookmark visit count increased successfully", {});
  },
);
