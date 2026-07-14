import styles from "./BookmarkForms.module.scss";
import { useUIVisibilityStore } from "@/shared/stores";
import { useBookmarkForm } from "../../hooks/useBookmarkForm";
import { Form, FormField } from "@/shared/components";
import CloseIcon from "@/assets/images/icon-close.svg";

export const BookmarkCreateForm = () => {
  const formik = useBookmarkForm();
  const createFormFlag = useUIVisibilityStore(
    (s) => s.visibilityFlags.createForm,
  );
  const toggle = useUIVisibilityStore((s) => s.toggle);

  const handleCloseForm = () => {
    toggle("createForm");
  };

  if (!createFormFlag) return null;

  return (
    <div className={styles.bookmarkForm}>
      <button className={styles.bookmarkForm__close} onClick={handleCloseForm}>
        <CloseIcon />
      </button>

      <div className={styles.bookmarkForm__header}>
        <h1 className={styles.bookmarkForm__title}>Add a bookmark</h1>
        <p className={styles.bookmarkForm__description}>
          Save a link with details to keep your collection organized. We extract
          the favicon automatically from the URL.
        </p>
      </div>

      <Form
        form="create"
        formik={formik}
        submit={["Add Bookmark", "Adding..."]}
      >
        <FormField
          type="text"
          id="title"
          label="Title"
          className={styles.bookmarkForm__field}
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
