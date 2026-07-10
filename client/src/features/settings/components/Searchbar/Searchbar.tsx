import styles from "./Searchbar.module.scss";
import { Container } from "@/shared/components";
import SearchIcon from "@/assets/images/icon-search.svg";

export const Searchbar = () => {
  return (
    <Container className={styles.searchbar} variant="stacked">
      <SearchIcon />
      <input type="text" placeholder="Search by title..." />
    </Container>
  );
};
