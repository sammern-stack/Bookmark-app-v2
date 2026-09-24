import styles from "./Dialog.module.scss";
import { useDialogStore } from "@/shared/stores/dialogStore";
import {
  BookmarkCreateDialog,
  BookmarkUpdateDialog,
} from "@/features/bookmark";
import CloseIcon from "@/assets/images/icon-close.svg?react";

export const Dialog = () => {
  const dialog = useDialogStore((s) => s.dialog);
  const { closeDialog } = useDialogStore.getState();

  if (!dialog) return null;

  const handleClose = () => closeDialog();

  return (
    <>
      <div className={styles.dialog}>
        <button className={styles.dialog__close} onClick={handleClose}>
          <CloseIcon />
        </button>
        {dialog.type === "updateBookmark" && (
          <BookmarkUpdateDialog bookmark={dialog.payload} />
        )}
        {dialog.type === "createBookmark" && <BookmarkCreateDialog />}
      </div>
      <div className={styles.dialog__backdrop} onClick={handleClose}></div>
    </>
  );
};
