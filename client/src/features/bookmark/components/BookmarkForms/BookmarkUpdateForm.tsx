import styles from "./BookmarkForms.module.scss";
import { useBookmarksStore } from "@/stores";
import { useUIVisibilityStore } from "@/shared/stores";
import { useBookmarkUpdateForm } from "../../hooks/useBookmarkUpdateForm";
import { Form, FormField } from "@/shared/components";
import CloseIcon from "@/assets/images/icon-close.svg";

export const BookmarkUpdateForm = () => {
  const selectedBookmark = useBookmarksStore((s) => s.selectedBookmark);
  const formik = useBookmarkUpdateForm(selectedBookmark);
  const updateFormFlag = useUIVisibilityStore(
    (s) => s.visibilityFlags.updateForm,
  );
  const toggle = useUIVisibilityStore((s) => s.toggle);

  const handleCloseForm = () => toggle("updateForm");

  if (!updateFormFlag || !formik) return null;

  return (
    <div className={styles.bookmarkForm}>
      <button className={styles.bookmarkForm__close} onClick={handleCloseForm}>
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
  );
};
