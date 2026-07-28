"use client";

import { useEffect, useState } from "react";

// Matches the source design's window.innerWidth-driven breakpoint logic.
export function useViewportWidth(): number {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}
