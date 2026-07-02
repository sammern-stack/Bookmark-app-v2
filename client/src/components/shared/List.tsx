import React from "react";

interface ListProps<T> {
  className?: string;
  list: T[];
  render: (val: T) => React.ReactNode;
}

export const List = <T,>({ className, list, render }: ListProps<T>) => {
  return <div className={className}>{list.map(render)}</div>;
};
