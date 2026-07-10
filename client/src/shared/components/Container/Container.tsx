import React from "react";
import styles from "./Container.module.scss";

interface ContainerProps {
  variant?: "default" | "stacked";
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}

export const Container = ({
  variant = "default",
  children,
  className,
  onClick,
}: ContainerProps) => {
  const InnerContainer = variant === "stacked" ? "div" : React.Fragment;

  const OuterContainerClasses = [styles.container, className].join(" ");
  const InnerContainerProps =
    variant === "stacked" ? { "data-stacked-container": true } : {};

  return (
    <div className={OuterContainerClasses} onClick={onClick}>
      <InnerContainer {...InnerContainerProps}>{children}</InnerContainer>
    </div>
  );
};
