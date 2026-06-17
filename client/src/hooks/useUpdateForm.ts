// ——— Imports —————————————————————————————————————————————————————————————————
import type { FormikObject } from "@/components/shared/FormikForm";
import * as Yup from "yup";
import { useBookmarksStore, useFormStore } from "@/stores";
import type { BookmarkModel } from "@/types";

type UpdateBookmark = {
  title: string;
  url: string;
  description: string;
  tags: string;
};

type UseUpdateFormProps = BookmarkModel | null;

// ——— Update Bookmark Form ————————————————————————————————————————————————————
export const useUpdateForm = (
  bookmark: UseUpdateFormProps,
): FormikObject<UpdateBookmark> | null => {
  if (bookmark === null) return null;

  return {
    initialValues: {
      title: bookmark.title,
      url: bookmark.url,
      description: bookmark.description,
      tags: bookmark.tags.join(", "),
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      url: Yup.string().required("Url is required").url("Invalid url"),
      description: Yup.string().required("Description is required"),
      tags: Yup.string().required("At lease on tag is required"),
    }),

    onSubmit: async (values, { setFieldError }) => {
      try {
        const { updateBookmark } = useBookmarksStore.getState();

        const normalizeTag = values.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);

        await updateBookmark(bookmark._id, { ...values, tags: normalizeTag });

        // close the update form state in the form store
        useFormStore.getState().setUpdateFormState("close");
      } catch (err) {
        console.log(err);
        setFieldError("error", "Error occurred");
      }
    },
  };
};
