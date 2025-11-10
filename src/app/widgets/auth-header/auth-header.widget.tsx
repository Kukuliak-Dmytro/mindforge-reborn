"use client";

import Image from "next/image";
import { Link } from "@/pkg/libraries/locale";
import { cn } from "@/app/shared/utils/utils";
import { LocaleSwitcher } from "@/app/features/locale-switcher";
import { ModeToggle } from "@/app/features/theme-switcher";

//component
/**
 * AuthHeaderComponent widget for authentication pages.
 * Contains only logo, language switcher, and theme switcher (no profile).
 */
export const AuthHeaderComponent = () => {
  //return
  return (
    <header
      className={cn(
        "relative z-10 w-full h-[80px] flex justify-center items-center",
        "bg-gradient-to-t from-white-bg to-white-fg shadow-small",
      )}>
      <div className="flex justify-between max-w-[1240px] w-full px-4">
        {/* Left side - Logo */}
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

        {/* Right side - Language and Theme Switchers */}
        <div className="flex justify-between items-center gap-4">
          <ModeToggle />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
};
