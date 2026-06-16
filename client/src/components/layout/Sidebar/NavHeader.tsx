// ——— Imports —————————————————————————————————————————————————————————————————
import { PageLogo } from "@/components/shared";
import { Icon } from "@/components/shared";
import "./styles.scss";

// ——— Component ———————————————————————————————————————————————————————————————
export const NavHeader = () => {
  const isDesktop = false;

  const renderCloseBtn = () => {
    if (!isDesktop) return undefined;
    return <Icon name="icon-close" />;
  };

  return (
    <div className="home__nav-header">
      <PageLogo />

      <div className="home__nav-close">{renderCloseBtn()}</div>
    </div>
  );
};
