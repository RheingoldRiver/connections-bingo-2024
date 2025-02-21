import { useContext } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { CATEGORY_SIZE } from "../GameStateProvider/constants";
import BookSquare from "../BookSquare/BookSquare";

export default function Board() {
  const { board, doClick, currentGuess } = useContext(GameStateContext);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Book Grid */}
      <div className="grid gap-2 p-4" style={{ gridTemplateColumns: `repeat(${CATEGORY_SIZE}, minmax(0, 1fr))` }}>
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
