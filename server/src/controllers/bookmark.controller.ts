import type { Response, Request } from "express";
import * as bookmarkService from "../services/bookmark.service.js";
import { AppError, asyncHandler, sendSuccess } from "../utils/index.js";
import type { BookmarkFilters, IBookmark } from "../types/index.js";

export const getBookmarks = asyncHandler(
  async (req: Request<{}, {}, {}, BookmarkFilters>, res: Response) => {
    const bookmarks = await bookmarkService.getBookmarks(req.query);
    sendSuccess(res, bookmarks, 200);
  },
);

export const createBookmark = asyncHandler(
  async (req: Request<{}, {}, IBookmark>, res: Response) => {
    const bookmark = await bookmarkService.createBookmark(req.body);
    sendSuccess(res, bookmark, 200);
  },
);

export const updateIsArchived = asyncHandler(
  async (req: Request<{ id?: string }>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new AppError("Id isn't present in params", 400);

    await bookmarkService.updateIsArchived(id);
    sendSuccess(res, {}, 200);
  },
);

export const deleteBookmark = asyncHandler(
  async (req: Request<{ id?: string }>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new AppError("Id isn't present in params", 400);

    await bookmarkService.deleteBookmark(id);
    sendSuccess(res, {}, 200);
  },
);
