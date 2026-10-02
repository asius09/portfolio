"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe `window.matchMedia` wrapper.
 *
 * Returns `false` on the server and during the first client render so markup
 * stays consistent, then settles to the real value in an effect.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
