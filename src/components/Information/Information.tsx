import * as Dialog from "@radix-ui/react-dialog";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Modal } from "../Modal/Modal";

export const Information = () => {
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  return (
    <Modal
      open={infoOpen}
      onOpenChange={setInfoOpen}
      trigger={<QuestionMarkCircleIcon className="h-10 w-10 text-gray-800 dark:text-gray-300 cursor-pointer" />}
    >
      <Dialog.Title className="text-center font-bold text-md mb-2">Rules</Dialog.Title>
      <p className="font-bold">How the game works:</p>
      <ol className="mb-2 list-decimal list-inside ml-4">
        <li>The twenty-five books are divided into five categories of five books each.</li>
        <li>
          In normal Connections (where there are 4 categories of 4 things each) you get 3 mistakes allowed before you
          have to complete the puzzle or lose. In this game with 5 categories of 5 things each you get 6.
        </li>
        <li>If you "die" your life counter will just go negative.</li>
        <li>
          Yes, I know this is a client-side app and you could look at React dev tools to cheat. It's also OSS and you
          can look at the source code to cheat. I'd prefer you didn't.
        </li>
        <li>
          When you have guessed everything correctly (or want to give up), you can copy your guesses as a grid of emoji
          to share how well you did.
        </li>
      </ol>
      <p className="font-bold">Rules for categories:</p>
      <ol className="mb-2 list-disc list-inside ml-4">
        <li>Each category should be possible to figure out based on the Goodreads pages for the books.</li>
        <li>No category has been a Bingo square in the past.</li>
        <li>
          No category is based on my own personal experience; for example "listened to this as an audiobook" or "books I
          enjoyed" will not be categories.
        </li>
        <li>Otherwise, anything goes!</li>
      </ol>
      <Dialog.Title className="text-center font-bold text-md mb-2">Game mechanics</Dialog.Title>
      <ul className="mb-2">
        <li>Click on 5 books and then click "Submit guess" to see if you have correctly identified a category.</li>
        <li>Click "Clear guess" to deselect all books. Click "Give up" if you want to get your emoji grid.</li>
      </ul>
      <Dialog.Title className="text-center font-bold text-md mb-2">Project information</Dialog.Title>
      <p className="mb-2">
        <a
          href="https://old.reddit.com/r/Fantasy/comments/1bt4iqf/official_rfantasy_2024_book_bingo_challenge/"
          target="_blank"
          className="text-blue-600 dark:text-blue-400 cursor-pointer underline"
        >
          /r/fantasy Bingo
        </a>{" "}
        is a speculative fiction reading challenge.{" "}
        <a
          href="https://www.nytimes.com/games/connections"
          target="_blank"
          className="text-blue-600 dark:text-blue-400 cursor-pointer underline"
        >
          Connections
        </a>{" "}
        is a daily New York Times puzzle (like Wordle but more fun imo).
      </p>
      <p className="mb-2">
        Connections Bingo is{" "}
        <a
          href="https://github.com/RheingoldRiver/connections-bingo-2024"
          target="_blank"
          className="text-blue-600 dark:text-blue-400 cursor-pointer underline"
        >
          open source
        </a>{" "}
        and built in React using TypeScript and TailwindCSS, scaffolded with Vite, and hosted on GitHub Pages. Code is
        MIT licensed and I'd be thrilled if you forked & made your own card! You can{" "}
        <a
          href="https://river.me/tags/react/"
          target="_blank"
          className="text-blue-600 dark:text-blue-400 cursor-pointer underline"
        >
          read more
        </a>{" "}
        about my projects{" "}
        <a
          href="https://river.me/"
          target="_blank"
          className="text-blue-600 dark:text-blue-400 cursor-pointer underline"
        >
          on my blog
        </a>
        .
      </p>
    </Modal>
  );
};
