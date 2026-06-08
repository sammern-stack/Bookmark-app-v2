import { useThemeStore, useBookmarksStore } from "@/stores";
import avatar from "@/assets/images/image-avatar.webp";
import "./styles.scss";

export const Header = () => {
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const openForm = useBookmarksStore((s) => s.openForm);

  const notDesktop = false;

  return (
    <div className="home__header">
      <div className="home__header-left">
        {notDesktop && <div className="home__hamburger-menu"></div>}

        <div className="home__search-bar">Search...</div>
      </div>

      <div className="home__header-right">
        <div className="home__create-btn" onClick={() => openForm()}>
          + Add Bookmark
        </div>

        <div className="home__profile-icon" onClick={() => toggleTheme()}>
          <img src={avatar} alt="user's profile icon" width="40" height="40" />
        </div>
      </div>
    </div>
  );
};
