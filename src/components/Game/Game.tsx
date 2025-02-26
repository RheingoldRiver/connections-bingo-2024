import Board from "../Board/Board";
import { Information } from "../Information/Information";
import BottomToolbar from "../BottomToolbar/BottomToolbar";
import { ScoreScreen } from "../ScoreScreen/ScoreScreen";
import { DarkModeButton } from "../DarkModeButton/DarkModeButton";
import { useContext } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";

export default function Game() {
  const { oneAway } = useContext(GameStateContext);
  return (
    <div className="grid lg:game-grid-cols">
      <div className="grid-grid-content">
        <div className="flex flex-row items-center justify-end w-full pr-2 gap-2 max-w-[100vw] h-min">
          {oneAway && <div className="grow flex justify-center items-center h-full">One away!</div>}
          <div className="flex flex-row">
            <DarkModeButton />
            <Information />
          </div>
        </div>
        <ScoreScreen />
        <Board />
        <BottomToolbar />
      </div>
    </div>
  );
}
