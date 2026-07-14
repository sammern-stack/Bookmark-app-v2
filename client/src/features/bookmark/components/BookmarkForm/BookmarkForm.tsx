import styles from "./BookmarkForm.module.scss";
import { useUIVisibilityStore } from "@/shared/stores";
import { useBookmarksStore } from "../../stores/bookmarkStore";
import { useBookmarkForm } from "../../hooks/useBookmarkForm";
import { Form, FormField } from "@/shared/components";
import CloseIcon from "@/assets/images/icon-close.svg";
import { useShallow } from "zustand/shallow";

export const BookmarkForm = () => {
  const selectedBookmark = useBookmarksStore((s) => s.selectedBookmark);

  const activeForm = useBookmarksStore((s) => s.activeForm);
  const closeForm = useBookmarksStore((s) => s.closeForm);

  const createFormik = useBookmarkForm();
  const updateFormik = useBookmarkForm(selectedBookmark);

  const { createFormFlag, updateFormFlag } = useUIVisibilityStore(
    useShallow((s) => ({
      createFormFlag: s.visibilityFlags.createForm,
      updateFormFlag: s.visibilityFlags.updateForm,
    })),
  );

  const handleCloseForm = () => closeForm();

  if (
    !activeForm ||
    (activeForm === "create" && !createFormFlag) ||
    (activeForm === "update" && (!updateFormFlag || !selectedBookmark))
  )
    return null;

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
