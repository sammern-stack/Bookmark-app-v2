import type { ComponentPropsWithoutRef, ElementType } from "react";

type LabelProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: string | number;
  icon?: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

export const Label = <T extends ElementType>({
  as,
  className,
  children,
  icon,
  ...props
}: LabelProps<T>) => {
  const Component = as || "div";

  return (
    <Component className={className} {...props}>
      {icon && icon}
      {children}
    </Component>
  );
};
