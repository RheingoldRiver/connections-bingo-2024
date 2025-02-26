import { Book } from "../GameStateProvider/constants";

export default function Overlay({ book }: { book: Book }) {
  return (
    <div className="absolute inset-0">
      <div
        className="bg-cover bg-center bg-no-repeat opacity-50 w-full h-full"
        style={{
          backgroundImage: `url(/${book.image})`,
        }}
      />
    </div>
  );
}
