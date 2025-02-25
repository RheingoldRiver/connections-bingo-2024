import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { Board, Book, CATEGORY_SIZE, Category, DisplayType, GuessHistory, initialBoard } from "./constants";
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
  gameOver: boolean;
  scoreOpen: boolean;
  setScoreOpen: Dispatch<SetStateAction<boolean>>;
  doEndGame: () => void;
  displayType: DisplayType;
  setDisplayType: Dispatch<SetStateAction<DisplayType>>;
  correct: Category[];
}

const DEFAULT_GAME_STATE: GameState = {
  board: initialBoard,
  currentGuess: [],
  doClick: () => {},
  doGuess: () => {},
  doClearGuess: () => {},
  doSwap: () => {},
  guessHistory: [],
  gameOver: false,
  doEndGame: () => {},
  scoreOpen: false,
  setScoreOpen: () => {},
  displayType: DisplayType.Overlay,
  setDisplayType: () => {},
  correct: [],
};

export const GameStateContext = createContext(DEFAULT_GAME_STATE);
export default function GameStateProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentGuess, setCurrentGuess] = useState<Book[]>([]);
  const [guessHistory, setGuessHistory] = useState<GuessHistory>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [scoreOpen, setScoreOpen] = useState<boolean>(false);
  const [displayType, setDisplayType] = useState<DisplayType>(DisplayType.Overlay);
  const [correct, setCorrect] = useState<Category[]>([]);

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
    const nextCorrect = [...correct, currentGuess[0].category];
    setCorrect(nextCorrect);
    if (nextCorrect.length === CATEGORY_SIZE) {
      setGameOver(true);
      setScoreOpen(true);
    }
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

  const doEndGame = () => {
    if (!confirm("Are you sure?")) return;
    setGameOver(true);
    setScoreOpen(true);
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
        gameOver,
        doEndGame,
        scoreOpen,
        setScoreOpen,
        displayType,
        setDisplayType,
        correct,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}
