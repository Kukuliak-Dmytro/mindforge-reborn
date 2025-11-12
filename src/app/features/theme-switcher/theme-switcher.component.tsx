"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/app/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/shared/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/app/shared/utils/utils";
import { useTranslations } from "next-intl";

//component
/**
 * ModeToggle component for theme switching.
 */
export const ModeToggle = () => {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  if (!mounted) {
    //return
    return (
      <div className="flex items-center justify-center h-8 w-8">
        <svg
          className="animate-spin text-gray-500 dark:text-gray-300"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-label="Loading">
          <circle
            className="opacity-25"
            cx="10"
            cy="10"
            r="8"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M18 10a8 8 0 00-8-8v4a4 4 0 014 4h4z"
          />
        </svg>
      </div>
    );
  }

  //return
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun
            className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all
              dark:scale-0 dark:-rotate-90"
          />
          <Moon
            className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90
              transition-all dark:scale-100 dark:rotate-0"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

//component
/**
 * ThemeSwitcherMenuItem component for use in dropdown menus.
 * Cycles through light -> dark -> light on each click.
 * Shows the next theme that will be applied, not the current one.
 */
export const ThemeSwitcherMenuItem = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("header");

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    { value: "light", labelKey: "theme_light", icon: "mdi:weather-sunny" },
    { value: "dark", labelKey: "theme_dark", icon: "mdi:weather-night" },
  ];

  // Find current theme index, defaulting to light if theme is system or unknown
  const currentThemeValue = theme === "system" ? "light" : theme;
  const currentThemeIndex = themes.findIndex(
    (t) => t.value === currentThemeValue,
  );
  const effectiveIndex = currentThemeIndex >= 0 ? currentThemeIndex : 0;

  // Get the next theme (what will be applied on click)
  const nextIndex = (effectiveIndex + 1) % themes.length;
  const nextTheme = themes[nextIndex];

  const cycleTheme = () => {
    setTheme(nextTheme.value);
  };

  //return
  return (
    <DropdownMenuItem
      onClick={cycleTheme}
      className="flex items-center justify-end gap-2 cursor-pointer">
      {t(nextTheme.labelKey)}
      <Icon icon={nextTheme.icon} className="size-4" />
    </DropdownMenuItem>
  );
};
