import type { PropsWithChildren } from "react";
import styles from "./PageLayout.module.scss";

interface PageLayoutProps extends PropsWithChildren {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const PageLayout = ({ children, header, sidebar }: PageLayoutProps) => {
  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>{header}</header>
      <aside className={styles.layout__sidebar}>{sidebar}</aside>
      <main className={styles.layout__main}>{children}</main>
    </div>
  );
};
