// ——— Imports —————————————————————————————————————————————————————————————————
import { Formik, Form, type FormikHelpers } from "formik";
import type { ObjectSchema, AnyObject } from "yup";

// ——— Types ———————————————————————————————————————————————————————————————————
export type FormikObject<T extends object> = {
  initialValues: T;
  validationSchema: ObjectSchema<AnyObject>;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void;
};

interface FormikFormProps<T extends object> {
  formik: FormikObject<T>;
  submitLabel: string;
  submittingLabel: string;
  children: React.ReactNode;
  className: string;
}

// ——— Form Component ——————————————————————————————————————————————————————————
export const FormikForm = <T extends object>(props: FormikFormProps<T>) => (
  <Formik {...props.formik}>
    {({ isSubmitting }) => (
      <Form className={`${props.className}__form`}>
        {props.children}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${props.className}__submit`}
        >
          {isSubmitting ? props.submittingLabel : props.submitLabel}
        </button>
      </Form>
    )}
  </Formik>
);
