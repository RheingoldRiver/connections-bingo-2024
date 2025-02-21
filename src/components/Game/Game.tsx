import { useContext } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { CATEGORY_SIZE } from "../GameStateProvider/constants";
import clsx from "clsx";
import Board from "../Board/Board";
import { Information } from "../Information/Information";

export default function Game() {
  const { currentGuess, doGuess, doClearGuess } = useContext(GameStateContext);

  return (
    <div className="grid lg:game-grid-cols">
      <div className="grid-grid-content">
        <div className="flex flex-row items-start justify-end w-full pr-2 gap-2 max-w-[100vw] h-min">
          <Information></Information>
        </div>

        <Board></Board>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={doGuess}
            disabled={currentGuess.length !== CATEGORY_SIZE}
            className={clsx(
              "px-4 py-2 rounded-md bg-green-500 text-white disabled:bg-gray-300 transition hover:bg-green-600",
              "dark:disabled:bg-gray-800 dark:disabled:text-gray-400",
              "cursor-pointer disabled:cursor-not-allowed"
            )}
          >
            Submit Guess
          </button>
          <button
            onClick={doClearGuess}
            disabled={currentGuess.length === 0}
            className={clsx(
              "px-4 py-2 rounded-md bg-red-500 text-white disabled:bg-gray-300 transition hover:bg-red-600",
              "dark:disabled:bg-gray-800 dark:disabled:text-gray-400",
              "cursor-pointer disabled:cursor-not-allowed"
            )}
          >
            Clear Guess
          </button>
        </div>
      </div>
    </div>
  );
}
