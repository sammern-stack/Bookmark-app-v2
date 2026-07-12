import styles from "./Form.module.scss";
import { Formik, Form as FormikForm } from "formik";
import type { FormikObject } from "@/shared/types/formik.types";
import { useUIVisibilityStore } from "@/shared/stores";

type FormProps<T extends object> = {
  form: "create" | "update" | "auth";
  formik: FormikObject<T>;
  children: React.ReactNode | React.ReactNode[];
  submit: [string, string];
};

export const Form = <T extends object>({
  form,
  formik,
  children,
  submit,
}: FormProps<T>) => {
  const handleCloseForm = () =>
    useUIVisibilityStore
      .getState()
      .toggle(form === "create" ? "createForm" : "updateForm");

  return (
    <Formik {...formik}>
      {({ isSubmitting }) => {
        const submitLabel = submit[0];
        const submittingLabel = submit[1];

        const showCancelBtn = form === "create" || form === "update";

        return (
          <FormikForm className={styles.form}>
            {children}

            <div className={styles.form__actions}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.form__submit}
              >
                {isSubmitting ? submittingLabel : submitLabel}
              </button>

              {showCancelBtn && (
                <button
                  type="button"
                  className={styles.form__cancel}
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </FormikForm>
        );
      }}
    </Formik>
  );
};
