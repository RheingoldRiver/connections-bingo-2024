import { useContext } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { CATEGORY_SIZE, COLORS } from "../GameStateProvider/constants";
import BookSquare from "../BookSquare/BookSquare";
import clsx from "clsx";

export default function Board() {
  const { board, doClick, currentGuess, correct } = useContext(GameStateContext);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Book Grid */}
      <div className="grid p-2" style={{ gridTemplateColumns: `repeat(${CATEGORY_SIZE}, minmax(0, 1fr))` }}>
        {correct.map((cat) => (
          <div
            className={clsx(
              "col-span-full",
              "h-48 max-h-[15vh]",
              "flex justify-center items-center text-3xl",
              "border rounded-md m-1",
              COLORS[cat.difficulty].bg,
              COLORS[cat.difficulty].text
            )}
          >
            {cat.name}
          </div>
        ))}
        {board.map((book, index) => (
          <BookSquare
            key={book.title}
            book={book}
            doClick={doClick}
            isSelected={currentGuess.includes(book)}
            parentIndex={index}
          />
        ))}
      </div>
    </div>
  );
}
