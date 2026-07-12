import { useBookmarksStore } from "@/stores";
import { useUIVisibilityStore } from "@/shared/stores";
import { getValidationSchema } from "../utils/getValidationSchema";
import { getInitialValues } from "../utils/getInitialValues";
import { normalizeTags } from "@/shared/utils/formatters";
import type { FormikObject } from "@/shared/types/formik.types";
import type { BookmarkFormValues } from "../types";

export const useBookmarkCreateForm = (): FormikObject<BookmarkFormValues> => {
  return {
    initialValues: getInitialValues(),
    validationSchema: getValidationSchema(),

    onSubmit: async (values, { setFieldError }) => {
      try {
        const newBookmark = { ...values, tags: normalizeTags(values.tags) };
        await useBookmarksStore.getState().createBookmark(newBookmark);
        useUIVisibilityStore.getState().toggle("createForm");
      } catch (err) {
        console.log(err);
        setFieldError("error", "Error occurred");
      }
    },
  };
};
