// ——— Imports —————————————————————————————————————————————————————————————————
import { Types, type HydratedDocument } from "mongoose";
import Bookmark from "../models/Bookmark.js";

import type {
  BookmarkModel,
  BookmarkFilters,
  IBookmark,
} from "../types/index.js";

import { AppError } from "../utils/AppError.js";

// ——— Types ———————————————————————————————————————————————————————————————————
type BookmarkDocument = HydratedDocument<BookmarkModel>;

type TFnNeedsId = (id: string) => Promise<void>;
type GetBookmarks = (filters: BookmarkFilters) => Promise<BookmarkModel[]>;
type CreateBookmark = (bookmark: IBookmark) => Promise<BookmarkModel>;
type UpdateBookmark = (
  id: string,
  updates: IBookmark,
) => Promise<BookmarkModel>;

// ——— Helpers —————————————————————————————————————————————————————————————————
const searchBookmark = async (id: string): Promise<BookmarkDocument> => {
  const validId = Types.ObjectId.isValid(id);
  if (!validId) throw new AppError("Invalid ID format", 400);

  const bookmark = await Bookmark.findById(id);
  if (!bookmark) throw new AppError("Bookmark was not found", 404);

  return bookmark;
};

// ——— Services ————————————————————————————————————————————————————————————————
export const getBookmarks: GetBookmarks = async (filters) => {
  const query: Record<string, unknown> = {};

  if (filters.isArchived) query.isArchived = filters.isArchived;
  if (filters.tags) query.tags = { $all: filters.tags };

  return Bookmark.find(query);
};

export const createBookmark: CreateBookmark = async (body) => {
  const urlExists = await Bookmark.findOne({ url: body.url });
  if (urlExists)
    throw new AppError("Bookmark with the same url already exists", 409);

  return Bookmark.create(body);
};

export const updateIsArchived: TFnNeedsId = async (id) => {
  const bookmark = await searchBookmark(id);

  if (!bookmark.pinned) {
    await Bookmark.findByIdAndUpdate(id, { isArchived: !bookmark.isArchived });
    return;
  }

  await Bookmark.findByIdAndUpdate(id, { pinned: false, isArchived: true });
};

export const updatePinned: TFnNeedsId = async (id) => {
  const bookmark = await searchBookmark(id);
  await Bookmark.findByIdAndUpdate(id, { pinned: !bookmark.pinned });
};

export const updateBookmark: UpdateBookmark = async (id, updates) => {
  await searchBookmark(id);

  const updatedBookmark = await Bookmark.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!updatedBookmark) throw new AppError("Bookmark was not found", 404);

  return updatedBookmark;
};

export const increaseVisitCount: TFnNeedsId = async (id) => {
  const bookmark = await searchBookmark(id);
  await Bookmark.findByIdAndUpdate(id, {
    visitCount: bookmark.visitCount + 1,
    lastVisited: Date.now(),
  });
};

export const deleteBookmark: TFnNeedsId = async (id) => {
  await searchBookmark(id);
  await Bookmark.findByIdAndDelete(id);
};
