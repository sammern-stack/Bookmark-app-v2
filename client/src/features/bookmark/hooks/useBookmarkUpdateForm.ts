import { useBookmarksStore } from "@/stores";
import { useUIVisibilityStore } from "@/shared/stores";
import { normalizeTags } from "@/shared/utils/formatters";
import { getValidationSchema } from "../utils/getValidationSchema";
import { getInitialValues } from "../utils/getInitialValues";
import type { FormikObject } from "@/shared/types/formik.types";
import type { BookmarkFormValues, BookmarkSchema } from "../types";

type UseUpdateFormProps = BookmarkSchema | null;

export const useBookmarkUpdateForm = (
  bookmark: UseUpdateFormProps,
): FormikObject<BookmarkFormValues> | null => {
  if (bookmark === null) return null;

  return {
    initialValues: getInitialValues(bookmark),
    validationSchema: getValidationSchema(),

    onSubmit: async (values, { setFieldError }) => {
      try {
        const updatedBookmark = { ...values, tags: normalizeTags(values.tags) };

        await useBookmarksStore
          .getState()
          .updateBookmark(bookmark._id, updatedBookmark);

        useUIVisibilityStore.getState().toggle("updateForm");
      } catch (err) {
        console.log(err);
        setFieldError("error", "Error occurred");
      }
    },
  };
};
