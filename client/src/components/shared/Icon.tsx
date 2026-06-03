import type { FC, SVGProps } from "react";

type SvgComponent = FC<SVGProps<SVGSVGElement>>;

const icons = import.meta.glob("../../assets/images/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, SvgComponent>;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const Component = icons[`../../assets/images/${name}.svg`];

  if (!Component) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <Component {...props} />;
};
