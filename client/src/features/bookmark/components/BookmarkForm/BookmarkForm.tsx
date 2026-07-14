import styles from "./BookmarkForm.module.scss";
import { useUIVisibilityStore } from "@/shared/stores";
import { useBookmarksStore } from "../../stores/bookmarkStore";
import { useBookmarkForm } from "../../hooks/useBookmarkForm";
import { Form, FormField } from "@/shared/components";
import CloseIcon from "@/assets/images/icon-close.svg";

export const BookmarkForm = () => {
  const selectedBookmark = useBookmarksStore((s) => s.selectedBookmark);
  const activeForm = useBookmarksStore((s) => s.activeForm);
  const setActiveForm = useBookmarksStore((s) => s.setActiveForm);
  const createFormik = useBookmarkForm();
  const updateFormik = useBookmarkForm(selectedBookmark);
  const createFormFlag = useUIVisibilityStore(
    (s) => s.visibilityFlags.createForm,
  );
  const updateFormFlag = useUIVisibilityStore(
    (s) => s.visibilityFlags.updateForm,
  );
  const toggle = useUIVisibilityStore((s) => s.toggle);

  const handleCloseForm = () => {
    setActiveForm(null);

    if (activeForm === "create") {
      toggle("createForm");
    }

    if (activeForm === "update") {
      toggle("updateForm");
    }
  };

  if (!activeForm) return null;
  if (activeForm === "create" && !createFormFlag) return null;
  if (activeForm === "update" && (!updateFormFlag || !selectedBookmark)) {
    return null;
  }

  const isCreateForm = activeForm === "create";
  const formik = isCreateForm ? createFormik : updateFormik;

  return (
    <div className={styles.bookmarkForm}>
      <button className={styles.bookmarkForm__close} onClick={handleCloseForm}>
        <CloseIcon />
      </button>

      <div className={styles.bookmarkForm__header}>
        <h1 className={styles.bookmarkForm__title}>
          {isCreateForm ? "Add a bookmark" : "Update bookmark"}
        </h1>
        <p className={styles.bookmarkForm__description}>
          {isCreateForm
            ? "Save a link with details to keep your collection organized. We extract the favicon automatically from the URL."
            : "Update your saved link details — change the title, description, URL, or tags anytime."}
        </p>
      </div>

      <Form
        form={activeForm}
        formik={formik}
        submit={
          isCreateForm
            ? ["Add Bookmark", "Adding..."]
            : ["Save Bookmark", "Saving..."]
        }
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
