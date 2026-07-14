import styles from "./Form.module.scss";
import { Formik, Form as FormikForm } from "formik";
import type { FormikObject } from "@/shared/types/formik.types";
import { useBookmarksStore } from "@/features/bookmark/stores/bookmarkStore";

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
  const closeForm = useBookmarksStore((s) => s.closeForm);
  const handleCloseForm = () => closeForm();

  return (
    <Formik {...formik}>
      {({ isSubmitting }) => {
        const [submitLabel, submittingLabel] = submit;
        const showCancelBtn = form === "create" || form === "update";
        const submitBtnLabel = isSubmitting ? submittingLabel : submitLabel;

        return (
          <FormikForm className={styles.form}>
            {children}

            <div className={styles.form__actions}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.form__submit}
              >
                {submitBtnLabel}
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
