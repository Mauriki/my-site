import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Find Your Direction',
    description: "A complete guide to figuring out what you actually want.",
    openGraph: {
        title: 'Find Your Direction | Maurik',
        description: 'A complete guide to figuring out what you actually want.',
        url: 'https://maurikmillaku.com/find-your-direction',
        siteName: 'Maurik',
        images: [
            {
                url: '/mockup.png', // Fallback to mockup, user can replace with a dedicated OG image
                width: 1200,
                height: 630,
                alt: 'Find Your Direction Ebook 3D Mockup',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Find Your Direction | Maurik',
        description: 'A complete guide to figuring out what you actually want.',
        creator: '@maurikmillaku',
        images: ['/mockup.png'],
    },
};

export default function GuideLayout({ children }: { children: ReactNode }) {
    return children;
}
