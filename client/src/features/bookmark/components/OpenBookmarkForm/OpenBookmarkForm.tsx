import styles from "./OpenBookmarkForm.module.scss";
import { useBookmarksStore } from "../../stores/bookmarkStore";
import { useUIVisibilityStore } from "@/shared/stores";
import AddIcon from "@/assets/images/icon-add.svg";

export const OpenBookmarkForm = () => {
  const setActiveForm = useBookmarksStore((s) => s.setActiveForm);
  const toggle = useUIVisibilityStore((s) => s.toggle);
  const handleOpenForm = () => {
    setActiveForm("create");
    toggle("createForm");
  };

  return (
    <button className={styles.openBookmarkForm} onClick={handleOpenForm}>
      <AddIcon />
      <span>Add Bookmark</span>
    </button>
  );
};
