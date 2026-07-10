import { AppLogo } from "@/shared/components";
import CloseIcon from "@/assets/images/icon-close.svg?react";
import "./styles.scss";

// ——— Component ———————————————————————————————————————————————————————————————
export const NavHeader = () => {
  const isDesktop = false;

  return (
    <div className="home__nav-header">
      <AppLogo />
      <div className="home__nav-close">
        {isDesktop ? <CloseIcon /> : undefined}
      </div>
    </div>
  );
};
