<<<<<<< HEAD
import { Icon, PageLogo } from "@/components/shared";
=======
// ——— Imports —————————————————————————————————————————————————————————————————
import { PageLogo } from "@/components/common";
import { Icon } from "@/components/shared";
>>>>>>> 46d30b80cf70a4709323a2879ce057762ee46b49
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
