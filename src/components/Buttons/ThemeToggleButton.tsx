"use client";

import { MoonIcon, SunDimIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggleButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle colour theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative flex cursor-pointer items-center">
      <SunDimIcon
        size={20}
        className="absolute rotate-90 opacity-0 transition-all duration-300 dark:rotate-0 dark:opacity-100"
      />

      <MoonIcon
        size={20}
        className="rotate-0 opacity-100 transition-all duration-300 dark:-rotate-90 dark:opacity-0"
      />
    </button>
  );
};

export default ThemeToggleButton;
