import { useBookmarksStore, useFormStore } from "@/stores";
import { normalizeTags } from "@/shared/utils/formatters";
import { getValidationSchema } from "../utils/getValidationSchema";
import { getInitialValues } from "../utils/getInitialValues";
import type { FormikObject } from "@/shared/types/formik.types";
import type { BookmarkFormValues, BookmarkSchema } from "../types";

type UseUpdateFormProps = BookmarkSchema | null;

export const useBookmarkUpdateForm = (
  bookmark: UseUpdateFormProps,
): FormikObject<BookmarkFormValues> | null => {
  const updateBookmark = useBookmarksStore.getState().updateBookmark;
  const setUpdateFormState = useFormStore.getState().setUpdateFormState;

  if (bookmark === null) return null;

  return {
    initialValues: getInitialValues(bookmark),
    validationSchema: getValidationSchema(),

    onSubmit: async (values, { setFieldError }) => {
      try {
        const updatedBookmark = { ...values, tags: normalizeTags(values.tags) };
        await updateBookmark(bookmark._id, updatedBookmark);
        setUpdateFormState("close");
      } catch (err) {
        console.log(err);
        setFieldError("error", "Error occurred");
      }
    },
  };
};
