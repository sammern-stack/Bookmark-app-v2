import { useUIVisibilityStore } from "@/shared/stores";
import { useCreateBookmark } from "./useBookmarks";
import { getValidationSchema } from "../utils/getValidationSchema";
import { getInitialValues } from "../utils/getInitialValues";
import { normalizeTags } from "@/shared/utils/formatters";
import type { FormikObject } from "@/shared/types/formik.types";
import type { BookmarkFormValues } from "../types";

type OnSubmit = FormikObject<BookmarkFormValues>["onSubmit"];

export const useBookmarkCreateForm = (): FormikObject<BookmarkFormValues> => {
  const { mutateAsync: createBookmark } = useCreateBookmark();

  const onSubmit: OnSubmit = async (values, { setFieldError }) => {
    try {
      const newBookmark = { ...values, tags: normalizeTags(values.tags) };
      await createBookmark(newBookmark);
      useUIVisibilityStore.getState().toggle("createForm");
    } catch (err) {
      console.log(err);
      setFieldError("error", "Error occurred");
    }
  };

  return {
    initialValues: getInitialValues(),
    validationSchema: getValidationSchema(),
    onSubmit,
  };
};
