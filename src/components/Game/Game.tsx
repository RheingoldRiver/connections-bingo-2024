import Board from "../Board/Board";
import { Information } from "../Information/Information";
import BottomToolbar from "../BottomToolbar/BottomToolbar";
import { ScoreScreen } from "../ScoreScreen/ScoreScreen";
import { DarkModeButton } from "../DarkModeButton/DarkModeButton";

export default function Game() {
  return (
    <div className="grid lg:game-grid-cols">
      <div className="grid-grid-content">
        <div className="flex flex-row items-start justify-end w-full pr-2 gap-2 max-w-[100vw] h-min">
          <DarkModeButton />
          <Information />
        </div>
        <ScoreScreen />
        <Board />
        <BottomToolbar />
      </div>
    </div>
  );
}
