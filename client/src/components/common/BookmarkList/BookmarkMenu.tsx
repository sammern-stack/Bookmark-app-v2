import { useBookmarksStore } from "@/stores";
import { Icon } from "@/components/shared";
import type { BookmarkModel } from "@/types";

interface BookmarkMenuProps {
  bookmark: BookmarkModel;
}

export const BookmarkMenu = ({ bookmark: b }: BookmarkMenuProps) => {
  const deleteBookmark = useBookmarksStore((s) => s.deleteBookmark);
  const updateIsArchived = useBookmarksStore((s) => s.updateIsArchived);
  const updatePinned = useBookmarksStore((s) => s.updatePinned);

  return (
    <>
      <div className="bookmark__menu-item">
        <Icon name="icon-visit" />
        Visit
      </div>

      <div className="bookmark__menu-item">
        <Icon name="icon-copy" />
        Copy URL
      </div>

      {!b.isArchived && (
        <>
          <div
            className="bookmark__menu-item"
            onClick={() => {
              const confirm = window.confirm(
                b.pinned
                  ? "Do you want to unpinned this bookmark?"
                  : "Do you want to pin this bookmark?",
              );
              if (confirm) updatePinned(b._id);
            }}
          >
            {b.pinned ? (
              <>
                <Icon name="icon-unpin" />
                Unpin
              </>
            ) : (
              <>
                <Icon name="icon-pin" />
                Pin
              </>
            )}
          </div>

          <div className="bookmark__menu-item">
            <Icon name="icon-edit" />
            Edit
          </div>
        </>
      )}

      <div
        className="bookmark__menu-item"
        onClick={() => {
          const confirm = window.confirm(
            b.isArchived
              ? "Do you want to move this bookmark to the active list?"
              : "Do you want to archive this bookmark?",
          );
          if (confirm) updateIsArchived(b._id);
        }}
      >
        {b.isArchived ? (
          <>
            <Icon name="icon-unarchive" />
            Unarchive
          </>
        ) : (
          <>
            <Icon name="icon-archive" />
            Archive
          </>
        )}
      </div>

      {b.isArchived && (
        <div
          className="bookmark__menu-item"
          onClick={() => {
            const confirm = window.confirm(
              "Do you want to delete this bookmark?",
            );
            if (confirm) deleteBookmark(b._id);
          }}
        >
          <Icon name="icon-delete" />
          Delete Permanently
        </div>
      )}
    </>
  );
};
