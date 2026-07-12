import styles from "./ThemeSwitch.module.scss";
import { useThemeStore } from "@/shared/stores";
import ThemeIcon from "@/assets/images/icon-theme.svg";
import LightThemeIcon from "@/assets/images/icon-light-theme.svg";
import DarkThemeIcon from "@/assets/images/icon-dark-theme.svg";

export const ThemeSwitch = () => {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const handleTheme = () => toggleTheme();

  return (
    <div className={styles.themeSwitch}>
      <ThemeIcon />
      <div className={styles.themeSwitch__text}>Theme</div>
      <div className={styles.themeSwitch__control} onClick={handleTheme}>
        <div className={theme === "light" ? styles["themeSwitch--active"] : ""}>
          <LightThemeIcon />
        </div>
        <div className={theme === "dark" ? styles["themeSwitch--active"] : ""}>
          <DarkThemeIcon />
        </div>
      </div>
    </div>
  );
};
