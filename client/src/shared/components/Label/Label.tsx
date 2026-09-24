import type { ComponentPropsWithoutRef, ElementType } from "react";

type LabelProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

export const Label = <T extends ElementType>({
  as,
  className,
  children,
  ...props
}: LabelProps<T>) => {
  const Component = as || "div";

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};
