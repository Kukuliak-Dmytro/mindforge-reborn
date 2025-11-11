import { Comfortaa } from "next/font/google";

//constant
/**
 * Comfortaa font configuration with Quicksand as fallback.
 */
export const comfortaa = Comfortaa({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["Quicksand", "system-ui", "sans-serif"],
  adjustFontFallback: true,
  variable: "--font-comfortaa",
});
