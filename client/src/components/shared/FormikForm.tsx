// ——— Imports —————————————————————————————————————————————————————————————————
import { useBookmarksStore } from "@/stores";
import { Formik, Form, type FormikHelpers } from "formik";
import type { ObjectSchema, AnyObject } from "yup";

// ——— Types ———————————————————————————————————————————————————————————————————
export type FormikObject<T extends object> = {
  initialValues: T;
  validationSchema: ObjectSchema<AnyObject>;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void;
};

interface BaseProps<T extends object> {
  formik: FormikObject<T>;
  submitLabel: string;
  submittingLabel: string;
  children: React.ReactNode;
  className: string;
}

type FormikFormProps<T extends object> =
  | ({ form: "create" } & BaseProps<T>)
  | ({ form: "auth" } & BaseProps<T>);

// ——— Form Component ——————————————————————————————————————————————————————————
export const FormikForm = <T extends object>(props: FormikFormProps<T>) => (
  <Formik {...props.formik}>
    {({ isSubmitting }) => (
      <Form className={`${props.className}__form`}>
        {props.children}

        <div className={`${props.className}__actions`}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${props.className}__action--submit`}
          >
            {isSubmitting ? props.submittingLabel : props.submitLabel}
          </button>

          {props.form === "create" && (
            <button
              className={`${props.className}__action--cancel`}
              onClick={() => useBookmarksStore.getState().closeForm()}
            >
              Cancel
            </button>
          )}
        </div>
      </Form>
    )}
  </Formik>
);
