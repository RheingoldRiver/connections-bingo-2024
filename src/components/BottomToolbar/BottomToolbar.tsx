import { ReactNode, forwardRef, useContext, useState } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { ToolbarButton, ToolbarText } from "../Button/Button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { CATEGORY_SIZE, DisplayType, MAX_LIVES } from "../GameStateProvider/constants";

const BottomToolbar = forwardRef(() => {
  const {
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
              "rounded py-2",
              "text-right"
            )}
            align="start"
          >
            <DropdownItem
              onClick={() => {
                setDisplayType(DisplayType.Image);
              }}
            >
              Image only
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setDisplayType(DisplayType.Text);
              }}
            >
              Text only
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setDisplayType(DisplayType.Overlay);
              }}
            >
              Text overlay
            </DropdownItem>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* <ToolbarButton
        onClick={doClearGuess}
        aria-label="Clear guess"
        disabled={currentGuess.length === 0 || gameOver}
        className={clsx(
          "bg-red-700 text-white disabled:bg-gray-300 transition hover:bg-red-500",
          "dark:disabled:bg-gray-800 dark:disabled:text-gray-400",
          "cursor-pointer disabled:cursor-not-allowed"
        )}
      >
        Clear guess
      </ToolbarButton> */}
      <ToolbarButton
        onClick={doGuess}
        aria-label="Submit guess"
        disabled={currentGuess.length !== CATEGORY_SIZE || gameOver}
        className={clsx(
          "bg-green-800 text-white disabled:bg-gray-300 transition hover:bg-green-600",
          "dark:disabled:bg-gray-800 dark:disabled:text-gray-400",
          "cursor-pointer disabled:cursor-not-allowed"
        )}
      >
        Submit guess
      </ToolbarButton>
      <ToolbarText>Lives: {MAX_LIVES - (guessHistory.length - correct.length)}</ToolbarText>
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
