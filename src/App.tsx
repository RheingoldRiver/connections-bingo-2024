import GameStateProvider from "./components/GameStateProvider/GameStateProvider";
import "./App.css";
import Game from "./components/Game/Game";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GameStateProvider>
        <Game />
      </GameStateProvider>
    </DndProvider>
  );
}

export default App;
