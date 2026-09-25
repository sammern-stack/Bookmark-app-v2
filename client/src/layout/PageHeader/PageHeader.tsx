import styles from "./PageHeader.module.scss";
import { ThemeSwitch } from "@/features/settings";
import { ProfileIcon, ProfileInfo, LogoutButton } from "@/features/profile";
import { useDialogStore } from "@/shared/stores";
import { Button } from "@/shared/components";
import { useDropdown } from "@/shared/hooks";

import PlusIcon from "@/assets/images/icon-add.svg?react";
import SearchIcon from "@/assets/images/icon-search.svg?react";

export const PageHeader = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();
  const { openDialog } = useDialogStore.getState();

  const handleOpenCreateBookmarkForm = () => {
    openDialog({ type: "createBookmark", payload: null });
  };
  
  return (
    <>
      <div className={styles.pageHeader__section}>
        <div className={styles.pageHeader__search}>
          <SearchIcon />
          <input type="text" placeholder="Search by title..." />
        </div>
      </div>
      <div className={styles.pageHeader__section}>
        <Button variant="primary" onClick={handleOpenCreateBookmarkForm}>
          <PlusIcon /> Add Bookmark
        </Button>
        <div className={styles.pageHeader__profileDropdown} ref={dropdownRef}>
          <button type="button" onClick={toggle}>
            <ProfileIcon />
          </button>

          {openDropdown && (
            <div className={styles.pageHeader__profileMenu}>
              <ProfileInfo />
              <ThemeSwitch />
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
