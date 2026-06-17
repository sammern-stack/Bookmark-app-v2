// ——— Imports —————————————————————————————————————————————————————————————————
import { useFormStore } from "@/stores";
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
  | ({ form: "update" } & BaseProps<T>)
  | ({ form: "auth" } & BaseProps<T>);

// ——— Form Component ——————————————————————————————————————————————————————————
export const FormikForm = <T extends object>(props: FormikFormProps<T>) => {
  const setCreateFormState = useFormStore((s) => s.setCreateFormState);
  const setUpdateFormState = useFormStore((s) => s.setUpdateFormState);

  const handleCloseForm = () =>
    props.form === "create"
      ? setCreateFormState("close")
      : setUpdateFormState("close");

  const classNames = {
    form: `${props.className}__form`,
    actions: `${props.className}__actions`,
    submit: `${props.className}__action--submit`,
    cancel: `${props.className}__action--cancel`,
  };

  const renderCancelBtn = () =>
    props.form === "create" || props.form === "update" ? (
      <button className={classNames.cancel} onClick={handleCloseForm}>
        Cancel
      </button>
    ) : null;

  return (
    <Formik {...props.formik}>
      {({ isSubmitting }) => (
        <Form className={classNames.form}>
          {props.children}

          <div className={classNames.actions}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={classNames.submit}
            >
              {isSubmitting ? props.submittingLabel : props.submitLabel}
            </button>

            {renderCancelBtn()}
          </div>
        </Form>
      )}
    </Formik>
  );
};
