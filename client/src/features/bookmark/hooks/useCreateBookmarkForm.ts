import * as Yup from "yup";
import type { FormikConfig } from "formik";
import type { BookmarkCreateBody } from "../types";
import { normalizeTags } from "@/shared/utils/formatters";
import { useCreateBookmark } from "./useBookmarks";
import { useDialogStore } from "@/shared/stores/dialogStore";

export const useCreateBookmarkForm = (): FormikConfig<
  Omit<BookmarkCreateBody, "tags"> & { tags: string }
> => {
  const { mutate: createBookmark } = useCreateBookmark();
  const closeDialog = useDialogStore((s) => s.closeDialog);

  return {
    initialValues: {
      title: "",
      description: "",
      tags: "",
      url: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      description: Yup.string().required(),
      tags: Yup.string().required(),
      url: Yup.string().required(),
    }),
    onSubmit: (values, { setFieldError }) => {
      const bookmark = { ...values, tags: normalizeTags(values.tags) };

      createBookmark(bookmark, {
        onSuccess: () => {
          closeDialog();
        },
        onError: () => setFieldError("error", "Error occurred"),
      });
    },
  };
};
