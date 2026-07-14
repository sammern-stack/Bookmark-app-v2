import styles from "./OpenBookmarkForm.module.scss";
import { useBookmarksStore } from "../../stores/bookmarkStore";
import AddIcon from "@/assets/images/icon-add.svg";

export const OpenBookmarkForm = () => {
  const openCreateForm = useBookmarksStore((s) => s.openCreateForm);
  const handleOpenForm = () => openCreateForm();

  return (
    <button className={styles.openBookmarkForm} onClick={handleOpenForm}>
      <AddIcon />
      <span>Add Bookmark</span>
    </button>
  );
};
