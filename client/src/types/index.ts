// MODELS
export interface BookmarkModel {
  _id: string;
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  lastVisited: string;
  createdAt: string;
  updatedAt: string;
}

export type BookmarkFilters = {
  tags?: string[];
  isArchived?: boolean;
};

export interface IBookmark {
  title: string;
  url: string;
  description: string;
  tags: string[];
}

// AXIOS TYPES
export type Meta = Record<string, unknown>;

export type ApiResponse<T> =
  | { ok: true; data: T; meta?: Meta; message?: string }
  | { ok: false; message: string };

export type RequestFn<T> = Promise<ApiResponse<T>>;
export type AxiosFn<T> = () => Promise<{ data: ApiResponse<T> }>;
