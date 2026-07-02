import type { ComponentPropsWithoutRef, ElementType } from "react";
import { Icon } from "./Icon";

type LabelProps<T extends ElementType> = {
  as?: T;
  className?: string;
  label: string | number;
  icon?: string;
} & ComponentPropsWithoutRef<T>;

// type LabelProps<T extends ElementType> = BaseProps<T> &
//   Omit<ComponentPropsWithoutRef<T>, keyof BaseProps<T>>;

export const Label = <T extends ElementType>({
  as,
  className,
  label,
  icon,
  ...props
}: LabelProps<T>) => {
  const Component = as || "div";

  return (
    <Component className={className} {...props}>
      {icon && <Icon name={icon} />}
      {label}
    </Component>
  );
};
