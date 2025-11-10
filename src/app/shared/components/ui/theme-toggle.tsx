"use client";
import { useEffect, useState } from "react";
import { useTheme } from 'next-themes'
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted when it runs on client
    setMounted(true);
  }, []);

  const toggleTheme=()=>{
    if (theme === "light") {
      setTheme("dark");
    }
    else {
      setTheme("light");
    }
  }

  // Render placeholder with the same dimensions during server rendering
  if (!mounted) {
    return (
      <div className="fixed bottom-4 right-4 z-30">
        <div 
          className="relative bg-gray-500 rounded-full cursor-pointer flex items-center justify-between p-[5px] h-[26px] w-[50px] scale-[1.2] shadow-small"
        >
          <IoSunnyOutline className="text-white-fg" />
          <IoMoonOutline className="text-white-fg" />
          <div className="absolute top-[2px] left-[2px] h-[22px] w-[22px] rounded-full transition-transform duration-300 bg-rich-black shadow-inner-light"></div>
        </div>
      </div>
    );
  }

  return (
      <div className="fixed bottom-4 right-4 z-30">
        <div 
          className="relative bg-gray-500 rounded-full cursor-pointer flex items-center justify-between p-[5px] h-[26px] w-[50px] scale-[1.2] shadow-small"
          onClick={toggleTheme}
        >
          <IoSunnyOutline className="text-white-fg" />
          <IoMoonOutline className="text-white-fg" />
          <div 
            className={`absolute top-[2px] left-[2px] h-[22px] w-[22px] rounded-full transition-transform duration-300 
              ${theme === 'light' 
                ? 'translate-x-0 bg-rich-black shadow-inner-light' 
                : 'translate-x-[24px] bg-white-fg shadow-inner-dark'
              }`}
          ></div>
        </div>
      </div>
  );
}