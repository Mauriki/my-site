'use client';

import Link from 'next/link';
import { useCallback } from 'react';

/**
 * Universal "Back to Home" link used on all sub-pages.
 * On click, copies the saved home scroll position (written continuously
 * by HomeScrollSaver) into the key the homepage reads on mount to restore.
 */
export function BackToHomeLink({ className }: { className?: string }) {
    const handleClick = useCallback(() => {
        const saved = sessionStorage.getItem('home-scroll-y');
        if (saved !== null) {
            sessionStorage.setItem('restore-home-scroll', saved);
        }
    }, []);

    return (
        <Link href="/" className={className ?? 'course-brand'} onClick={handleClick}>
            Back to Homepage
        </Link>
    );
}
