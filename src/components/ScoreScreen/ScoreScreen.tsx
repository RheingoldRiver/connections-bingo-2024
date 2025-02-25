import * as Dialog from "@radix-ui/react-dialog";
import { useContext, useState } from "react";
import { Modal } from "../Modal/Modal";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { EMOJI_MAP, MAX_LIVES } from "../GameStateProvider/constants";

export const ScoreScreen = () => {
  const { scoreOpen, setScoreOpen, guessHistory, correct } = useContext(GameStateContext);
  const [copied, setCopied] = useState(false);
  const intro = `I guessed River's Connections Bingo with ${
    MAX_LIVES - guessHistory.length + correct.length
  } lives left!  \nhttps://bingo2024.river.me  \n`;
  const copyableCode =
    intro +
    guessHistory
      .map((guess) => guess.map((cat) => EMOJI_MAP[cat.difficulty as keyof typeof EMOJI_MAP]).join(""))
      .join("  \n");

  const handleCopy = () => {
    navigator.clipboard.writeText(copyableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <Modal open={scoreOpen} onOpenChange={setScoreOpen}>
      <Dialog.Title className="text-center font-bold text-md mb-2">Score screen</Dialog.Title>

      <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm overflow-auto whitespace-pre-wrap">
        {copyableCode}
      </pre>

      <button
        onClick={handleCopy}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>
    </Modal>
  );
};
