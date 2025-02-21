import { ReactNode, createContext, useState } from "react";
import { Board, Book, CATEGORY_SIZE, GuessHistory, initialBoard } from "./constants";
import { produce } from "immer";

interface GameState {
  board: Board;
  currentGuess: Book[];
  doClick: (book: Book) => void;
  doGuess: () => void;
  doClearGuess: () => void;

  // needed for drag-and-drop
  doSwap: (dragIndex: number, hoverIndex: number) => void;
  guessHistory: GuessHistory;
}

const DEFAULT_GAME_STATE: GameState = {
  board: initialBoard,
  currentGuess: [],
  doClick: () => {},
  doGuess: () => {},
  doClearGuess: () => {},
  doSwap: () => {},
  guessHistory: [],
};

export const GameStateContext = createContext(DEFAULT_GAME_STATE);
export default function GameStateProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentGuess, setCurrentGuess] = useState<Book[]>([]);
  const [guessHistory, setGuessHistory] = useState<GuessHistory>([]);

  const doAdd = (book: Book) => {
    if (currentGuess.length >= CATEGORY_SIZE) return;
    setCurrentGuess([...currentGuess, book]);
  };

  const doRemove = (book: Book) => {
    setCurrentGuess(currentGuess.filter((b) => b !== book));
  };

  const doClick = (book: Book) => {
    if (currentGuess.includes(book)) {
      doRemove(book);
    } else {
      doAdd(book);
    }
  };

  const doGuess = () => {
    if (currentGuess.length !== CATEGORY_SIZE) return;
    const res = currentGuess.every((guess) => (guess.category.idx === currentGuess[0].category.idx ? 1 : 0));
    setGuessHistory([...guessHistory, currentGuess.map((guess) => guess.category)]);

    // we don't want to clear if it's wrong

    if (!res) return;
    setBoard(
      produce(board, (draft) => {
        currentGuess.forEach((b) => {
          const bookToUpdate = draft.find((book) => book.title === b.title);
          if (bookToUpdate) {
            bookToUpdate.eliminated = true;
          }
        });
      })
    );
    doClearGuess();
  };

  const doClearGuess = () => {
    setCurrentGuess([]);
  };

  const doSwap = (dragIndex: number, hoverIndex: number) => {
    setBoard((prevBoard) =>
      produce(prevBoard, (draft) => {
        [draft[dragIndex], draft[hoverIndex]] = [draft[hoverIndex], draft[dragIndex]];
      })
    );
  };

  return (
    <GameStateContext.Provider
      value={{
        board,
        currentGuess,
        doClick,
        doGuess,
        doClearGuess,
        doSwap,
        guessHistory,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}
