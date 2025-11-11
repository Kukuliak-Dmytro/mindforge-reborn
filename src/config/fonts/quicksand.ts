import { Quicksand } from "next/font/google";

//constant
/**
 * Quicksand font configuration (fallback for Comfortaa).
 */
export const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false, // Don't preload as it's a fallback
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
  variable: "--font-quicksand",
});
