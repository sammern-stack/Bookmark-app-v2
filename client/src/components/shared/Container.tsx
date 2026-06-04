import type React from "react";

type BaseProps = {
  className: string;
  children: React.ReactNode;
};

type ContainerProps =
  | ({ variant: "clickable"; onClick: () => void } & BaseProps)
  | ({ variant: "simple" } & BaseProps);

export const Container = (props: ContainerProps) => {
  const { className, variant, children } = props;

  const applyProps = {
    className,
    ...(variant === "clickable" && { onClick: props.onClick }),
  };

  return (
    <div {...applyProps}>
      <div className={`${className}--wrapper`}>{children}</div>
    </div>
  );
};
