import { useBookmarksStore, useFormStore } from "@/stores";
import { Label } from "@/components/shared";
import type { BookmarkModel } from "@/types";

interface BookmarkMenuProps {
  bookmark: BookmarkModel;
}

export const BookmarkMenu = ({ bookmark: b }: BookmarkMenuProps) => {
  const deleteBookmark = useBookmarksStore((s) => s.deleteBookmark);
  const updateIsArchived = useBookmarksStore((s) => s.updateIsArchived);
  const updatePinned = useBookmarksStore((s) => s.updatePinned);
  const increaseVisitCount = useBookmarksStore((s) => s.increaseVisitCount);
  const setUpdateFormState = useFormStore((s) => s.setUpdateFormState);
  const setSelectedBookmark = useFormStore((s) => s.setSelectedBookmark);

  const handleVisit = () => increaseVisitCount(b._id);

  const handleCopyToClipboard = async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(b.url);
    alert("Url copied");
  };

  const handlePin = () => {
    const confirm = window.confirm(
      b.pinned
        ? "Do you want to unpinned this bookmark?"
        : "Do you want to pin this bookmark?",
    );
    if (confirm) updatePinned(b._id);
  };

  const handleArchive = () => {
    const confirm = window.confirm(
      b.isArchived
        ? "Do you want to move this bookmark to the active list?"
        : "Do you want to archive this bookmark?",
    );
    if (confirm) updateIsArchived(b._id);
  };

  const handleEdit = () => {
    setSelectedBookmark(b);
    setUpdateFormState("open");
  };

  const handleDelete = () => {
    const confirm = window.confirm("Do you want to delete this bookmark?");
    if (confirm) deleteBookmark(b._id);
  };

  return (
    <>
      <Label
        as="a"
        className="bookmark__menu-item"
        href={b.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleVisit}
        label="Visit"
        icon="icon-visit"
      />

      <Label
        className="bookmark__menu-item"
        onClick={handleCopyToClipboard}
        label="Copy URL"
        icon="icon-copy"
      />

      {!b.isArchived && (
        <>
          <Label
            className="bookmark__menu-item"
            onClick={handlePin}
            label={b.pinned ? "Unpin" : "Pin"}
            icon={`icon-${b.pinned ? "unpin" : "pin"}`}
          />

          <Label
            className="bookmark__menu-item"
            onClick={handleEdit}
            label="Edit"
            icon="icon-edit"
          />
        </>
      )}

      <Label
        className="bookmark__menu-item"
        onClick={handleArchive}
        label={b.isArchived ? "Unarchive" : "Archive"}
        icon={`icon-${b.isArchived ? "unarchive" : "archive"}`}
      />

      {b.isArchived && (
        <Label
          className="bookmark__menu-item"
          onClick={handleDelete}
          label="Delete Permanently"
          icon="icon-delete"
        />
      )}
    </>
  );
};
