// ——— Imports —————————————————————————————————————————————————————————————————
import api from "./axios";
import { apiCall } from "./apiCall";

import type {
  BookmarkModel,
  BookmarkFilters,
  RequestFn,
  IBookmark,
} from "../types";

// ——— Api Requests ————————————————————————————————————————————————————————————
export const getBookmarksRequest = (
  filter: BookmarkFilters,
): RequestFn<BookmarkModel[]> => {
  return apiCall(() => api.get("/", { params: filter }));
};

export const getBookmarkRequest = (id: string): RequestFn<BookmarkModel> => {
  return apiCall(() => api.get(`/${id}`));
};

export const createBookmarkRequest = (
  bookmark: IBookmark,
): RequestFn<BookmarkModel> => {
  return apiCall(() => api.post("/", bookmark));
};

export const updateIsArchivedRequest = (id: string): RequestFn<void> => {
  return apiCall(() => api.patch(`/archive/${id}`));
};

export const updatePinnedRequest = (id: string): RequestFn<void> => {
  return apiCall(() => api.patch(`/pin/${id}`));
};

export const increaseVisitCountRequest = (id: string): RequestFn<void> => {
  return apiCall(() => api.patch(`/visit-count/${id}`));
};

export const updateBookmarkRequest = (
  id: string,
  updates: IBookmark,
): RequestFn<BookmarkModel> => {
  return apiCall(() => api.put(`/${id}`, updates));
};

export const deleteBookmarkRequest = (id: string): RequestFn<void> => {
  return apiCall(() => api.delete(`/${id}`));
};
