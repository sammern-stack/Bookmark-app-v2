// ——— Imports —————————————————————————————————————————————————————————————————
import type { FormikObject } from "@/components/shared/FormikForm";
import * as Yup from "yup";
import { useBookmarksStore } from "@/stores";

type CreateBookmark = {
  title: string;
  url: string;
  description: string;
  tags: string;
};

// ——— Create Bookmark Form ————————————————————————————————————————————————————
export const useCreateForm = (): FormikObject<CreateBookmark> => ({
  initialValues: {
    title: "",
    url: "",
    description: "",
    tags: "",
  },

  validationSchema: Yup.object({
    title: Yup.string().required("Title is required"),
    url: Yup.string().required("Url is required").url("Invalid url"),
    description: Yup.string().required("Description is required"),
    tags: Yup.string().required("At lease on tag is required"),
  }),

  onSubmit: async (values, { setFieldError }) => {
    try {
      const { createBookmark, closeForm } = useBookmarksStore.getState();

      const normalizeTag = values.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      await createBookmark({ ...values, tags: normalizeTag });
      closeForm();
    } catch (err) {
      console.log(err);
      setFieldError("error", "Error occurred");
    }
  },
});
