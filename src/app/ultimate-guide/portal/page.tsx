'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BackToHomeLink } from '@/components/ui/BackToHomeLink';
import KitSubscribeForm from '@/components/ui/KitSubscribeForm';

interface LinkItem {
  label: string;
  url: string;
}

interface Lecture {
  title: string;
  videoSrc: string;
  links: LinkItem[];
  description: string;
}

const lectures: Lecture[] = [
  {
    title: 'Introduction: The Ultimate Guide To Turning Your Life Around',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/202b67ad-4570-43b0-bb80-b67feea25a47?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [],
    description: 'Welcome to the course. In this lesson, we will cover the high-level roadmap of the Ultimate Guide and how to get the most value out of this framework.',
  },
  {
    title: 'Why Clear Goals Matter & How to Make One',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/c812f2fc-2710-4b3c-96fd-0b64dc4bb933?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Find Your One Thing Document', url: 'https://docs.google.com/document/d/1lPfmFltdes283RLMI3gGFqCMazPk65agTXtv3YnMPpM/edit?usp=sharing' },
    ],
    description: 'Learn the true psychology behind effective goal-setting, why traditional resolutions fail, and how to identify your one singular focus.',
  },
  {
    title: 'How to break down your Goal',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/a2f5cec4-d37d-4f4c-a5b5-28e80638008b?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Break Down Your One Goal Document', url: 'https://docs.google.com/document/d/1IqbHWK2bpK-yOLlKrlLp6esSdXioJgJKwPWmHrUpA1o/edit?usp=sharing' },
    ],
    description: 'Vague goals lead to vague actions. In this lecture, we break down your primary goal into actionable quarterly, monthly, and weekly milestones.',
  },
  {
    title: 'Organizing Your Goals Digitally',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/f1363923-3227-4316-a3bf-dc21467ec065?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Trello App Website', url: 'https://trello.com/' },
      { label: 'Trello Board – Template 1', url: 'https://trello.com/b/ENIQh0yV' },
    ],
    description: 'Take your execution outline and build it into a digital workflow using Trello. Organize tasks visually so nothing slips through the cracks.',
  },
  {
    title: 'Why Daily Execution Is the Missing Link',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/e676004e-8ad0-4d13-b479-daae517857e4?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Trello Board – Template 2', url: 'https://trello.com/b/M9JPtCow' },
    ],
    description: 'Consistency is won or lost in daily routines. We map out our weekly boards and explain the mindset needed to maintain progress day after day.',
  },
  {
    title: 'Building Your Morning Routine',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/0fc08cec-431e-425f-95ae-d96061d6b834?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Routine Building Link Document', url: 'https://docs.google.com/document/d/1A1NVtt-oQL8i635Plgmvdi6o0Bcp0eSxTmXuQikmy7Q/edit?usp=sharing' },
    ],
    description: 'How you start your day determines how you end it. Build a sustainable morning routine designed for clarity, energy, and priority focus.',
  },
  {
    title: 'Using Our Calendar to Structure Our Day',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/ba2b81e8-d906-4ee4-ae14-f43ba3bff3e7?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Google Calendar Link', url: 'https://share.google/sRnSAp1ggWFZGSw27' },
    ],
    description: 'Avoid reactive schedules. Learn time-blocking principles that protect your deep work and align your calendar with your actual priorities.',
  },
  {
    title: 'Journalling',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/32c4e67f-6186-478a-a4b4-691e2000696c?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [],
    description: 'De-clutter your mind and track your emotional state. Learn how to write reviews that serve as evidence-based feedback on your weekly progress.',
  },
  {
    title: 'Clearing Your Mind',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/91754960-2fbd-4f1c-bfa6-b20c99008560?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Google Keep Note Organizer', url: 'https://share.google/xnzjNw0GTEhMBmbB9' },
      { label: 'Physical Notebook Recommendation', url: 'https://amzn.to/4ate9Rn' },
      { label: 'Writing Pen Recommendation', url: 'https://amzn.to/4rYo4EB' },
    ],
    description: 'Capture tasks and thoughts instantly to free up cognitive bandwidth. Learn systemized capture tools that clean out mental clutter.',
  },
  {
    title: 'Data Journalling',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/26418777-976a-40b3-9520-fd853a777cc4?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Nario Journal App', url: 'https://nariojournal.com/' },
    ],
    description: 'Level up your reflection by recording quantitative metrics alongside thoughts. Turn your self-improvement journey into actionable data.',
  },
  {
    title: 'Tools And How To Use Them',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/3ea4e191-fb33-42d7-8960-a6c16f232c2d?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Google Calendar', url: 'https://calendar.google.com/?utm_source=chatgpt.com' },
      { label: 'Google Tasks', url: 'https://tasks.google.com/?utm_source=chatgpt.com' },
      { label: 'Google Keep (Notes)', url: 'https://keep.google.com/?utm_source=chatgpt.com' },
      { label: 'ChatGPT', url: 'https://chat.openai.com/' },
      { label: 'Gemini (optional)', url: 'https://gemini.google.com/?utm_source=chatgpt.com' },
      { label: 'Claude (optional)', url: 'https://claude.ai/' },
      { label: 'Consensus Search', url: 'https://consensus.app/' },
      { label: 'YouTube Creator Portal', url: 'https://www.youtube.com/' },
    ],
    description: 'A walkthrough of the full productivity toolkit. Learn how to configure and link these free platforms to automate execution.',
  },
  {
    title: 'Habits, Mindset, and Essential Reads',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/517c92db-817a-4c41-9b84-99c3786ed465?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'The One Thing by Gary Keller', url: 'https://amzn.to/4pJkv3x' },
      { label: 'Atomic Habits by James Clear', url: 'https://amzn.to/4p2DJA2' },
      { label: 'Essentialism by Greg McKeown', url: 'https://amzn.to/49r3Hrj' },
      { label: 'Getting Things Done by David Allen', url: 'https://amzn.to/4j4dyrf' },
    ],
    description: 'Deepen your knowledge. We review core mindsets from essential literature and discuss how small habits compound into massive shifts.',
  },
  {
    title: "What We've Built Conclusion",
    videoSrc: 'https://player.mediadelivery.net/embed/586749/21ec2896-2b74-4ba9-bb68-a1ade78c6e15?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [],
    description: 'Wrap-up and final thoughts. Remember: a system is only as good as its execution. Review your custom structure and take your first step today.',
  },
];

function CoursePortalInner() {
  const searchParams = useSearchParams();
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<boolean[]>([]);

  // Check unlocking on mount
  useEffect(() => {
    const isUnlockedQuery = searchParams.get('unlocked') === 'true';
    const isUnlockedLocal = localStorage.getItem('ultimate_guide_unlocked') === 'true';

    if (isUnlockedQuery) {
      localStorage.setItem('ultimate_guide_unlocked', 'true');
      setUnlocked(true);
    } else if (isUnlockedLocal) {
      setUnlocked(true);
    }
    
    // Load completed progress
    const savedProgress = localStorage.getItem('ultimate_guide_progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        if (Array.isArray(parsed) && parsed.length === lectures.length) {
          setCompletedLessons(parsed);
        } else {
          setCompletedLessons(new Array(lectures.length).fill(false));
        }
      } catch {
        setCompletedLessons(new Array(lectures.length).fill(false));
      }
    } else {
      setCompletedLessons(new Array(lectures.length).fill(false));
    }

    setLoading(false);
  }, [searchParams]);

  // Save progress changes
  const toggleCompleted = (idx: number) => {
    const updated = [...completedLessons];
    updated[idx] = !updated[idx];
    setCompletedLessons(updated);
    localStorage.setItem('ultimate_guide_progress', JSON.stringify(updated));
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset your course progress?')) {
      const reset = new Array(lectures.length).fill(false);
      setCompletedLessons(reset);
      localStorage.setItem('ultimate_guide_progress', JSON.stringify(reset));
    }
  };

  // Calculate completed count
  const completedCount = completedLessons.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / lectures.length) * 100);

  if (loading) {
    return (
      <div className="portal-loading-screen">
        <div className="spinner"></div>
        <p>Loading your portal...</p>
      </div>
    );
  }

  // Display email gate if not unlocked
  if (!unlocked) {
    return (
      <div className="portal-gate-wrapper">
        <header className="course-topbar">
          <div className="course-topbar-inner">
            <BackToHomeLink className="course-brand" />
          </div>
        </header>
        <main className="portal-gate-main">
          <div className="portal-gate-card">
            <span className="gate-eyebrow">Free Access</span>
            <h1>Enter the Ultimate Guide</h1>
            <p>
              Enter your email below. We will send you a confirmation link — click it and you will land directly inside the course. No payment needed, ever.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <KitSubscribeForm />
            </div>
            <p className="gate-footer-note">
              Already confirmed? Check your email for the access link — it goes directly to the course.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Active lecture helper variables
  const currentLecture = lectures[activeIdx];

  return (
    <div className="course-portal-layout">
      {/* Top navbar */}
      <header className="course-topbar">
        <div className="course-topbar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <BackToHomeLink className="course-brand" />
            <span style={{ color: 'var(--ink-mute)', fontSize: 'var(--text-xs)' }}>/</span>
            <span style={{ fontWeight: 600, fontSize: 'var(--text-xs)', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--ink)' }}>
              Course Portal
            </span>
          </div>
          <button
            onClick={resetProgress}
            className="portal-reset-btn"
            title="Reset course progress"
          >
            Reset Progress
          </button>
        </div>
      </header>

      <div className="portal-container">
        {/* Sidebar */}
        <aside className="portal-sidebar" aria-label="Course Syllabus">
          <div className="sidebar-header">
            <h3>Syllabus</h3>
            <div className="progress-section">
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <span className="progress-text">{completedCount} of {lectures.length} lessons ({progressPercent}%)</span>
            </div>
          </div>
          <nav className="sidebar-lessons">
            {lectures.map((lec, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`sidebar-lesson-item ${idx === activeIdx ? 'active' : ''}`}
                aria-current={idx === activeIdx ? 'step' : undefined}
              >
                <div 
                  className="checkbox-wrapper" 
                  onClick={(e) => {
                    e.stopPropagation(); // Avoid switching lecture on checkbox click
                    toggleCompleted(idx);
                  }}
                  role="checkbox"
                  aria-checked={completedLessons[idx]}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleCompleted(idx);
                    }
                  }}
                >
                  <div className={`portal-checkbox ${completedLessons[idx] ? 'checked' : ''}`}>
                    {completedLessons[idx] && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="sidebar-lesson-details">
                  <span className="lesson-number">Lesson {idx + 1}</span>
                  <span className="lesson-title">{lec.title}</span>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="portal-content">
          <article className="active-lecture-card">
            <header className="lecture-header">
              <span className="lecture-badge">Lecture {activeIdx + 1} of {lectures.length}</span>
              <h1>{currentLecture.title}</h1>
            </header>

            {/* Responsive Iframe Container */}
            <div className="portal-video-frame">
              <div className="portal-video-ratio">
                <iframe
                  key={currentLecture.videoSrc} // Force iframe reload when lecture changes
                  src={currentLecture.videoSrc}
                  title={currentLecture.title}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>

            {/* Actions Bar */}
            <div className="lecture-action-bar">
              <button
                onClick={() => toggleCompleted(activeIdx)}
                className={`btn-complete-toggle ${completedLessons[activeIdx] ? 'is-completed' : ''}`}
              >
                {completedLessons[activeIdx] ? '✓ Completed' : 'Mark as Completed'}
              </button>

              <div className="prev-next-buttons">
                <button
                  disabled={activeIdx === 0}
                  onClick={() => setActiveIdx((prev) => prev - 1)}
                  className="btn-nav"
                >
                  ← Prev
                </button>
                <button
                  disabled={activeIdx === lectures.length - 1}
                  onClick={() => setActiveIdx((prev) => prev + 1)}
                  className="btn-nav"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Lecture Details and Resources */}
            <div className="lecture-meta-details">
              <h2>About This Lesson</h2>
              <p className="lecture-description">{currentLecture.description}</p>

              {currentLecture.links.length > 0 && (
                <div className="lecture-resources">
                  <h2>Resources & Downloads</h2>
                  <ul className="resources-list">
                    {currentLecture.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resource-link-item"
                        >
                          <span className="resource-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </span>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}

export default function UltimateGuidePortalPage() {
  return (
    <Suspense fallback={
      <div className="portal-loading-screen">
        <div className="spinner"></div>
        <p>Loading portal...</p>
      </div>
    }>
      <CoursePortalInner />
    </Suspense>
  );
}
