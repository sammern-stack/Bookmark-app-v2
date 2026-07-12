import styles from "./OpenBookmarkForm.module.scss";
import { useUIVisibilityStore } from "@/shared/stores";
import AddIcon from "@/assets/images/icon-add.svg";

export const OpenBookmarkForm = () => {
  const toggle = useUIVisibilityStore((s) => s.toggle);
  const handleOpenForm = () => toggle("createForm");

  return (
    <button className={styles.openBookmarkForm} onClick={handleOpenForm}>
      <AddIcon />
      <span>Add Bookmark</span>
    </button>
  );
};
