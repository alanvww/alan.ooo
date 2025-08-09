'use client';

import { useEffect } from 'react';

const SCROLL_OFFSET_PX = 160; // adjust as needed

function scrollToElementWithOffset(element: HTMLElement, offsetPx: number) {
  const targetY = Math.max(0, element.getBoundingClientRect().top + window.scrollY - offsetPx);
  window.scrollTo({ top: targetY, left: 0, behavior: 'auto' });
}

function scrollToElementWhenReady(elementId: string, onSuccess: () => void) {
  const existing = document.getElementById(elementId);
  if (existing) {
    scrollToElementWithOffset(existing as HTMLElement, SCROLL_OFFSET_PX);
    onSuccess();
    return;
  }

  const timeoutMs = 4000;
  const timeoutId = setTimeout(() => {
    observer.disconnect();
    // Don't clear storage on timeout; we didn't successfully restore
  }, timeoutMs);

  const observer = new MutationObserver(() => {
    const target = document.getElementById(elementId);
    if (target) {
      clearTimeout(timeoutId);
      observer.disconnect();
      scrollToElementWithOffset(target as HTMLElement, SCROLL_OFFSET_PX);
      onSuccess();
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
}

// Restores scroll to either the last clicked project card (by slug) or a saved Y offset
export default function ProjectListScrollRestorer() {
  useEffect(() => {
    const clearKeys = () => {
      sessionStorage.removeItem('projects:lastSlug');
      sessionStorage.removeItem('projectsPageScroll');
    };

    const lastSlug = sessionStorage.getItem('projects:lastSlug');
    if (lastSlug) {
      scrollToElementWhenReady(`project-${lastSlug}`, clearKeys);
      return;
    }

    const saved = sessionStorage.getItem('projectsPageScroll');
    if (saved) {
      const y = parseInt(saved, 10);
      if (!Number.isNaN(y)) {
        // Use rAF to ensure we scroll after first paint
        requestAnimationFrame(() => {
          window.scrollTo({ top: y + SCROLL_OFFSET_PX, left: 0, behavior: 'auto' });
          clearKeys();
        });
      }
    }
  }, []);

  return null;
}


