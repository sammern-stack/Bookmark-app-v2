import { useThemeStore } from "@/stores";
import { Icon } from "@/components/shared";
import avatar from "@/assets/images/image-avatar.webp";

export const ProfileMenu = () => {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <>
      <div className="home__profile-header">
        <img src={avatar} alt="user's profile icon" width="40" height="40" />

        <div className="home__profile-info">
          <div className="home__profile-username">Username</div>
          <div className="home__profile-email">example@gmail.com</div>
        </div>
      </div>

      <div className="home__theme">
        <Icon name="icon-theme" />

        <div className="home__theme-text">Theme</div>

        <div className="home__theme-switch" onClick={() => toggleTheme()}>
          <div
            className={theme === "light" ? "home__theme-switch--active" : ""}
          >
            <Icon name="icon-light-theme" />
          </div>

          <div className={theme === "dark" ? "home__theme-switch--active" : ""}>
            <Icon name="icon-dark-theme" />
          </div>
        </div>
      </div>

      <div className="home__profile-logout">
        <Icon name="icon-logout" />
        <span>Logout</span>
      </div>
    </>
  );
};
