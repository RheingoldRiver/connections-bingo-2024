import clsx from "clsx";
import { useDrag, useDrop } from "react-dnd";
import { useEffect, useRef, useContext, useCallback } from "react";
import { Book, COLORS, DisplayType } from "../GameStateProvider/constants";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import TitleAndAuthor from "./TitleAndAuthor";
import Overlay from "./Overlay";
import TextOnlyHeader from "./TextOnlyHeader";
import DragHandle from "./DragHandle";
import ExternalLink from "./ExternalLink";

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
      isHovered: monitor.isOver({ shallow: true }) && monitor.getItem() !== null,
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
        "flex",
        displayType === DisplayType.Text && "flex-col gap-1",
        book.eliminated ? "invisible -order-1 h-0" : "h-48 max-h-[15vh]",
        book.eliminated ? "px-1 md:px-2" : "p-1 border my-1"
      )}
      onClick={() => doClick(book)}
      disabled={book.eliminated || gameOver}
    >
      {displayType === DisplayType.Text && <TextOnlyHeader book={book} gameOver={gameOver} ref={dragRefCallback} />}
      <div
        className="relative w-full flex justify-center flex-col grow bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: displayType === DisplayType.Image ? `url(/${book.image})` : "unset",
        }}
      >
        {displayType === DisplayType.Overlay && <Overlay book={book} />}
        {(displayType === DisplayType.Overlay || displayType === DisplayType.Text) && (
          <TitleAndAuthor book={book} displayType={displayType} />
        )}
      </div>
      {displayType !== DisplayType.Text && (
        <>
          <DragHandle
            book={book}
            gameOver={gameOver}
            ref={dragRefCallback}
            className="absolute top-1 left-1 md:top-2 md:left-2"
          />
          <ExternalLink book={book} className="absolute top-1 right-1 md:top-2 md:right-2" />
        </>
      )}
    </button>
  );
}
