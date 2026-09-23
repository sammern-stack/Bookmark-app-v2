import type { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "default" | "primary" | "secondary";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  className?: string;
  variant: ButtonVariant;
  children: React.ReactNode;
}

export const Button = ({
  className,
  variant,
  children,
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    className,
    styles.button,
    styles[`button--${variant}`],
  ].join(" ");

  return (
    <button type="button" className={buttonClasses} {...props}>
      {children}
    </button>
  );
};
