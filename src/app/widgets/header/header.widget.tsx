"use client";

import Image from "next/image";

import { Link } from "@/pkg/libraries/locale";
import { cn } from "@/app/shared/utils/utils";
//component
/**
 * HeaderComponent widget.
 */
export const HeaderComponent = () => {
  //return
  return (
    <header
      className={cn(
        "relative z-10 w-full h-[80px] flex justify-center items-center",
        "bg-gradient-to-b from-white-bg to-white-fg shadow-small",
      )}>
      <div className="flex justify-between max-w-[1240px] w-full px-4">
        {/* Left side */}
        <div className="flex justify-between items-center gap-4">
          <Link href="/">
            <div className="flex items-center gap-0">
              <Image
                src="/assets/images/logo.png"
                alt="MindForge"
                width={64}
                height={45}
                className="w-[64px] h-auto object-contain"
              />
              <span className="text-3xl text-secondary font-bold">Mind</span>
              <span className="text-3xl text-primary font-bold">Forge</span>
            </div>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex justify-between items-center gap-4">
          {/* Custom Dropdown Menu */}
          <div className="relative">
            <button
              data-menu-button
              className={cn(
                "h-10 w-10 p-[12px_8px] rounded-medium bg-primary",
                "shadow-small flex flex-col justify-between items-center",
                "cursor-pointer transition-all focus:outline-none",
              )}
              aria-label="Toggle menu">
              <span
                className={cn(
                  "block w-6 h-[3px] bg-rich-black rounded-[3px]",
                  "transition-transform duration-300",
                )}></span>
              <span
                className={cn(
                  "block w-6 h-[3px] bg-rich-black rounded-[3px]",
                  "transition-opacity duration-300",
                )}></span>
              <span
                className={cn(
                  "block w-6 h-[3px] bg-rich-black rounded-[3px]",
                  "transition-transform duration-300",
                )}></span>
            </button>

            <div
              data-menu-content
              className={cn(
                "absolute top-full right-0 mt-2 w-[225px] bg-white-fg",
                "rounded-medium shadow-double p-4 border-none text-right z-50",
                `origin-top-right transition-all duration-200 ease-out
                transform`,
                "scale-95 opacity-0 -translate-y-2 pointer-events-none",
              )}>
              {/* Menu content will be added later with logic */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
