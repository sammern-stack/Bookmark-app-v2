import type { FormikHelpers } from "formik";
import type { AnyObject, ObjectSchema } from "yup";

export type FormikObject<T extends object> = {
  initialValues: T;
  validationSchema: ObjectSchema<AnyObject>;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void;
};
