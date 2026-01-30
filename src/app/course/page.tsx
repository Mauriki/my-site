'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CoursePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        {
            question: 'Do I need paid apps for this?',
            answer: 'No. This system is completely app-agnostic. Use Google Calendar, Trello, paper notebooks, or any tool you prefer. The framework works regardless of your setup.',
        },
        {
            question: 'Is this for complete beginners?',
            answer: 'Yes. Whether you have never used a productivity system or have tried dozens that did not stick, this course meets you where you are and builds from the fundamentals.',
        },
        {
            question: 'What if I know what to do but cannot seem to do it?',
            answer: 'That is exactly the problem this solves. Most people do not lack information - they lack a system. This course bridges the gap between knowing and doing.',
        },
        {
            question: 'How long do I have access?',
            answer: 'Lifetime access. Once you enroll, the course and all materials are yours forever, including any future updates.',
        },
        {
            question: 'What exactly is included?',
            answer: '12 HD video lessons, the complete Setup Vault with Google Keep capture templates, Trello execution boards, Google Sheets goal trackers, and the Routine-Building Framework.',
        },
        {
            question: 'Can I use this for creative projects or business goals?',
            answer: 'Absolutely. The framework adapts to any meaningful goal - whether you are building a business, writing a book, learning a skill, or improving your health.',
        },
    ];

    const enrollUrl = 'https://maurik.systeme.io/order-form';

    return (
        <div className="course-page-ali">
            {/* Navigation */}
            <nav className="course-nav-ali">
                <Link href="/" className="course-nav-back-ali">Back</Link>
            </nav>

            {/* Hero Section */}
            <section className="hero-ali">
                <h1 className="animate-enter">The Ultimate Guide to<br />Turning Your Life Around</h1>

                {/* Cinema Video Placeholder */}
                <div className="video-ali animate-enter delay-200">
                    <div className="video-inner-ali">
                        <div className="video-play-ali">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1" />
                                <polygon points="10 8 16 12 10 16" fill="currentColor" />
                            </svg>
                        </div>
                        <span className="video-text-ali">Video Coming Soon</span>
                    </div>
                </div>

                {/* GPS Metaphor */}
                <div className="gps-ali animate-enter delay-300">
                    <p>
                        Think about trying to drive somewhere you have never been before without a GPS.
                        You might be motivated, but you will miss turns and get lost.
                    </p>
                    <p className="gps-highlight-ali">
                        A goal without a system is the same. This is your GPS.
                    </p>
                </div>

                <a href="#pricing" className="cta-ali animate-enter delay-500">
                    Start Your Transformation
                </a>
            </section>

            {/* About Instructor */}
            <section className="section-ali instructor-ali">
                <div className="section-inner-ali">
                    <h2>About Your Instructor</h2>
                    <div className="instructor-content-ali">
                        <p>
                            I am a former computer science student who struggled for years with lack of direction,
                            procrastination, and starting things without ever following through.
                        </p>
                        <p>
                            Over the past few years, I have studied productivity, psychology, discipline, and
                            goal-setting, and tested everything on my own life.
                        </p>
                        <p className="instructor-highlight-ali">
                            What you are learning here is not theory. It is the exact system I built to go from being
                            lost and inconsistent to having clear goals, structured days, and the mental control to execute.
                        </p>
                    </div>
                </div>
            </section>

            {/* Two Pillars Overview */}
            <section className="section-ali pillars-overview-ali">
                <div className="section-inner-ali">
                    <h2>Inside The Ultimate Guide</h2>
                    <p className="pillars-intro-ali">
                        This is not just a collection of productivity tips. It is a comprehensive system
                        designed to transform how you approach your goals, time, and life.
                    </p>

                    <div className="pillars-grid-ali">
                        {/* Pillar 1 */}
                        <div className="pillar-card-ali">
                            <span className="pillar-label-ali">Pillar 1</span>
                            <h3>Direction</h3>
                            <p className="pillar-subtitle-ali">Clarity and Purpose</p>
                            <p>
                                The Direction pillar helps you gain clarity on what truly matters.
                                Through structured reflection and goal-setting, you will:
                            </p>
                            <ul>
                                <li>Identify your single most important goal</li>
                                <li>Eliminate distractions disguised as priorities</li>
                                <li>Build a vision that pulls you forward</li>
                                <li>Make decisions with confidence</li>
                            </ul>
                        </div>

                        {/* Pillar 2 */}
                        <div className="pillar-card-ali">
                            <span className="pillar-label-ali">Pillar 2</span>
                            <h3>Execution</h3>
                            <p className="pillar-subtitle-ali">Systems and Action</p>
                            <p>
                                The Execution pillar gives you the systems, tools, and frameworks
                                to consistently turn your vision into reality. You will learn how to:
                            </p>
                            <ul>
                                <li>Build routines that make progress automatic</li>
                                <li>Use your calendar to control your time</li>
                                <li>Use journaling to control your mind</li>
                                <li>Overcome procrastination through proven techniques</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Pillar 1: Direction */}
            <section className="section-ali pillar-detail-ali">
                <div className="section-inner-ali">
                    <div className="pillar-header-ali">
                        <span className="pillar-tag-ali">Pillar 1: Direction</span>
                        <h2>Gain Clarity, Get Direction, Set Your Goals</h2>
                    </div>

                    <div className="modules-grid-ali">
                        <div className="module-ali">
                            <h4>
                                Finding Your One Thing
                            </h4>
                            <p>
                                Discover what truly matters to you and eliminate the constant feeling of working hard
                                but going nowhere. This framework helps you align your daily actions with your deepest goals.
                                You will finally experience the satisfaction of making progress on what genuinely matters.
                            </p>
                        </div>

                        <div className="module-ali">
                            <h4>
                                Goal Breakdown System
                            </h4>
                            <p>
                                Transform vague intentions into tangible results. Learn the method to break down
                                your ambitious goals into actionable steps, complete with milestone tracking that
                                gives you the momentum to follow through when others give up.
                            </p>
                        </div>

                        <div className="module-ali">
                            <h4>
                                Free Templates and Trackers
                            </h4>
                            <p>
                                Access Google Sheets goal trackers and Trello boards designed to help you go deeper
                                into your objectives. These free tools break down your goals visually and keep you
                                accountable without any paid subscriptions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Pillar 2: Execution */}
            <section className="section-ali pillar-detail-ali pillar-alt-ali">
                <div className="section-inner-ali">
                    <div className="pillar-header-ali">
                        <span className="pillar-tag-ali">Pillar 2: Execution</span>
                        <h2>Take Action, Get Organised, Manage Your Life</h2>
                    </div>

                    <div className="modules-grid-ali">
                        <div className="module-ali">
                            <h4>
                                Calendar Control
                            </h4>
                            <p>
                                Use your calendar to own your time, not just schedule meetings. Learn time-blocking
                                techniques that bridge the gap between your vision and daily execution. End each day
                                feeling accomplished instead of overwhelmed.
                            </p>
                        </div>

                        <div className="module-ali">
                            <h4>
                                Journaling for Mental Control
                            </h4>
                            <p>
                                Use journaling to control your mind and stay consistent even on hard days.
                                Data journaling helps you track what is working, identify patterns, and make
                                adjustments based on real evidence - not feelings.
                            </p>
                        </div>

                        <div className="module-ali">
                            <h4>
                                Routine Building Framework
                            </h4>
                            <p>
                                Build morning and evening routines that actually stick. Create a personalised
                                weekly rhythm that accommodates both your goals and personal priorities,
                                ensuring sustainable progress without burnout.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bonus Section */}
            <section className="section-ali bonus-ali">
                <div className="section-inner-ali">
                    <h2>Also Included</h2>

                    <div className="bonus-grid-clean">
                        <div className="bonus-item-clean">
                            <h4>Free Productivity Tools</h4>
                            <p>Discover completely free tools that boost productivity without subscriptions.</p>
                        </div>

                        <div className="bonus-item-clean">
                            <h4>Mindsets and Habits</h4>
                            <p>Learn the mental frameworks and small habits that compound into big changes.</p>
                        </div>

                        <div className="bonus-item-clean">
                            <h4>Resources and Links</h4>
                            <p>Curated resources to continue your growth beyond the course.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Block */}
            <section id="pricing" className="section-ali pricing-ali">
                <div className="section-inner-ali">
                    <div className="pricing-box-ali">
                        <span className="pricing-label-ali">The Complete Course</span>
                        <h2>What You Get</h2>

                        <div className="value-stack-ali">
                            <div className="value-item-ali">
                                <span className="value-check-ali">✓</span>
                                <span>12 High-Definition Video Lessons</span>
                            </div>
                            <div className="value-item-ali">
                                <span className="value-check-ali">✓</span>
                                <span>Google Sheets Goal Trackers (Free)</span>
                            </div>
                            <div className="value-item-ali">
                                <span className="value-check-ali">✓</span>
                                <span>Trello Execution Boards</span>
                            </div>
                            <div className="value-item-ali">
                                <span className="value-check-ali">✓</span>
                                <span>Routine-Building Framework</span>
                            </div>
                            <div className="value-item-ali">
                                <span className="value-check-ali">✓</span>
                                <span>Curated Resource List (Apps & Books)</span>
                            </div>
                            <div className="value-item-ali">
                                <span className="value-check-ali">✓</span>
                                <span>Lifetime Access</span>
                            </div>
                        </div>

                        <div className="pricing-price-ali">
                            <span className="price-amount-ali">$79</span>
                            <span className="price-type-ali">One-time payment</span>
                        </div>

                        <a href={enrollUrl} target="_blank" rel="noopener noreferrer" className="pricing-cta-ali">
                            Get Started Now
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-ali faq-ali">
                <div className="section-inner-ali">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-list-ali">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item-ali ${openFaq === index ? 'open' : ''}`}
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            >
                                <div className="faq-question-ali">
                                    <span>{faq.question}</span>
                                    <span className="faq-toggle-ali">{openFaq === index ? '-' : '+'}</span>
                                </div>
                                {openFaq === index && (
                                    <div className="faq-answer-ali">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section-ali final-ali">
                <div className="section-inner-ali">
                    <h2>Ready to Turn Your Life Around?</h2>
                    <p className="final-subtitle-ali">Stop drifting. Start building with direction.</p>
                    <a href={enrollUrl} target="_blank" rel="noopener noreferrer" className="cta-ali">
                        Get The Course - $79
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer-ali">
                <p>© 2024 Maurik. All rights reserved.</p>
            </footer>

            {/* Floating CTA Button - Bottom Left */}
            <a href={enrollUrl} target="_blank" rel="noopener noreferrer" className="floating-cta">
                Get The Course
            </a>
        </div>
    );
}
