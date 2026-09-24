import * as Yup from "yup";
import type { FormikConfig } from "formik";
import type { BookmarkSchema, BookmarkUpdateBody } from "../types";
import { normalizeTags } from "@/shared/utils/formatters";
import { useUpdateBookmark } from "./useBookmarks";
import { useDialogStore } from "@/shared/stores/dialogStore";

export const useUpdateBookmarkForm = (
  bookmark: BookmarkSchema,
): FormikConfig<Omit<BookmarkUpdateBody, "tags"> & { tags?: string }> => {
  const { mutate: updateBookmark } = useUpdateBookmark(bookmark._id);
  const closeDialog = useDialogStore((s) => s.closeDialog);

  return {
    initialValues: {
      title: bookmark.title,
      description: bookmark.description,
      tags: bookmark.tags.join(", "),
      url: bookmark.url,
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      description: Yup.string().required(),
      tags: Yup.string().required(),
      url: Yup.string().required(),
    }),
    onSubmit: (values, { setFieldError }) => {
      const bookmark = {
        ...values,
        tags: values.tags ? normalizeTags(values.tags) : [],
      };

      updateBookmark(bookmark, {
        onSuccess: () => {
          closeDialog();
        },
        onError: () => setFieldError("error", "Error occurred"),
      });
    },
  };
};
