import { ReactNode, forwardRef, useContext, useState } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { ToolbarButton, ToolbarText } from "../Button/Button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { CATEGORY_SIZE, DisplayType, MAX_LIVES } from "../GameStateProvider/constants";
import { CheckIcon } from "@heroicons/react/24/outline";

const BottomToolbar = forwardRef(() => {
  const {
    displayType,
    setDisplayType,
    doGuess,
    doClearGuess,
    doEndGame,
    currentGuess,
    gameOver,
    setScoreOpen,
    guessHistory,
    correct,
  } = useContext(GameStateContext);
  const [newBoardOpen, setNewBoardOpen] = useState(false);
  return (
    <Toolbar.Root className="pl-2 space-x-3 my-2 w-full flex justify-start z-[100]" aria-label="Game controls">
      <DropdownMenu.Root open={newBoardOpen} onOpenChange={setNewBoardOpen}>
        <DropdownMenu.Trigger asChild>
          <button
            className={clsx(
              "cursor-pointer p0 px-1 md:p-2 rounded mb-2",
              "shadow-sm shadow-zinc-900 dark:shadow-none dark:border dark:border-zinc-500",
              "flex flex-row items-center gap-2",
              "IconButton",
              "text-sm md:text-md"
            )}
            aria-label="New board"
          >
            Display type
            <HamburgerMenuIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={clsx(
              "shadow-sm shadow-zinc-900 dark:shadow-none dark:border dark:border-zinc-500",
              "DropdownMenuContent",
              "text-black dark:text-gray-50",
              "bg-gray-100 dark:bg-gray-900 dark:text-gray-50",
              "rounded py-2"
            )}
            align="start"
          >
            <DropdownItem
              onClick={() => {
                setDisplayType(DisplayType.Image);
              }}
            >
              Image only{displayType === DisplayType.Image && <CheckIcon className="h-4 w-4 inline ml-1" />}
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setDisplayType(DisplayType.Text);
              }}
            >
              Text only{displayType === DisplayType.Text && <CheckIcon className="h-4 w-4 inline ml-1" />}
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setDisplayType(DisplayType.Overlay);
              }}
            >
              Text overlay{displayType === DisplayType.Overlay && <CheckIcon className="h-4 w-4 inline ml-1" />}
            </DropdownItem>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <ToolbarButton
        onClick={doClearGuess}
        aria-label="Deselect all"
        disabled={currentGuess.length === 0 || gameOver}
        className={clsx(
          "dark:text-white transition",
          "disabled:text-gray-500 disabled:bg-gray-200",
          "dark:disabled:bg-gray-800 dark:disabled:text-gray-400",
          "cursor-pointer disabled:cursor-not-allowed",
          "dark:hover:bg-gray-800 hover:bg-gray-200",
          "hidden xs:block"
        )}
      >
        Deselect all
      </ToolbarButton>
      <ToolbarButton
        onClick={doGuess}
        aria-label="Submit guess"
        disabled={currentGuess.length !== CATEGORY_SIZE || gameOver}
        className={clsx(
          "bg-green-800 text-white  transition hover:bg-green-600",
          "disabled:text-gray-500 disabled:bg-gray-200",
          "dark:disabled:bg-gray-800 dark:disabled:text-gray-400",
          "cursor-pointer disabled:cursor-not-allowed"
        )}
      >
        Submit guess
      </ToolbarButton>
      <ToolbarText>
        Lives: {MAX_LIVES - (guessHistory.length - correct.length)}
        {gameOver && " - Game Over!"}
      </ToolbarText>
      <ToolbarButton
        onClick={() => {
          if (gameOver) {
            setScoreOpen(true);
          } else {
            doEndGame();
          }
        }}
        aria-label={gameOver ? "View score" : "End game"}
        className={clsx(
          gameOver ? "" : "bg-red-200 dark:bg-red-950 text-white disabled:bg-gray-300 transition hover:bg-red-700",
          "dark:disabled:bg-gray-800 dark:disabled:text-gray-400",
          "cursor-pointer disabled:cursor-not-allowed",
          "ml-auto"
        )}
      >
        {gameOver ? "View score" : "End game"}
      </ToolbarButton>
    </Toolbar.Root>
  );
});

const DropdownItem = ({ children, ...rest }: { children: ReactNode } & DropdownMenu.DropdownMenuItemProps) => {
  return (
    <DropdownMenu.Item
      className={clsx("DropdownMenuItem", "px-2 cursor-pointer hover:bg-blue-300 dark:hover:bg-blue-950")}
      {...rest}
    >
      {children}
    </DropdownMenu.Item>
  );
};

export default BottomToolbar;
