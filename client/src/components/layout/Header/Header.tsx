import { useEffect, useRef, useState } from "react";
import { useThemeStore, useBookmarksStore } from "@/stores";
import { Icon } from "@/components/shared";
import avatar from "@/assets/images/image-avatar.webp";
import "./styles.scss";

export const Header = () => {
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const openForm = useBookmarksStore((s) => s.openForm);

  const notDesktop = false;

  const toggleMenu = () => setOpenMenu((prev) => (prev ? false : true));

  useEffect(() => {
    const closeProfileMenu = (event: MouseEvent) => {
      if (!openMenu) return;

      const target = event.target as Node | null;
      if (
        profileRef.current &&
        target &&
        !profileRef.current.contains(target)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", closeProfileMenu);
    return () => document.removeEventListener("mousedown", closeProfileMenu);
  }, [openMenu]);

  return (
    <div className="home__header">
      <div className="home__header-left">
        {notDesktop && <div className="home__hamburger-menu"></div>}

        <div className="home__search-bar">
          <Icon name="icon-search" />
          <input type="text" placeholder="Search by title..." />
        </div>
      </div>

      <div className="home__header-right">
        <button className="home__create-btn" onClick={() => openForm()}>
          <Icon name="icon-add" />
          <span>Add Bookmark</span>
        </button>

        <div className="home__profile" ref={profileRef}>
          <img
            src={avatar}
            alt="user's profile icon"
            width="40"
            height="40"
            onClick={toggleMenu}
          />

          {openMenu && (
            <div className="home__profile-menu">
              <div className="home__profile-header">
                <img
                  src={avatar}
                  alt="user's profile icon"
                  width="40"
                  height="40"
                />

                <div className="home__profile-info">
                  <div className="home__profile-username">Username</div>
                  <div className="home__profile-email">example@gmail.com</div>
                </div>
              </div>

              <div className="home__theme">
                <Icon name="icon-theme" />

                <div className="home__theme-text">Theme</div>

                <div
                  className="home__theme-switch"
                  onClick={() => toggleTheme()}
                >
                  <div
                    className={
                      theme === "light" ? "home__theme-switch--active" : ""
                    }
                  >
                    <Icon name="icon-light-theme" />
                  </div>

                  <div
                    className={
                      theme === "dark" ? "home__theme-switch--active" : ""
                    }
                  >
                    <Icon name="icon-dark-theme" />
                  </div>
                </div>
              </div>

              <div className="home__profile-logout">
                <Icon name="icon-logout" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
