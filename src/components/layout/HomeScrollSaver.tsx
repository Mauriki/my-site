'use client';

import { useEffect } from 'react';

/**
 * Saves current scrollY to sessionStorage before the user navigates away.
 * Must be rendered inside the home page to track scroll position.
 */
export function HomeScrollSaver() {
    useEffect(() => {
        // Restore scroll if we came back from a sub-page
        const saved = sessionStorage.getItem('restore-home-scroll');
        if (saved !== null) {
            sessionStorage.removeItem('restore-home-scroll');
            const targetY = parseInt(saved, 10);
            
            // First attempt to scroll instantly before paint
            window.scrollTo({ top: targetY, behavior: 'instant' });
            
            // Use requestAnimationFrame and micro-timeout to beat Next.js Router scroll hijacking
            requestAnimationFrame(() => {
                window.scrollTo({ top: targetY, behavior: 'instant' });
                setTimeout(() => window.scrollTo({ top: targetY, behavior: 'instant' }), 50);
            });
        }

        // Save scroll position whenever it changes
        const saveScroll = () => {
            sessionStorage.setItem('home-scroll-y', String(window.scrollY));
        };

        window.addEventListener('scroll', saveScroll, { passive: true });
        return () => window.removeEventListener('scroll', saveScroll);
    }, []);

    return null;
}
