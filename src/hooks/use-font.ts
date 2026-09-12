"use client";

import { useEffect, useState } from "react";

export type FontOption = "geist" | "inter" | "schibsted";

export function useFont() {
  const [font, setFontState] = useState<FontOption>("geist");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedFont = localStorage.getItem("app-font") as FontOption | null;
    if (storedFont) {
      setFontState(storedFont);
    }
  }, []);

  const setFont = (newFont: FontOption) => {
    setFontState(newFont);
    localStorage.setItem("app-font", newFont);
    document.documentElement.setAttribute("data-font", newFont);
  };

  return { font, setFont, mounted };
}
