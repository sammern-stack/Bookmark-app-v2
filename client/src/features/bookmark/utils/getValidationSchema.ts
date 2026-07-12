import * as Yup from "yup";
import type { BookmarkFormValues } from "../types";
import type { FormikObject } from "@/shared/types/formik.types";

type ValidationSchema = FormikObject<BookmarkFormValues>["validationSchema"];
export const getValidationSchema = (): ValidationSchema => {
  return Yup.object({
    title: Yup.string().required("Title is required"),
    url: Yup.string().required("Url is required").url("Invalid url"),
    description: Yup.string().required("Description is required"),
    tags: Yup.string().required("At least one tag is required"),
  });
};
