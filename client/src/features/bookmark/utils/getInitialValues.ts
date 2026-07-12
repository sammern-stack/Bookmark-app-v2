import type { BookmarkFormValues, BookmarkSchema } from "../types";

export const getInitialValues = (
  bookmark?: BookmarkSchema,
): BookmarkFormValues => {
  // if (!bookmark) {
  //   return {
  //     title: "",
  //     url: "",
  //     description: "",
  //     tags: "",
  //   };
  // }

  return {
    title: bookmark?.title ?? "",
    url: bookmark?.url ?? "",
    description: bookmark?.description ?? "",
    tags: bookmark?.tags.join(", ") ?? "",
  };
};
