import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";

export const DarkModeButton = () => {
  const { darkMode, updateDarkMode } = useContext(GameStateContext);
  const ChangeIcon = darkMode === true ? SunIcon : MoonIcon;
  return (
    <ChangeIcon
      className="cursor-pointer h-10 w-10 text-gray-800 dark:text-gray-300"
      onClick={() => {
        updateDarkMode(!darkMode);
      }}
    />
  );
};
