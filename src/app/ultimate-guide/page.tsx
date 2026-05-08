import type { Metadata } from 'next';
import Link from 'next/link';
import { BackToHomeLink } from '@/components/ui/BackToHomeLink';

const enrollUrl = 'https://maurik.systeme.io/order-form';

const faqs = [
  {
    question: 'Do I need paid apps for this?',
    answer:
      'No. This system is completely app-agnostic. Use Google Calendar, Trello, paper notebooks, or any tool you prefer. The framework works regardless of your setup.',
  },
  {
    question: 'Is this for complete beginners?',
    answer:
      'Yes. Whether you have never used a productivity system or have tried dozens that did not stick, this guide meets you where you are and builds from the fundamentals.',
  },
  {
    question: 'What if I know what to do but cannot seem to do it?',
    answer:
      'That is exactly the problem this solves. Most people do not lack information, they lack a system. This guide bridges the gap between knowing and doing.',
  },
  {
    question: 'How long do I have access?',
    answer:
      'Lifetime access. Once you enroll, the guide and all materials are yours forever, including any future updates.',
  },
  {
    question: 'What exactly is included?',
    answer:
      '12 HD video lessons, the complete Setup Vault with Google Keep capture templates, Trello execution boards, Google Sheets goal trackers, and the Routine-Building Framework.',
  },
  {
    question: 'Can I use this for creative projects or business goals?',
    answer:
      'Absolutely. The framework adapts to any meaningful goal, whether you are building a business, writing a book, learning a skill, or improving your health.',
  },
];

const includedItems = [
  '12 High-Definition Video Lessons',
  'Google Sheets Goal Trackers (Free)',
  'Trello Execution Boards',
  'Routine-Building Framework',
  'Curated Resource List (Apps and Books)',
  'Lifetime Access',
];

const directionModules = [
  {
    title: 'Finding Your One Thing',
    text: 'Discover what truly matters to you and eliminate the feeling of working hard but going nowhere. This framework helps you align daily actions with your deepest goals.',
  },
  {
    title: 'Goal Breakdown System',
    text: 'Transform vague intentions into tangible results. Learn to break ambitious goals into actionable steps, with milestone tracking that builds momentum.',
  },
  {
    title: 'Free Templates and Trackers',
    text: 'Access Google Sheets goal trackers and Trello boards that break your goals down visually and keep you accountable without paid subscriptions.',
  },
];

const executionModules = [
  {
    title: 'Calendar Control',
    text: 'Use your calendar to own your time, not just schedule meetings. Learn practical time-blocking that bridges vision and daily execution.',
  },
  {
    title: 'Journaling for Mental Control',
    text: 'Use journaling to stay consistent on hard days. Track what is working, identify patterns, and adjust based on evidence instead of mood.',
  },
  {
    title: 'Routine Building Framework',
    text: 'Build morning and evening routines that actually stick, with a weekly rhythm that supports progress without burnout.',
  },
];

const heroBenefits = [
  'Get clear on what actually matters this season of your life',
  'Follow a practical weekly system that turns plans into finished work',
  'Stay consistent without relying on motivation alone',
];

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'The Ultimate Guide to Turning Your Life Around',
  description:
    'A practical guide designed to help students gain direction, build execution systems, and stay consistent.',
  provider: {
    '@type': 'Person',
    name: 'Maurik',
  },
  offers: {
    '@type': 'Offer',
    category: 'Paid',
    price: '79',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: 'The Ultimate Guide',
  description:
    'A complete guide for direction and execution with practical lessons, templates, and frameworks.',
  openGraph: {
    title: 'The Ultimate Guide to Turning Your Life Around',
    description:
      'Practical systems for clarity, action, and consistency. Includes 12 HD lessons and lifetime access.',
    type: 'website',
  },
};

export default function UltimateGuidePage() {
  return (
    <div className="course-page ultimate-guide-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="course-topbar">
        <div className="course-topbar-inner">
          <BackToHomeLink className="course-brand" />
          <a
            href={enrollUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="course-topbar-cta"
          >
            Get the Ultimate Guide
          </a>
        </div>
      </header>

      <main>
        <section className="course-hero">
          <p className="course-kicker">The Ultimate Guide</p>
          <h1>The Ultimate Guide to Turning Your Life Around</h1>

          <div className="course-video-frame">
            <div className="course-video-ratio">
              <iframe
                src="https://player.mediadelivery.net/embed/586749/a71eebe6-3179-4ef2-b4e2-0e1c1d079049?autoplay=false&loop=false&muted=true&preload=true&responsive=true&playsinline=true"
                loading="lazy"
                title="Ultimate guide introduction video"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          <p className="course-subtitle">
            A complete framework for people who are tired of starting and stopping.
            Build clarity, structure your weeks, and execute with consistency.
          </p>

          <ul className="course-proof-list" aria-label="Guide highlights">
            <li>12 HD lessons</li>
            <li>Lifetime access</li>
            <li>One-time payment</li>
          </ul>

          <ul className="course-benefit-list" aria-label="Core outcomes">
            {heroBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>

          <div className="course-hero-actions">
            <a href="#pricing" className="btn btn-primary">
              Get Instant Access
            </a>
            <a href="#inside" className="course-hero-link">
              See Full Breakdown
            </a>
          </div>
        </section>

        <section className="course-section course-section-soft">
          <div className="course-section-inner">
            <p className="course-gps-text">
              Think about trying to drive somewhere you have never been before without
              a GPS. You might be motivated, but you will miss turns and get lost.
            </p>
            <p className="course-gps-highlight">
              A goal without a system is the same. This is your GPS.
            </p>
          </div>
        </section>

        <section className="course-section" id="inside">
          <div className="course-section-inner">
            <h2>Inside The Ultimate Guide</h2>
            <p className="course-intro">
              This is not just a collection of productivity tips. It is a complete
              system designed to transform how you approach your goals, time, and life.
            </p>

            <div className="course-pillars-grid">
              <article className="course-pillar-card">
                <p className="course-pillar-label">Pillar 1</p>
                <h3>Direction</h3>
                <p className="course-pillar-subtitle">Clarity and purpose</p>
                <ul>
                  <li>Identify your single most important goal</li>
                  <li>Eliminate distractions disguised as priorities</li>
                  <li>Build a vision that pulls you forward</li>
                  <li>Make decisions with confidence</li>
                </ul>
              </article>

              <article className="course-pillar-card">
                <p className="course-pillar-label">Pillar 2</p>
                <h3>Execution</h3>
                <p className="course-pillar-subtitle">Systems and action</p>
                <ul>
                  <li>Build routines that make progress automatic</li>
                  <li>Use your calendar to control your time</li>
                  <li>Use journaling to control your mind</li>
                  <li>Overcome procrastination through proven techniques</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="course-section course-section-soft">
          <div className="course-section-inner">
            <header className="course-subsection-head">
              <p className="course-subsection-label">Pillar 1</p>
              <h2>Gain Clarity, Get Direction, Set Your Goals</h2>
            </header>
            <div className="course-module-grid">
              {directionModules.map((module) => (
                <article key={module.title} className="course-module-card">
                  <h4>{module.title}</h4>
                  <p>{module.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="course-section">
          <div className="course-section-inner">
            <header className="course-subsection-head">
              <p className="course-subsection-label">Pillar 2</p>
              <h2>Take Action, Get Organised, Manage Your Life</h2>
            </header>
            <div className="course-module-grid">
              {executionModules.map((module) => (
                <article key={module.title} className="course-module-card">
                  <h4>{module.title}</h4>
                  <p>{module.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="course-section course-section-soft">
          <div className="course-section-inner">
            <h2>Also Included</h2>
            <div className="course-bonus-grid">
              <article className="course-bonus-card">
                <h4>Free Productivity Tools</h4>
                <p>
                  Discover completely free tools that boost productivity without
                  subscriptions.
                </p>
              </article>
              <article className="course-bonus-card">
                <h4>Mindsets and Habits</h4>
                <p>
                  Learn the mental frameworks and small habits that compound into big
                  changes.
                </p>
              </article>
              <article className="course-bonus-card">
                <h4>Resources and Links</h4>
                <p>Curated resources to continue your growth beyond the guide.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="pricing" className="course-section">
          <div className="course-section-inner">
            <div className="course-pricing-card">
              <p className="course-pricing-label">The Complete Guide</p>
              <h2>What You Get</h2>

              <ul className="course-value-list">
                {includedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="course-price-block">
                <span className="course-price">$79</span>
                <span className="course-price-note">One-time payment</span>
              </div>

              <a
                href={enrollUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-block"
              >
                Get Instant Access
              </a>
              <p className="course-guarantee">Lifetime access. Future updates included.</p>
            </div>
          </div>
        </section>

        <section className="course-section course-section-soft">
          <div className="course-section-inner">
            <h2>Frequently Asked Questions</h2>
            <div className="course-faq-list">
              {faqs.map((faq) => (
                <details key={faq.question} className="course-faq-item">
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="course-final-cta">
          <div className="course-section-inner">
            <h2>Ready to Turn Your Life Around?</h2>
            <p>Stop drifting. Start building with direction.</p>
            <a
              href={enrollUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light"
            >
              Start the Ultimate Guide
            </a>
          </div>
        </section>
      </main>

      <footer className="course-footer">
        <p>&copy; 2026 Maurik. All rights reserved.</p>
      </footer>

      <a
        href={enrollUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-cta"
      >
        Get the Guide
      </a>
    </div>
  );
}
