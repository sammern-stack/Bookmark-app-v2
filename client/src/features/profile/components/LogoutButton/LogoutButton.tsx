import styles from "./LogoutButton.module.scss";
import LogoutIcon from "@/assets/images/icon-logout.svg";

export const LogoutButton = () => {
  return (
    <div className={styles.logoutButton}>
      <LogoutIcon />
      <span>Logout</span>
    </div>
  );
};
