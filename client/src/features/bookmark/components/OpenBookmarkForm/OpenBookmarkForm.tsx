import styles from "./OpenBookmarkForm.module.scss";
import { useFormStore } from "@/stores";
import AddIcon from "@/assets/images/icon-add.svg";

export const OpenBookmarkForm = () => {
  const setCreateFormState = useFormStore((s) => s.setCreateFormState);
  const handleOpenForm = () => setCreateFormState("open");

  return (
    <button className={styles.openBookmarkForm} onClick={handleOpenForm}>
      <AddIcon />
      <span>Add Bookmark</span>
    </button>
  );
};
