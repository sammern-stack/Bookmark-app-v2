import * as Yup from "yup";
import { useCreateBookmark, useUpdateBookmark } from "./useBookmarks";
import { useBookmarksStore } from "../stores/bookmarkStore";
import { normalizeTags } from "@/shared/utils/formatters";
import type { BookmarkFormValues, BookmarkSchema } from "../types";
import type { FormikHelpers } from "formik";

type FormikObject<T> = {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void;
};

type OnSubmit = FormikObject<BookmarkFormValues>["onSubmit"];

export const useBookmarkForm = (
  bookmark?: BookmarkSchema | null,
): FormikObject<BookmarkFormValues> => {
  const bookmarkId = bookmark?._id ?? "";
  const { mutateAsync: createBookmark } = useCreateBookmark();
  const { mutateAsync: updateBookmark } = useUpdateBookmark(bookmarkId);
  const closeForm = useBookmarksStore.getState().closeForm;
  const isEditMode = Boolean(bookmark?._id);

  const initialValues = {
    title: bookmark?.title ?? "",
    url: bookmark?.url ?? "",
    description: bookmark?.description ?? "",
    tags: bookmark?.tags.join(", ") ?? "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    url: Yup.string().required("Url is required").url("Invalid url"),
    description: Yup.string().required("Description is required"),
    tags: Yup.string().required("At least one tag is required"),
  });

  const onSubmit: OnSubmit = async (values, { setFieldError }) => {
    try {
      const bookmarkData = { ...values, tags: normalizeTags(values.tags) };

      if (isEditMode) await updateBookmark(bookmarkData);
      else await createBookmark(bookmarkData);

      closeForm(isEditMode);
    } catch (err) {
      console.log(err);
      setFieldError("error", "Error occurred");
    }
  };

  return { initialValues, validationSchema, onSubmit };
};
