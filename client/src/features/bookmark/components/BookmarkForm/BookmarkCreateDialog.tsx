import styles from "./BookmarkForm.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/shared/components";
import { useCreateBookmarkForm } from "../../hooks/useCreateBookmarkForm";

export const BookmarkCreateDialog = () => {
  const formik = useCreateBookmarkForm();
  return (
    <div className={styles.form}>
      <div className={styles.form__header}>
        <h1 className={styles.form__title}>Add a bookmark</h1>
        <p className={styles.form__description}>
          Save a link with details to keep your collection organized. We extract
          the favicon automatically from the URL.
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
                {!isSubmitting ? "Create Bookmark" : "Creating..."}
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
