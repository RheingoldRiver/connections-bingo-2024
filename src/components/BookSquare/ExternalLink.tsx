import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Book, COLORS } from "../GameStateProvider/constants";
import clsx from "clsx";

export default function ExternalLink({ book, className }: { book: Book; className?: string }) {
  return (
    <a
      href={book.url}
      target="_blank"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <ArrowTopRightOnSquareIcon
        className={clsx(
          className,
          "h-4 w-4 md:h-5 md:w-5 text-gray-800",
          book.eliminated && COLORS[book.category.difficulty]?.text
            ? COLORS[book.category.difficulty].text
            : "dark:text-gray-100"
        )}
      />
    </a>
  );
}
