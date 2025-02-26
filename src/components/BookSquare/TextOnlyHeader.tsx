import { forwardRef } from "react";
import clsx from "clsx";
import { Book } from "../GameStateProvider/constants";
import DragHandle from "./DragHandle";
import ExternalLink from "./ExternalLink";
import SquareName from "./SquareName";

const TextOnlyHeader = forwardRef<HTMLDivElement, { book: Book; gameOver: boolean }>(({ book, gameOver }, ref) => {
  return (
    <div className={clsx("top-1 md:top-2 flex justify-between w-full")}>
      <DragHandle ref={ref} book={book} gameOver={gameOver} />
      <SquareName book={book} />
      <ExternalLink book={book} />
    </div>
  );
});

export default TextOnlyHeader;
