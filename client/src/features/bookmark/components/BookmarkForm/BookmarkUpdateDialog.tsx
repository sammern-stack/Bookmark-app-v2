import styles from "./BookmarkForm.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/shared/components";
import type { BookmarkSchema } from "../../types";
import { useUpdateBookmarkForm } from "../../hooks/useUpdateBookmarkForm";

interface BookmarkUpdateDialogProps {
  bookmark: BookmarkSchema;
}

export const BookmarkUpdateDialog = ({
  bookmark,
}: BookmarkUpdateDialogProps) => {
  const formik = useUpdateBookmarkForm(bookmark);
  return (
    <div className={styles.form}>
      <div className={styles.form__header}>
        <h1 className={styles.form__title}>Update bookmark</h1>
        <p className={styles.form__description}>
          Update your saved link details — change the title, description, URL,
          or tags anytime.
        </p>
      </div>

      <Formik {...formik}>
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.form__field}>
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" />
              <ErrorMessage name="title" component="div" />
            </div>
            <div className={styles.form__field}>
              <label htmlFor="description">Description</label>
              <Field id="description" name="description" as="textarea" />
              <ErrorMessage name="description" component="div" />
            </div>
            <div className={styles.form__field}>
              <label htmlFor="url">Url</label>
              <Field id="url" name="url" />
              <ErrorMessage name="url" component="div" />
            </div>
            <div className={styles.form__field}>
              <label htmlFor="tags">Tags</label>
              <Field id="tags" name="tags" />
              <ErrorMessage name="tags" component="div" />
            </div>
            <div className={styles.form__actions}>
              <Button type="submit" disabled={isSubmitting}>
                {!isSubmitting ? "Save Bookmark" : "Saving..."}
              </Button>
              <Button variant="secondary" className={styles.form__cancel}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
