import type { BookmarkSchema } from "../../types";

export type MenuIds =
  | "visit"
  | "copy"
  | "pin"
  | "unpin"
  | "archive"
  | "unarchive"
  | "edit"
  | "delete";

export type MenuOption = {
  id: MenuIds;
  label: string;
  onClick: () => void | Promise<void>;
  href?: string;
};

type BookmarkMenuActions = {
  deleteBookmark: () => void;
  updateIsArchived: () => void;
  updatePinned: () => void;
  increaseVisitCount: () => void;
  openDialog: (dialog: {
    type: "updateBookmark";
    payload: BookmarkSchema;
  }) => void;
};

const confirmAndRun = (message: string, callback: () => void) => {
  if (window.confirm(message)) callback();
};

export const createBookmarkMenuOptions = (
  bookmark: BookmarkSchema,
  {
    deleteBookmark,
    updateIsArchived,
    updatePinned,
    increaseVisitCount,
    openDialog,
  }: BookmarkMenuActions,
): MenuOption[] => {
  const handleCopyUrl = async () => {
    try {
      if (!navigator.clipboard) {
        alert("Clipboard is not available in this context.");
        return;
      }

      await navigator.clipboard.writeText(bookmark.url);
      alert("Url copied");
    } catch (error) {
      alert("Failed to copy URL.");
      console.error("Failed to copy: ", error);
    }
  };

  const handleToggleArchive = () =>
    confirmAndRun(
      bookmark.isArchived
        ? "Do you want to move this bookmark to the active list?"
        : "Do you want to archive this bookmark?",
      updateIsArchived,
    );

  const handleDelete = () =>
    confirmAndRun("Do you want to delete this bookmark?", deleteBookmark);

  const handleTogglePin = () =>
    confirmAndRun(
      bookmark.pinned
        ? "Do you want to unpin this bookmark?"
        : "Do you want to pin this bookmark?",
      updatePinned,
    );

  const baseMenuOptions: MenuOption[] = [
    {
      id: "visit",
      label: "Visit",
      onClick: increaseVisitCount,
      href: bookmark.url,
    },
    { id: "copy", label: "Copy URL", onClick: handleCopyUrl },
  ];

  const archiveOption: MenuOption = {
    id: bookmark.isArchived ? "unarchive" : "archive",
    label: bookmark.isArchived ? "Unarchive" : "Archive",
    onClick: handleToggleArchive,
  };

  if (bookmark.isArchived) {
    return [
      ...baseMenuOptions,
      archiveOption,
      { id: "delete", label: "Delete", onClick: handleDelete },
    ];
  }

  return [
    ...baseMenuOptions,
    {
      id: bookmark.pinned ? "unpin" : "pin",
      label: bookmark.pinned ? "Unpin" : "Pin",
      onClick: handleTogglePin,
    },
    {
      id: "edit",
      label: "Edit",
      onClick: () => openDialog({ type: "updateBookmark", payload: bookmark }),
    },
    archiveOption,
  ];
};
