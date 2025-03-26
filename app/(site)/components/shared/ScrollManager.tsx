'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollManager() {
    const pathname = usePathname();

    // Save scroll position when navigating away
    useEffect(() => {
        const handleScroll = () => {
            // Debounce scroll events
            localStorage.setItem(`scrollPos-${pathname}`, window.scrollY.toString());
        };

        // Save initial position when component mounts
        const savedPosition = localStorage.getItem(`scrollPos-${pathname}`);
        if (!savedPosition) {
            localStorage.setItem(`scrollPos-${pathname}`, '0');
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    // When coming back to a page
    useEffect(() => {
        if (pathname.includes('/projects') && !pathname.includes('/projects/')) {
            // We're on the projects listing page
            const savedPosition = localStorage.getItem(`scrollPos-${pathname}`);
            if (savedPosition) {
                setTimeout(() => {
                    window.scrollTo(0, parseInt(savedPosition));
                }, 0);
            }
        } else {
            // Reset scroll on project detail pages
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
}