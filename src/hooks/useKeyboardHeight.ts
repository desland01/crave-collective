"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type KeyboardHeightResult = {
  keyboardHeight: number;
  isKeyboardOpen: boolean;
};

const DEBOUNCE_MS = 50;
const KEYBOARD_THRESHOLD = 100;

export function useKeyboardHeight(): KeyboardHeightResult {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleResize = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      const viewport = window.visualViewport;

      if (!viewport) {
        setKeyboardHeight(0);
        return;
      }

      setKeyboardHeight(Math.max(0, Math.round(window.innerHeight - viewport.height)));
    }, DEBOUNCE_MS);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) {
      return;
    }

    const viewport = window.visualViewport;
    viewport.addEventListener("resize", handleResize);
    viewport.addEventListener("scroll", handleResize);
    handleResize();

    return () => {
      viewport.removeEventListener("resize", handleResize);
      viewport.removeEventListener("scroll", handleResize);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [handleResize]);

  return {
    keyboardHeight,
    isKeyboardOpen: keyboardHeight > KEYBOARD_THRESHOLD,
  };
}
