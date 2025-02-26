import { forwardRef } from "react";
import clsx from "clsx";
import { Bars4Icon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Book, COLORS } from "../GameStateProvider/constants";

const DragHandle = forwardRef<HTMLDivElement, { book: Book; gameOver: boolean; className?: string }>(
  ({ book, gameOver, className }, ref) => {
    const Handle = gameOver ? LockClosedIcon : Bars4Icon;
    return (
      <div
        ref={ref}
        className={clsx("active:cursor-grabbing", gameOver || book.eliminated ? "cursor-not-allowed" : "cursor-grab")}
      >
        <Handle
          className={clsx(
            className,
            "h-4 w-4 md:h-5 md:w-5 text-gray-800",
            book.eliminated && COLORS[book.category.difficulty]?.text
              ? COLORS[book.category.difficulty].text
              : "dark:text-gray-100"
          )}
        />
      </div>
    );
  }
);

export default DragHandle;
