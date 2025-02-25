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
      <div
        className="grid p-2 gap-x-0.5 md-gap-x-1 lg:gap-x-2"
        style={{ gridTemplateColumns: `repeat(${CATEGORY_SIZE}, min(12rem, 18vw))` }}
      >
        {correct.map((cat) => (
          <div
            key={cat.name}
            className={clsx(
              "col-span-full",
              "h-48 max-h-[15vh]",
              "flex flex-col justify-center items-center gap-2",
              "border rounded-md my-1",
              COLORS[cat.difficulty].bg,
              COLORS[cat.difficulty].text
            )}
          >
            <div className="text-3xl">{cat.name}</div>
            <div className="text-center px-2 md:px-4 text-xs md:text-sm">
              {board
                .filter((book) => book.category === cat)
                .map((book, index, array) => (
                  <>
                    <a key={book.title} href={book.url} className="underline">
                      {book.title}
                    </a>
                    {index < array.length - 1 && ", "}
                  </>
                ))}
            </div>
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
