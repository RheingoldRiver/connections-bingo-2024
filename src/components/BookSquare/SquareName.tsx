import { Book } from "../GameStateProvider/constants";
import clsx from "clsx";

export default function SquareName({ book }: { book: Book }) {
  return <div className={clsx("text-xs lg:text-sm hidden md:block")}>{book.squareName}</div>;
}
