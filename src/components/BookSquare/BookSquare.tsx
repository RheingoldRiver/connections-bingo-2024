import clsx from "clsx";
import { useDrag, useDrop } from "react-dnd";
import { useEffect, useRef, useContext, useCallback } from "react";
import { Book, COLORS, DisplayType } from "../GameStateProvider/constants";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { ArrowTopRightOnSquareIcon, Bars4Icon } from "@heroicons/react/24/outline";

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
  const { doSwap, gameOver, displayType } = useContext(GameStateContext);

  let bg = "bg-gray-200 dark:bg-gray-800";
  if (book.eliminated) {
    bg = COLORS[book.category.difficulty].bg;
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
        "rounded-md text-center transition",
        isHovered ? "brightness-50" : "hover:brightness-90",
        bg,
        book.eliminated || gameOver ? "cursor-not-allowed" : "cursor-pointer",
        "w-full",
        "text-xs md:text-sm",
        isDragging ? "opacity-50" : "",
        isHovered ? "border-amber-500" : "",
        "relative",
        book.eliminated ? "invisible -order-1 h-0" : "h-48 max-h-[15vh]",
        book.eliminated ? "px-1 md:px-2" : "p-1 md:p-2 border my-1"
      )}
      onClick={() => doClick(book)}
      disabled={book.eliminated || gameOver}
    >
      {/* Drag handle */}

      <div
        className="relative w-full h-full flex justify-center flex-col bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: displayType === DisplayType.Image ? `url(/${book.image})` : "unset",
        }}
      >
        {displayType === DisplayType.Overlay && (
          <div className="absolute inset-0">
            <div
              className="bg-cover bg-center bg-no-repeat opacity-50 w-full h-full"
              style={{
                backgroundImage: `url(/${book.image})`,
              }}
            />
          </div>
        )}

        {(displayType === DisplayType.Overlay || displayType === DisplayType.Text) && (
          <div
            className={clsx("relative", displayType === DisplayType.Overlay && "bg-gray-100/70 dark:bg-gray-800/60")}
          >
            <div
              className={clsx(
                "md:font-bold",
                book.eliminated && COLORS[book.category.difficulty]?.text
                  ? COLORS[book.category.difficulty].text
                  : "dark:text-gray-100"
              )}
            >
              {book.title}
              {book.subtitle && <span className="hidden lg:inline">: {book.subtitle}</span>}
            </div>
            <div
              className={clsx(
                "text-xs text-gray-600 hidden md:block",
                book.eliminated && COLORS[book.category.difficulty]?.text
                  ? COLORS[book.category.difficulty].text
                  : "dark:text-gray-100"
              )}
            >
              {book.author}
            </div>
          </div>
        )}
      </div>
      <div
        ref={dragRefCallback}
        className={clsx(
          "active:cursor-grabbing absolute top-1 left-1 md:top-2 md:left-2",
          gameOver || book.eliminated ? "cursor-not-allowed" : "cursor-grab"
        )}
      >
        <Bars4Icon
          className={clsx(
            "h-4 w-4 md:h-5 md:w-5 text-gray-800",
            book.eliminated && COLORS[book.category.difficulty]?.text
              ? COLORS[book.category.difficulty].text
              : "dark:text-gray-100"
          )}
        />
      </div>
      <a
        className="absolute top-1 right-1 md:top-2 md:right-2"
        href={book.url}
        target="_blank"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ArrowTopRightOnSquareIcon
          className={clsx(
            "h-4 w-4 md:h-5 md:w-5 text-gray-800",
            book.eliminated && COLORS[book.category.difficulty]?.text
              ? COLORS[book.category.difficulty].text
              : "dark:text-gray-100"
          )}
        />
      </a>
    </button>
  );
}
