import { PageLayout } from "@/layout";
import styles from "./Loading.module.scss";

const LoadingPage = () => {
  return (
    <PageLayout>
      <div className={styles.loading__spinner}>
        <p>Loading...</p>
      </div>
    </PageLayout>
  );
};

export default LoadingPage;
