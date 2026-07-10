import styles from "./ProfileInfo.module.scss";
import avatar from "@/assets/images/image-avatar.webp";

export const ProfileInfo = () => {
  return (
    <div className={styles.profileInfo}>
      <img src={avatar} alt="user's profile icon" width="40" height="40" />

      <div className={styles.profileInfo__info}>
        <div className={styles.profileInfo__username}>Username</div>
        <div className={styles.profileInfo__email}>example@gmail.com</div>
      </div>
    </div>
  );
};
