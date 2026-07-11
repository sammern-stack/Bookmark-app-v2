import styles from "./BookmarkMenu.module.scss";
import { Label } from "@/shared/components";
import type { MenuIds } from "./BookmarkMenu";

import VisitIcon from "@/assets/images/icon-visit.svg";
import CopyIcon from "@/assets/images/icon-copy.svg";
import PinIcon from "@/assets/images/icon-pin.svg";
import UnpinIcon from "@/assets/images/icon-unpin.svg";
import ArchiveIcon from "@/assets/images/icon-archive.svg";
import UnarchiveIcon from "@/assets/images/icon-unarchive.svg";
import EditIcon from "@/assets/images/icon-edit.svg";
import DeleteIcon from "@/assets/images/icon-delete.svg";

interface BookmarkMenuItemProps {
  id: MenuIds;
  label: string;
  onClick: () => void | Promise<void>;
  href?: string;
}

export const BookmarkMenuItem = ({
  id,
  label,
  onClick,
  href = "#",
}: BookmarkMenuItemProps) => {
  const iconById: Record<MenuIds, React.ReactNode> = {
    visit: <VisitIcon />,
    copy: <CopyIcon />,
    pin: <PinIcon />,
    unpin: <UnpinIcon />,
    archive: <ArchiveIcon />,
    unarchive: <UnarchiveIcon />,
    edit: <EditIcon />,
    delete: <DeleteIcon />,
  };

  const icon = iconById[id];

  return (
    <Label
      {...(id === "visit" && {
        as: "a",
        href,
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      className={styles.bookmarkMenu__item}
      onClick={onClick}
      icon={icon}
    >
      {label}
    </Label>
  );
};
