import * as Toolbar from "@radix-ui/react-toolbar";
import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

export const ToolbarButton = ({
  children,
  ...props
}: { children: ReactNode } & Toolbar.ToolbarButtonProps & React.RefAttributes<HTMLButtonElement>) => {
  return (
    <Toolbar.Button
      {...props}
      className={clsx(
        "cursor-pointer p0 px-1 md:p-2 rounded mb-2",
        "shadow-sm shadow-zinc-900 dark:shadow-none dark:border dark:border-zinc-500",
        "text-xs md:text-md",
        props.className
      )}
    >
      {children}
    </Toolbar.Button>
  );
};

export const ToolbarText = ({ children, ...props }: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={clsx(
        "p0 px-1 md:px-2 rounded mb-2",
        "text-xs md:text-lg",
        "border border-transparent",
        props.className
      )}
    >
      {children}
    </div>
  );
};

export const Button = ({
  children,
  ...rest
}: { children: ReactNode } & Toolbar.ToolbarButtonProps & React.RefAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(
        "cursor-pointer p0 px-1 md:p-2 rounded mb-2",
        "shadow-sm shadow-zinc-900 dark:shadow-none dark:border dark:border-zinc-500",
        "text-xs md:text-md"
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
