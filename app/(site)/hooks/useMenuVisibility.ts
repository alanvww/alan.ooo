'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook that handles menu visibility based on scroll direction and bottom proximity
 * @returns Object containing isMenuVisible state
 */
export function useMenuVisibility() {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    // Check if scrolled to the bottom (within a small threshold for reliability)
    const isAtBottom = currentScrollY + windowHeight >= bodyHeight - 10; // 10px threshold

    // Hide when scrolling down, show when scrolling up
    if (currentScrollY > prevScrollY && !isAtBottom) { // Only hide if not at the bottom
      setIsMenuVisible(false);
    } else if (currentScrollY < prevScrollY) {
      setIsMenuVisible(true);
    }

    // Always show at the top of the page
    if (currentScrollY === 0) {
      setIsMenuVisible(true);
    }

    // Show when scrolled to the bottom
    if (isAtBottom) {
      setIsMenuVisible(true);
    }

    setPrevScrollY(currentScrollY);
  }, [prevScrollY]);

  useEffect(() => {
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check in case the page loads already at the bottom
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { isMenuVisible };
}
