import axios from "@/shared/lib/axios";
import { requestHandler } from "@/shared/utils/requestHandler";

import type {
  BookmarkSchema,
  BookmarkFilters,
  BookmarkCreateBody,
  BookmarkUpdateBody,
} from "../types";

const BASE_URL = "/api/bookmark";

export const bookmarkApi = {
  getAll: (filters?: BookmarkFilters) =>
    requestHandler<BookmarkSchema[], BookmarkFilters>((params) =>
      axios({
        url: BASE_URL,
        method: "GET",
        params,
      }),
    )(filters),

  getById: (bookmarkId: string) =>
    requestHandler<BookmarkSchema>(() =>
      axios({
        url: `${BASE_URL}/${bookmarkId}`,
        method: "GET",
      }),
    )(),

  create: (bookmark: BookmarkCreateBody) =>
    requestHandler<BookmarkSchema>(() =>
      axios({
        url: BASE_URL,
        method: "POST",
        data: bookmark,
      }),
    )(),

  update: (bookmarkId: string, updates: BookmarkUpdateBody) =>
    requestHandler<BookmarkSchema>(() =>
      axios({
        url: `${BASE_URL}/${bookmarkId}`,
        method: "PUT",
        data: updates,
      }),
    )(),

  delete: (bookmarkId: string) =>
    requestHandler<void>(() =>
      axios({
        url: `${BASE_URL}/${bookmarkId}`,
        method: "DELETE",
      }),
    )(),

  updateIsArchived: (bookmarkId: string) =>
    requestHandler<void>(() =>
      axios({
        url: `${BASE_URL}/archive/${bookmarkId}`,
        method: "PATCH",
      }),
    )(),

  updatePinned: (bookmarkId: string) =>
    requestHandler<void>(() =>
      axios({
        url: `${BASE_URL}/pin/${bookmarkId}`,
        method: "PATCH",
      }),
    )(),

  increaseVisitCount: (bookmarkId: string) =>
    requestHandler<void>(() =>
      axios({
        url: `${BASE_URL}/visit-count/${bookmarkId}`,
        method: "PATCH",
      }),
    )(),
};
