import styles from "./BookmarkForms.module.scss";
import { useFormStore } from "@/stores";
import { useBookmarkUpdateForm } from "../../hooks/useBookmarkUpdateForm";
import { Form, FormField } from "@/shared/components";
import CloseIcon from "@/assets/images/icon-close.svg";
// import "./styles.scss";

export const BookmarkUpdateForm = () => {
  const selectedBookmark = useFormStore((s) => s.selectedBookmark);
  const formik = useBookmarkUpdateForm(selectedBookmark);
  const updateFormState = useFormStore((s) => s.updateFormState);
  const setUpdateFormState = useFormStore((s) => s.setUpdateFormState);
  const handleCloseForm = () => setUpdateFormState("close");

  if (updateFormState === "close" || !formik) return null;

  return (
    <>
      <div className={styles.bookmarkForm}>
        <button
          className={styles.bookmarkForm__close}
          onClick={handleCloseForm}
        >
          <CloseIcon />
        </button>

        <div className={styles.bookmarkForm__header}>
          <h1 className={styles.bookmarkForm__title}>Update bookmark</h1>
          <p className={styles.bookmarkForm__description}>
            Update your saved link details — change the title, description, URL,
            or tags anytime.
          </p>
        </div>

        <Form
          form="update"
          formik={formik}
          submit={["Save Bookmark", "Saving..."]}
        >
          <FormField
            className={styles.bookmarkForm__field}
            id="title"
            type="text"
            label="Title"
          />

          <FormField
            as="textarea"
            className={styles.bookmarkForm__field}
            id="description"
            label="Description"
          />

          <FormField
            className={styles.bookmarkForm__field}
            id="url"
            type="text"
            label="Website URL"
          />

          <FormField
            className={styles.bookmarkForm__field}
            id="tags"
            type="text"
            label="Tags"
            placeholder="e.g. Design, Learning, Tools"
          />
        </Form>
      </div>

      <div className="home__backdrop"></div>
    </>
  );
};
