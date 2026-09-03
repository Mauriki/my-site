'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BackToHomeLink } from '@/components/ui/BackToHomeLink';
import KitSubscribeForm from '@/components/ui/KitSubscribeForm';

export default function GuideSignupPage() {

    return (
        <>
            {/* Exact clone of the Ultimate Guide top bar - same classes, no right CTA */}
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
                                src="/mockup.png?v=2"
                                alt="Find Your Direction Ebook 3D Mockup"
                                className="guide-mockup-img"
                                width={399}
                                height={640}
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
                            <p className="guide-subtitle" style={{ marginBottom: '1.25rem', fontWeight: 500 }}>
                                Enter your email below to receive the free PDF guide straight to your inbox.
                            </p>

                            <div style={{ marginTop: '1.5rem', width: '100%' }}>
                                <KitSubscribeForm 
                                    formId="9672812"
                                    buttonText="Get the PDF Guide"
                                    successMessage="Click the link in that email to download the PDF guide instantly."
                                />
                                <p style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginTop: '1rem', marginBottom: 0 }}>
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
