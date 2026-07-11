import styles from "./SortbyButton.module.scss";
import SortbyIcon from "@/assets/images/icon-sort.svg";

export const SortbyButton = () => {
  return (
    <div className={styles.sortbyButton}>
      <SortbyIcon />
      <span>Sort by</span>
    </div>
  );
};
