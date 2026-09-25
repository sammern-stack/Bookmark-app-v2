import styles from "./PageLayout.module.scss";
import type { PropsWithChildren } from "react";
import { Button } from "@/shared/components";

import CloseIcon from "@/assets/images/icon-close.svg?react";
import HamburgerIcon from "@/assets/images/icon-menu-hamburger.svg?react";
import { useToggle } from "@/shared/hooks";

interface PageLayoutProps extends PropsWithChildren {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const PageLayout = ({ children, header, sidebar }: PageLayoutProps) => {
  const [aside, toggleAside] = useToggle();

  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <Button
          variant="secondary"
          className={styles.layout__hamburgerMenu}
          onClick={toggleAside}
        >
          <HamburgerIcon />
        </Button>
        <div className={styles.layout__headerContent}>{header}</div>
      </header>
      <aside
        className={[
          styles.layout__sidebar,
          aside ? styles["layout__sidebar--open"] : "",
        ].join(" ")}
      >
        <button className={styles.layout__sidebarClose} onClick={toggleAside}>
          <CloseIcon />
        </button>
        {sidebar}
      </aside>
      <main className={styles.layout__main}>{children}</main>
    </div>
  );
};
