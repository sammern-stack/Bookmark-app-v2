import styles from "./AppLogo.module.scss";
import { useThemeStore } from "@/stores/useThemeStore";
import LightThemeLogo from "@/assets/images/logo-dark-theme.svg";
import DarkThemeLogo from "@/assets/images/logo-light-theme.svg";

export const AppLogo = () => {
  const theme = useThemeStore((s) => s.theme);

  return (
    <div className={styles.appLogo}>
      {theme === "dark" ? <LightThemeLogo /> : <DarkThemeLogo />}
    </div>
  );
};
