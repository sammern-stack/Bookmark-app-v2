import styles from "./ProfileIcon.module.scss";
import avatar from "@/assets/images/image-avatar.webp";

export const ProfileIcon = () => {
  return (
    <img
      className={styles.profileIcon}
      src={avatar}
      alt="profile"
      width="40"
      height="40"
    />
  );
};
