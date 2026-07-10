import styles from "./PageHeader.module.scss";
import { Searchbar, ThemeSwitch } from "@/features/settings";
import { OpenBookmarkForm } from "@/features/bookmark";
import { ProfileIcon, ProfileInfo, LogoutButton } from "@/features/profile";
import { Dropdown } from "@/shared/components";
import HamburgerIcon from "@/assets/images/icon-menu-hamburger.svg";

interface PageHeaderProps {
  setSidebarOpen: (value: boolean) => void;
}

export const PageHeader = ({ setSidebarOpen }: PageHeaderProps) => {
  // TODO: remove it when implement responsive design
  const isMobile = false;

  return (
    <div className={styles.pageHeader}>
      {isMobile && (
        <button
          className={styles.pageHeader__hamburgerMenu}
          onClick={() => setSidebarOpen(true)}
        >
          <HamburgerIcon />
        </button>
      )}
      <Searchbar />
      <OpenBookmarkForm />
      <Dropdown className={styles.pageHeader__profile} toggle={<ProfileIcon />}>
        <ProfileInfo />
        <ThemeSwitch />
        <LogoutButton />
      </Dropdown>
    </div>
  );
};
