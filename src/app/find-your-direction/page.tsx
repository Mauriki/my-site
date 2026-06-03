'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BackToHomeLink } from '@/components/ui/BackToHomeLink';

export default function GuideSignupPage() {

    return (
        <>
            {/* Exact clone of the Ultimate Guide top bar — same classes, no right CTA */}
            <header className="course-topbar">
                <div className="course-topbar-inner">
                    <BackToHomeLink className="course-brand" />
                </div>
            </header>

            <main id="main-content" className="container guide-page-split">
                <div className="guide-split-layout">
                    {/* Left Column: 3D Mockup */}
                    <div className="guide-split-image">
                        <div className="guide-mockup-wrapper">
                            <Image
                                src="/mockup.png"
                                alt="Find Your Direction Ebook 3D Mockup"
                                className="guide-mockup-img"
                                width={900}
                                height={600}
                                priority
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>

                    {/* Right Column: Copy & Form */}
                    <div className="guide-split-content">
                        <h1>Find Your Direction</h1>

                        <div className="guide-form-container">
                            <p className="guide-subtitle">
                                This guide helps you find your direction and know what you actually want to do. It gives you action steps, questions, and a scoring method to analyze your progress and get clear on your next steps.
                            </p>
                            <p className="guide-subtitle" style={{ marginBottom: '1.25rem', fontWeight: 500, color: 'var(--brand)' }}>
                                100% free. Instant access, no email required.
                            </p>

                            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                                <a
                                    href="https://drive.google.com/file/d/1sL_R_aN9clWEg3QB6Q03BW09FD4u0fY5/view?usp=share_link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    style={{ fontSize: '1.05rem', padding: '0.9rem 1.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    Get Instant Access
                                </a>
                                <p style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', margin: 0 }}>
                                    For personal use only. Do not copy or distribute.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer guide-footer">
                    <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Maurik. All rights reserved.</p>
                    <div className="footer-links">
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Use</Link>
                    </div>
                </footer>
            </main>
        </>
    );
}
