'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook that handles menu visibility based on scroll direction
 * @returns Object containing isMenuVisible state and ref to attach to the menu container
 */
export function useMenuVisibility() {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Hide when scrolling down, show when scrolling up
    if (currentScrollY > prevScrollY) {
      setIsMenuVisible(false);
    } else if (currentScrollY < prevScrollY) {
      setIsMenuVisible(true);
    }

    // Always show at the top of the page
    if (currentScrollY === 0) {
      setIsMenuVisible(true);
    }

    setPrevScrollY(currentScrollY);
  }, [prevScrollY]);

  useEffect(() => {
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { isMenuVisible };
}
