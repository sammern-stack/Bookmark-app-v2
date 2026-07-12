import { useUIVisibilityStore } from "@/shared/stores";
import { useUpdateBookmark } from "./useBookmarks";
import { normalizeTags } from "@/shared/utils/formatters";
import { getValidationSchema } from "../utils/getValidationSchema";
import { getInitialValues } from "../utils/getInitialValues";
import type { FormikObject } from "@/shared/types/formik.types";
import type { BookmarkFormValues, BookmarkSchema } from "../types";

type OnSubmit = FormikObject<BookmarkFormValues>["onSubmit"];

export const useBookmarkUpdateForm = (
  bookmark: BookmarkSchema | null,
): FormikObject<BookmarkFormValues> | null => {
  const bookmarkId = bookmark?._id ?? "";
  const { mutateAsync: updateBookmark } = useUpdateBookmark(bookmarkId);

  if (!bookmark) return null;

  const onSubmit: OnSubmit = async (values, { setFieldError }) => {
    try {
      const updatedBookmark = { ...values, tags: normalizeTags(values.tags) };
      await updateBookmark(updatedBookmark);
      useUIVisibilityStore.getState().toggle("updateForm");
    } catch (err) {
      console.log(err);
      setFieldError("error", "Error occurred");
    }
  };

  return {
    initialValues: getInitialValues(bookmark),
    validationSchema: getValidationSchema(),
    onSubmit,
  };
};
