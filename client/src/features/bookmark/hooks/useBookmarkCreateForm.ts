import { useBookmarksStore, useFormStore } from "@/stores";
import { getValidationSchema } from "../utils/getValidationSchema";
import { getInitialValues } from "../utils/getInitialValues";
import { normalizeTags } from "@/shared/utils/formatters";
import type { FormikObject } from "@/shared/types/formik.types";
import type { BookmarkFormValues } from "../types";

export const useBookmarkCreateForm = (): FormikObject<BookmarkFormValues> => {
  const createBookmark = useBookmarksStore.getState().createBookmark;
  const setCreateFormState = useFormStore.getState().setCreateFormState;

  return {
    initialValues: getInitialValues(),
    validationSchema: getValidationSchema(),

    onSubmit: async (values, { setFieldError }) => {
      try {
        const newBookmark = { ...values, tags: normalizeTags(values.tags) };
        await createBookmark(newBookmark);
        setCreateFormState("close");
      } catch (err) {
        console.log(err);
        setFieldError("error", "Error occurred");
      }
    },
  };
};
