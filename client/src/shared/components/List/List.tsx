import styles from "./List.module.scss";

interface ListProps<T> {
  className?: string;
  list: T[];
  children: (val: T) => React.ReactNode;
}

export const List = <T,>({ className, list, children }: ListProps<T>) => {
  return (
    <div className={`${styles.list} ${className || ""}`}>
      {list.map(children)}
    </div>
  );
};
