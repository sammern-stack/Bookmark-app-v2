// ——— Imports —————————————————————————————————————————————————————————————————
import api from "./axios";
import { apiCall } from "./apiCall";

import type {
  BookmarkModel,
  BookmarkFilters,
  RequestFn,
  IBookmark,
} from "../types";

// ——— Types ———————————————————————————————————————————————————————————————————
type GetBookmarks = (filter: BookmarkFilters) => RequestFn<BookmarkModel[]>;
type CreateBookmark = (bookmark: IBookmark) => RequestFn<BookmarkModel>;
type UpdateIsArchived = (id: string) => RequestFn<void>;
type DeleteBookmark = (id: string) => RequestFn<void>;

// ——— Api Requests ————————————————————————————————————————————————————————————
export const getBookmarksRequest: GetBookmarks = async (filter) =>
  apiCall(() => api.get("/", { params: filter }));

export const createBookmarkRequest: CreateBookmark = (bookmark) =>
  apiCall(() => api.post("/", bookmark));

export const updateIsArchived: UpdateIsArchived = async (id) =>
  apiCall(() => api.patch(`/archive/${id}`));

export const deleteBookmark: DeleteBookmark = async (id) =>
  apiCall(() => api.delete(`/${id}`));
