import clsx from "clsx";
import { useDrag, useDrop } from "react-dnd";
import { useEffect, useRef, useContext, useCallback } from "react";
import { Book } from "../GameStateProvider/constants";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { Bars4Icon } from "@heroicons/react/24/outline";

type DifficultyColors = {
  [key: number]: { bg: string; text?: string };
};

const colors: DifficultyColors = {
  1: { bg: "bg-orange-300 dark:bg-orange-800" },
  2: { bg: "bg-yellow-200 dark:bg-yellow-400", text: "dark:text-black" },
  3: { bg: "bg-green-300 dark:bg-green-800" },
  4: { bg: "bg-blue-300 dark:bg-blue-800" },
  5: { bg: "bg-purple-300 dark:bg-purple-800" },
};

export default function BookSquare({
  book,
  doClick,
  isSelected,
  parentIndex,
}: {
  book: Book;
  doClick: (book: Book) => void;
  isSelected: boolean;
  parentIndex: number;
}) {
  const { doSwap } = useContext(GameStateContext);

  let bg = "bg-gray-200 dark:bg-gray-800";
  if (book.eliminated) {
    bg = colors[book.category.difficulty].bg;
  } else if (isSelected) {
    bg = "bg-red-300 dark:bg-red-800";
  }

  // Create a reference for the whole button
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Dragging logic
  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: "BOOK",
    item: { index: parentIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Dropping logic
  const [{ isHovered }, dropRef] = useDrop({
    accept: "BOOK",
    drop: ({ index }: { index: number }, monitor) => {
      if (monitor.didDrop()) return;
      doSwap(index, parentIndex);
    },
    collect: (monitor) => ({
      isHovered: monitor.isOver({ shallow: true }) && monitor.getItem() !== null, // ✅ Fix hover persistence
    }),
  });

  // use the entire book when previewing a drag, not just the grippy thing
  useEffect(() => {
    if (previewRef && buttonRef.current) {
      previewRef(buttonRef.current);
    }
  }, [previewRef, buttonRef]);

  const dragRefCallback = useCallback(
    (node: HTMLElement | null) => {
      dragRef(node);
    },
    [dragRef]
  );

  return (
    <button
      ref={(node) => {
        buttonRef.current = node;
        dropRef(node);
      }}
      className={clsx(
        "p-1 md:p-2 border rounded-md text-center transition",
        isHovered ? "brightness-50" : "hover:brightness-90",
        bg,
        book.eliminated ? "cursor-not-allowed" : "cursor-pointer",
        "w-48 h-48 max-h-[15vh] max-w-[19vw]",
        "text-xs md:text-sm",
        isDragging ? "opacity-50" : "",
        isHovered ? "border-amber-500" : "",
        "relative"
      )}
      onClick={() => doClick(book)}
      disabled={book.eliminated}
    >
      {/* Drag handle */}
      <div
        ref={dragRefCallback}
        className="cursor-grab active:cursor-grabbing absolute top-1 right-1 md:top-2 md:right-2"
      >
        <Bars4Icon
          className={clsx(
            "h-4 w-4 md:h-5 md:w-5 text-gray-800",
            book.eliminated && colors[book.category.difficulty]?.text
              ? colors[book.category.difficulty].text
              : "dark:text-gray-100"
          )}
        />
      </div>

      <div
        className={clsx(
          "md:font-bold",
          book.eliminated && colors[book.category.difficulty]?.text
            ? colors[book.category.difficulty].text
            : "dark:text-gray-100"
        )}
      >
        {book.title}
        {book.subtitle && <span className="hidden lg:inline">: {book.subtitle}</span>}
      </div>
      <div
        className={clsx(
          "text-xs text-gray-600 hidden md:block",
          book.eliminated && colors[book.category.difficulty]?.text
            ? colors[book.category.difficulty].text
            : "dark:text-gray-100"
        )}
      >
        {book.author}
      </div>
    </button>
  );
}
