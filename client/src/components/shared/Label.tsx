import { Icon } from "./Icon";

type LabelProps = {
  className?: string;
  label: string | number;
  icon?: string;
};

export const Label = ({ className, label, icon }: LabelProps) => {
  return (
    <div className={className}>
      {icon && <Icon name={icon} />}
      {label}
    </div>
  );
};
