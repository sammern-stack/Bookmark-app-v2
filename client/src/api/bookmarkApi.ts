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
type UpdatePinned = (id: string) => RequestFn<void>;
type UpdateBookmark = (
  id: string,
  updates: IBookmark,
) => RequestFn<BookmarkModel>;
type DeleteBookmark = (id: string) => RequestFn<void>;
type IncreaseVisitCount = (id: string) => RequestFn<void>;

// ——— Api Requests ————————————————————————————————————————————————————————————
export const getBookmarksRequest: GetBookmarks = async (filter) =>
  apiCall(() => api.get("/", { params: filter }));

export const createBookmarkRequest: CreateBookmark = (bookmark) =>
  apiCall(() => api.post("/", bookmark));

export const updateIsArchivedRequest: UpdateIsArchived = async (id) =>
  apiCall(() => api.patch(`/archive/${id}`));

export const updatePinnedRequest: UpdatePinned = async (id) =>
  apiCall(() => api.patch(`/pin/${id}`));

export const increaseVisitCountRequest: IncreaseVisitCount = async (id) =>
  apiCall(() => api.patch(`/visit-count/${id}`));

export const updateBookmarkRequest: UpdateBookmark = async (id, updates) =>
  apiCall(() => api.put(`/${id}`, updates));

export const deleteBookmarkRequest: DeleteBookmark = async (id) =>
  apiCall(() => api.delete(`/${id}`));
