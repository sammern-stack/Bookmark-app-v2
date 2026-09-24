import styles from "./PageHeader.module.scss";
import { ThemeSwitch } from "@/features/settings";
import { ProfileIcon, ProfileInfo, LogoutButton } from "@/features/profile";
import { useUIVisibilityStore } from "@/shared/stores";
import { Dropdown, Button } from "@/shared/components";

import HamburgerIcon from "@/assets/images/icon-menu-hamburger.svg?react";
import PlusIcon from "@/assets/images/icon-add.svg";
import SearchIcon from "@/assets/images/icon-search.svg";
import { useDialogStore } from "@/shared/stores/dialogStore";

export const PageHeader = () => {
  const toggle = useUIVisibilityStore((s) => s.toggle);
  const { openDialog } = useDialogStore.getState();

  const handleOpenCreateBookmarkForm = () => {
    openDialog({ type: "createBookmark", payload: null });
  };
  const handleToggleSidebar = () => toggle("bookmarkSidebar");

  return (
    <div className={styles.pageHeader}>
      <div className={styles.pageHeader__section}>
        <MobileMenu isMobile={false} onClick={handleToggleSidebar} />
        <div className={styles.pageHeader__search}>
          <SearchIcon />
          <input type="text" placeholder="Search by title..." />
        </div>
      </div>
      <div className={styles.pageHeader__section}>
        <Button variant="primary" onClick={handleOpenCreateBookmarkForm}>
          <PlusIcon /> Add Bookmark
        </Button>
        <Dropdown
          className={styles.pageHeader__profile}
          toggle={<ProfileIcon />}
        >
          <ProfileInfo />
          <ThemeSwitch />
          <LogoutButton />
        </Dropdown>
      </div>
    </div>
  );
};

interface MobileMenuProps {
  isMobile: boolean;
  onClick: () => void;
}

const MobileMenu = ({ isMobile, onClick }: MobileMenuProps) => {
  return (
    isMobile && (
      <button className={styles.pageHeader__hamburgerMenu} onClick={onClick}>
        <HamburgerIcon />
      </button>
    )
  );
};
