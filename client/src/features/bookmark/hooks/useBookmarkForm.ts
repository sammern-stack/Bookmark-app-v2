import * as Yup from "yup";
import { useCreateBookmark, useUpdateBookmark } from "./useBookmarks";
import { useUIVisibilityStore } from "@/shared/stores";
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
      if (isEditMode) {
        const newBookmark = { ...values, tags: normalizeTags(values.tags) };
        await createBookmark(newBookmark);
        useUIVisibilityStore.getState().toggle("createForm");
      } else {
        const updatedBookmark = { ...values, tags: normalizeTags(values.tags) };
        await updateBookmark(updatedBookmark);
        useUIVisibilityStore.getState().toggle("updateForm");
      }
    } catch (err) {
      console.log(err);
      setFieldError("error", "Error occurred");
    }
  };

  return { initialValues, validationSchema, onSubmit };
};
