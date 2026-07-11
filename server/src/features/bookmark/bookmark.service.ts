// ——— Imports —————————————————————————————————————————————————————————————————
import Bookmark from "./Bookmark.model.js";
import { AppError } from "@/shared/utils/customErrors.js";
import { searchDocument } from "@/shared/utils/searchDocument.js";
import type {
  BookmarkFilterQuery,
  BookmarkCreateBody,
  BookmarkUpdateBody,
} from "./bookmark.types.js";

// ——— GET / ———————————————————————————————————————————————————————————————————————————————————————
export const getBookmarks = async (filters: BookmarkFilterQuery) => {
  const query: Record<string, unknown> = {};

  if (filters.isArchived) query.isArchived = filters.isArchived;
  if (filters.tags) query.tags = { $all: filters.tags };

  return await Bookmark.find(query);
};

export const getBookmarkById = async (bookmarkId: string) => {
  const bookmark = await searchDocument(bookmarkId, Bookmark);
  if (!bookmark) throw new AppError("Bookmark was not found", 404);
  return bookmark;
};

// ——— POST / ——————————————————————————————————————————————————————————————————————————————————————
export const createBookmark = async (bookmark: BookmarkCreateBody) => {
  const urlExists = await searchDocument({ url: bookmark.url }, Bookmark);
  if (urlExists)
    throw new AppError("Bookmark with the same url already exists", 409);

  return await Bookmark.create(bookmark);
};

// ——— PUT /:id ————————————————————————————————————————————————————————————————————————————————————
export const updateBookmark = async (
  bookmarkId: string,
  updates: BookmarkUpdateBody,
) => {
  const bookmark = await searchDocument(bookmarkId, Bookmark);
  if (!bookmark) throw new AppError("Bookmark was not found", 404);

  const updatedBookmark = await Bookmark.findByIdAndUpdate(
    bookmarkId,
    updates,
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  if (!updatedBookmark) throw new AppError("Bookmark was not found", 404);

  return updatedBookmark;
};

// ——— DELETE /:id —————————————————————————————————————————————————————————————————————————————————
export const deleteBookmark = async (bookmarkId: string) => {
  const bookmark = await searchDocument(bookmarkId, Bookmark);
  if (!bookmark) throw new AppError("Bookmark was not found", 404);
  await Bookmark.findByIdAndDelete(bookmarkId);
};

// ——— PATCH /archived/:id —————————————————————————————————————————————————————————————————————————
export const updateIsArchived = async (bookmarkId: string) => {
  const bookmark = await searchDocument(bookmarkId, Bookmark);
  if (!bookmark) throw new AppError("Bookmark was not found", 404);

  if (!bookmark.pinned) {
    await Bookmark.findByIdAndUpdate(bookmarkId, {
      isArchived: !bookmark.isArchived,
    });
    return;
  }

  await Bookmark.findByIdAndUpdate(bookmarkId, {
    pinned: false,
    isArchived: true,
  });
};

// ——— PATCH /pinned/:id ———————————————————————————————————————————————————————————————————————————
export const updatePinned = async (bookmarkId: string) => {
  const bookmark = await searchDocument(bookmarkId, Bookmark);
  if (!bookmark) throw new AppError("Bookmark was not found", 404);
  await Bookmark.findByIdAndUpdate(bookmarkId, { pinned: !bookmark.pinned });
};

// ——— PATCH /visit-count/:id ——————————————————————————————————————————————————————————————————————
export const increaseVisitCount = async (bookmarkId: string) => {
  const bookmark = await searchDocument(bookmarkId, Bookmark);
  if (!bookmark) throw new AppError("Bookmark was not found", 404);
  await Bookmark.findByIdAndUpdate(bookmarkId, {
    visitCount: bookmark.visitCount + 1,
    lastVisited: Date.now(),
  });
};
