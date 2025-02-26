import clsx from "clsx";
import { Book, DisplayType, COLORS } from "../GameStateProvider/constants";

export default function TitleAndAuthor({ book, displayType }: { book: Book; displayType: DisplayType }) {
  return (
    <>
      <div className={clsx("relative", displayType === DisplayType.Overlay && "bg-gray-100/70 dark:bg-gray-800/60")}>
        <div
          className={clsx(
            "md:font-bold",
            book.eliminated && COLORS[book.category.difficulty]?.text
              ? COLORS[book.category.difficulty].text
              : "dark:text-gray-100"
          )}
        >
          {book.title}
          {book.subtitle && <span className="hidden lg:tall:inline">: {book.subtitle}</span>}
        </div>
        <div
          className={clsx(
            "text-xs text-gray-600 hidden md:block",
            book.eliminated && COLORS[book.category.difficulty]?.text
              ? COLORS[book.category.difficulty].text
              : "dark:text-gray-100"
          )}
        >
          {book.author}
        </div>
      </div>
    </>
  );
}
