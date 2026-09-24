import styles from "./BookmarkMenu.module.scss";
import {
  useDeleteBookmark,
  useUpdateIsArchived,
  useUpdatePinned,
  useIncreaseVisitCount,
} from "../../hooks/useBookmarks";
import { Dropdown, Label } from "@/shared/components";
import { useDialogStore } from "@/shared/stores/dialogStore";
import type { BookmarkSchema } from "../../types";
import { createBookmarkMenuOptions, type MenuIds } from "./bookmarkMenu.config";

import BookmarkMenuIcon from "@/assets/images/icon-menu-bookmark.svg?react";
import VisitIcon from "@/assets/images/icon-visit.svg?react";
import CopyIcon from "@/assets/images/icon-copy.svg?react";
import PinIcon from "@/assets/images/icon-pin.svg?react";
import UnpinIcon from "@/assets/images/icon-unpin.svg?react";
import ArchiveIcon from "@/assets/images/icon-archive.svg?react";
import UnarchiveIcon from "@/assets/images/icon-unarchive.svg?react";
import EditIcon from "@/assets/images/icon-edit.svg?react";
import DeleteIcon from "@/assets/images/icon-delete.svg?react";

interface BookmarkMenuProps {
  bookmark: BookmarkSchema;
}

export const BookmarkMenu = ({ bookmark: b }: BookmarkMenuProps) => {
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

  const { mutate: deleteBookmark } = useDeleteBookmark(b._id);
  const { mutate: updateIsArchived } = useUpdateIsArchived(b._id);
  const { mutate: updatePinned } = useUpdatePinned(b._id);
  const { mutate: increaseVisitCount } = useIncreaseVisitCount(b._id);
  const { openDialog } = useDialogStore.getState();

  const menuOptions = createBookmarkMenuOptions(b, {
    deleteBookmark,
    updateIsArchived,
    updatePinned,
    increaseVisitCount,
    openDialog,
  });

  return (
    <Dropdown className={styles.bookmarkMenu} toggle={<BookmarkMenuIcon />}>
      {menuOptions.map((item) => (
        <Label
          key={item.id}
          {...(item.id === "visit" && {
            as: "a",
            href: item.href,
            target: "_blank",
            rel: "noopener noreferrer",
          })}
          className={styles.bookmarkMenu__item}
          onClick={item.onClick}
        >
          {iconById[item.id]} {item.label}
        </Label>
      ))}
    </Dropdown>
  );
};
