import styles from "./BookmarkMenu.module.scss";
import { useBookmarksStore } from "@/stores";
import { useUIVisibilityStore } from "@/shared/stores";
import {
  useDeleteBookmark,
  useUpdateIsArchived,
  useUpdatePinned,
  useIncreaseVisitCount,
} from "../../hooks/useBookmarks";
import { Dropdown } from "@/shared/components";
import { BookmarkMenuItem } from "./BookmarkMenuItem";
import BookmarkMenuIcon from "@/assets/images/icon-menu-bookmark.svg";
import type { BookmarkModel } from "@/types";

interface BookmarkMenuProps {
  bookmark: BookmarkModel;
}

export type MenuIds =
  | "visit"
  | "copy"
  | "pin"
  | "unpin"
  | "archive"
  | "unarchive"
  | "edit"
  | "delete";

type MenuOption = {
  id: MenuIds;
  label: string;
  onClick: () => void | Promise<void>;
  href?: string;
};

const confirmAndRun = (message: string, callback: () => void) => {
  const isConfirmed = window.confirm(message);
  if (isConfirmed) callback();
};

export const BookmarkMenu = ({ bookmark: b }: BookmarkMenuProps) => {
  const { mutate: deleteBookmark } = useDeleteBookmark(b._id);
  const { mutate: updateIsArchived } = useUpdateIsArchived(b._id);
  const { mutate: updatePinned } = useUpdatePinned(b._id);
  const { mutate: increaseVisitCount } = useIncreaseVisitCount(b._id);

  const setSelectedBookmark = useBookmarksStore((s) => s.setSelectedBookmark);
  const toggle = useUIVisibilityStore((s) => s.toggle);

  const handleVisit = () => increaseVisitCount();

  const handleCopyUrl = async () => {
    try {
      if (!navigator.clipboard)
        return alert("Clipboard is not available in this context.");

      await navigator.clipboard.writeText(b.url);
      alert("Url copied");
    } catch (err) {
      alert("Failed to copy URL.");
      console.error("Failed to copy: ", err);
    }
  };

  const handleToggleArchive = () =>
    confirmAndRun(
      b.isArchived
        ? "Do you want to move this bookmark to the active list?"
        : "Do you want to archive this bookmark?",
      () => updateIsArchived(),
    );

  const handleDelete = () =>
    confirmAndRun("Do you want to delete this bookmark?", () =>
      deleteBookmark(),
    );

  const handleTogglePin = () =>
    confirmAndRun(
      b.pinned
        ? "Do you want to unpin this bookmark?"
        : "Do you want to pin this bookmark?",
      () => updatePinned(),
    );

  const handleEdit = () => {
    setSelectedBookmark(b);
    toggle("updateForm");
  };

  const baseMenuOptions: MenuOption[] = [
    { id: "visit", label: "Visit", onClick: handleVisit, href: b.url },
    { id: "copy", label: "Copy URL", onClick: handleCopyUrl },
  ];

  const archiveOption: MenuOption = {
    id: b.isArchived ? "unarchive" : "archive",
    label: b.isArchived ? "Unarchive" : "Archive",
    onClick: handleToggleArchive,
  };

  const archivedMenuOptions: MenuOption[] = [
    ...baseMenuOptions,
    archiveOption,
    { id: "delete", label: "Delete", onClick: handleDelete },
  ];

  const activeMenuOptions: MenuOption[] = [
    ...baseMenuOptions,
    {
      id: b.pinned ? "unpin" : "pin",
      label: b.pinned ? "Unpin" : "Pin",
      onClick: handleTogglePin,
    },
    { id: "edit", label: "Edit", onClick: handleEdit },
    archiveOption,
  ];

  const menuOptions = b.isArchived ? archivedMenuOptions : activeMenuOptions;

  return (
    <Dropdown className={styles.bookmarkMenu} toggle={<BookmarkMenuIcon />}>
      {menuOptions.map((item) => (
        <BookmarkMenuItem
          key={item.id}
          id={item.id}
          label={item.label}
          onClick={item.onClick}
          href={item.href}
        />
      ))}
    </Dropdown>
  );
};
