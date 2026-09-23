import styles from "./PageHeader.module.scss";
import { useUIVisibilityStore } from "@/shared/stores";
import { Searchbar, ThemeSwitch } from "@/features/settings";
import { useBookmarksStore } from "@/features/bookmark";
import { ProfileIcon, ProfileInfo, LogoutButton } from "@/features/profile";
import { Dropdown, Button } from "@/shared/components";
import HamburgerIcon from "@/assets/images/icon-menu-hamburger.svg?react";
import PlusIcon from "@/assets/images/icon-add.svg";

export const PageHeader = () => {
  const toggle = useUIVisibilityStore((s) => s.toggle);
  const openCreateForm = useBookmarksStore((s) => s.openCreateForm);

  const handleOpenCreateBookmarkForm = () => openCreateForm();
  const handleToggleSidebar = () => toggle("bookmarkSidebar");

  // TODO: remove it when implement responsive design
  const isMobile = false;

  return (
    <div className={styles.pageHeader}>
      {isMobile && (
        <button
          className={styles.pageHeader__hamburgerMenu}
          onClick={handleToggleSidebar}
        >
          <HamburgerIcon />
        </button>
      )}
      <Searchbar />
      <Button variant="primary" onClick={handleOpenCreateBookmarkForm}>
        <PlusIcon /> Add Bookmark
      </Button>
      <Dropdown className={styles.pageHeader__profile} toggle={<ProfileIcon />}>
        <ProfileInfo />
        <ThemeSwitch />
        <LogoutButton />
      </Dropdown>
    </div>
  );
};
