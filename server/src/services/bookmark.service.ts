import Bookmark from "../models/Bookmark.js";

import type {
  BookmarkModel,
  BookmarkFilters,
  IBookmark,
} from "../types/index.js";

type GetBookmarks = (filters: BookmarkFilters) => Promise<BookmarkModel[]>;
type CreateBookmark = (bookmark: IBookmark) => Promise<BookmarkModel>;

export const getBookmarks: GetBookmarks = async (filters) => {
  const query: Record<string, unknown> = {};

  if (filters.isArchived) query.isArchived = filters.isArchived;
  if (filters.tags) query.tags = { $all: filters.tags };

  return Bookmark.find(query);
};

export const createBookmark: CreateBookmark = async (body) => {
  const urlExists = await Bookmark.findOne({ url: body.url });
  if (urlExists) throw new Error("Bookmark with the same url already exists");

  return Bookmark.create(body);
};
