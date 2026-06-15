import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  className: string;
  toggleEl: React.ReactElement;
  menuEl: React.ReactElement;
}

export const Dropdown = (props: DropdownProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const toggleMenu = () => setOpenMenu((prev) => (prev ? false : true));

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!openMenu) return;

      const target = event.target as Node | null;
      if (menuRef.current && target && !menuRef.current.contains(target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, [openMenu]);

  return (
    <div className={`${props.className}__menu`} ref={menuRef}>
      <div className={`${props.className}__toggle-menu`} onClick={toggleMenu}>
        {props.toggleEl}
      </div>

      {openMenu && (
        <div className={`${props.className}__dropdown-menu`}>
          {props.menuEl}
        </div>
      )}
    </div>
  );
};
