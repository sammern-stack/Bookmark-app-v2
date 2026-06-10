import { useThemeStore } from "@/stores";
import { Icon } from "@/components/shared";

export const PageLogo = () => (
  <div className="home__logo">
    <Icon name={`logo-${useThemeStore.getState().theme}-theme`} />
  </div>
);
