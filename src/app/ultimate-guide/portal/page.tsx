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
    description: 'My name is Maurik and I am a former computer science student. I struggled for four years with focus, consistency, and daily systems. I built this course to share the exact roadmap of clarity, execution, and calm that finally worked for me to regain control of my life, break bad habits, and execute goals.',
  },
  {
    title: 'Why Clear Goals Matter & How to Make One',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/c812f2fc-2710-4b3c-96fd-0b64dc4bb933?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [],
    description: 'Learn why traditional resolutions fail and how to use the Focusing Question from The ONE Thing to identify your one singular focus. Open the interactive worksheet below to define your lead domino and get clear on where you need to go.',
  },
  {
    title: 'How to break down your Goal',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/a2f5cec4-d37d-4f4c-a5b5-28e80638008b?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [],
    description: 'Goals fail because they are too large and vague. Learn how to break down your primary goal into a three-level system of 3-month outcomes, monthly milestones, and weekly tasks to maintain momentum and reduce daily overwhelm.',
  },
  {
    title: 'Organizing Your Goals Digitally',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/f1363923-3227-4316-a3bf-dc21467ec065?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Trello Website', url: 'https://trello.com/' },
      { label: 'Trello Board - Template 1', url: 'https://trello.com/b/ENIQh0yV' },
    ],
    description: 'Build a free, highly visual digital workflow using Trello boards. I\'ll show you how to structure your lists and cards so you know exactly what is on your plate without paying for subscription software.',
  },
  {
    title: 'Why Daily Execution Is the Missing Link',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/e676004e-8ad0-4d13-b479-daae517857e4?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Trello Board - Template 2', url: 'https://trello.com/b/M9JPtCow' },
    ],
    description: 'Consistency is won or lost in daily execution. In this lecture, we map out weekly execution boards and discuss how to structure your routine to protect your attention from distractions.',
  },
  {
    title: 'Building Your Morning Routine',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/0fc08cec-431e-425f-95ae-d96061d6b834?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [],
    description: 'Your morning routine is the engine of your day. I share my simple 20-minute morning and evening routines designed for quick focus, and how to build a routine that works for your life using the habit tracker below.',
  },
  {
    title: 'Using Our Calendar to Structure Our Day',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/ba2b81e8-d906-4ee4-ae14-f43ba3bff3e7?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Google Calendar Link', url: 'https://share.google/sRnSAp1ggWFZGSw27' },
    ],
    description: 'If you don\'t schedule your day, someone else will. Learn time-blocking principles in Google Calendar to protect your deep work blocks and make daily execution stress-free.',
  },
  {
    title: 'Journalling',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/32c4e67f-6186-478a-a4b4-691e2000696c?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [],
    description: 'Journaling is the feedback loop of your life. Learn how to write simple weekly reviews to assess progress honestly, identify errors, and make evidence-based adjustments.',
  },
  {
    title: 'Clearing Your Mind',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/91754960-2fbd-4f1c-bfa6-b20c99008560?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Google Keep Note Organizer', url: 'https://share.google/xnzjNw0GTEhMBmbB9' },
      { label: 'Physical Notebook Recommendation', url: 'https://amzn.to/4ate9Rn' },
      { label: 'Writing Pen Recommendation', url: 'https://amzn.to/4rYo4EB' },
    ],
    description: 'Your brain is for having ideas, not holding them. Set up a quick capture system using Google Keep and a physical notebook to clear your mental workspace instantly.',
  },
  {
    title: 'Data Journalling',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/26418777-976a-40b3-9520-fd853a777cc4?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Nario Journal App', url: 'https://nariojournal.com/' },
    ],
    description: 'Combine qualitative thoughts with daily quantitative metrics. Track sleep, focus hours, and mood using the free Nario Journal app to spot trends and prevent relapses.',
  },
  {
    title: 'Tools And How To Use Them',
    videoSrc: 'https://player.mediadelivery.net/embed/586749/3ea4e191-fb33-42d7-8960-a6c16f232c2d?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [
      { label: 'Google Calendar', url: 'https://calendar.google.com/?utm_source=chatgpt.com' },
      { label: 'Google Tasks', url: 'https://tasks.google.com/?utm_source=chatgpt.com' },
      { label: 'Google Keep', url: 'https://keep.google.com/?utm_source=chatgpt.com' },
      { label: 'ChatGPT', url: 'https://chat.openai.com/' },
      { label: 'Gemini', url: 'https://gemini.google.com/?utm_source=chatgpt.com' },
      { label: 'Claude', url: 'https://claude.ai/' },
      { label: 'Consensus Search', url: 'https://consensus.app/' },
      { label: 'YouTube Creator Portal', url: 'https://www.youtube.com/' },
    ],
    description: 'Connect all the free tools we\'ve built: Google Calendar, Google Tasks, Google Keep, and learn how to use AI tools (ChatGPT, Gemini, Claude) to accelerate your research.',
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
    description: 'Explore the core mental shifts required to make consistency permanent, drawing on concepts from Atomic Habits, The One Thing, Essentialism, and Getting Things Done.',
  },
  {
    title: "What We've Built Conclusion",
    videoSrc: 'https://player.mediadelivery.net/embed/586749/21ec2896-2b74-4ba9-bb68-a1ade78c6e15?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
    links: [],
    description: 'Review your custom Trello boards, morning routines, and Google Calendar blocks. Consistency is about immediate counterbalance. Take your first small action step today.',
  },
];

interface BreakdownRow {
  horizon: string;
  task: string;
  date: string;
  status: string;
  criteria: string;
  notes: string;
}

interface HabitDay {
  morning: boolean;
  deepWork: boolean;
  night: boolean;
  note: string;
}

interface RoutineTrackerState {
  customMorning: string;
  customNight: string;
  trigger: string;
  leadWork: string;
  launchDate: string;
  targetConsistency: string;
  days?: HabitDay[];
}

interface WindowWithPlayerJS extends Window {
  html2pdf?: () => {
    set(options: unknown): {
      from(element: HTMLElement): {
        save(): Promise<void>;
      };
    };
  };
}

function CoursePortalInner() {
  const searchParams = useSearchParams();
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<boolean[]>([]);

  // Interactive Worksheet Modal States
  const [activeWorksheet, setActiveWorksheet] = useState<'one-thing' | 'breakdown' | 'routine' | null>(null);

  const [oneThingAnswers, setOneThingAnswers] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '',
    coreGoal: '', successCriteria: '', startDate: '', endDate: ''
  });

  const [breakdownAnswers, setBreakdownAnswers] = useState<BreakdownRow[]>([]);

  const [routineTracker, setRoutineTracker] = useState<RoutineTrackerState>({
    customMorning: '',
    customNight: '',
    trigger: '',
    leadWork: '',
    launchDate: '',
    targetConsistency: '',
    days: []
  });

  // Load worksheet data from localStorage on mount
  useEffect(() => {
    const savedOneThing = localStorage.getItem('ultimate_guide_worksheet_onething');
    if (savedOneThing) {
      try { setOneThingAnswers(JSON.parse(savedOneThing)); } catch {}
    }

    const savedBreakdown = localStorage.getItem('ultimate_guide_worksheet_breakdown');
    if (savedBreakdown) {
      try { setBreakdownAnswers(JSON.parse(savedBreakdown)); } catch {}
    } else {
      const defaultBreakdown: BreakdownRow[] = [
        { horizon: 'Month 1 Goal', task: '', date: 'End of Month 1', status: 'Not Started', criteria: '', notes: '' },
        { horizon: '  Week 1', task: '', date: 'End of Week 1', status: 'Not Started', criteria: '', notes: '' },
        { horizon: '  Week 2', task: '', date: 'End of Week 2', status: 'Not Started', criteria: '', notes: '' },
        { horizon: '  Week 3', task: '', date: 'End of Week 3', status: 'Not Started', criteria: '', notes: '' },
        { horizon: '  Week 4', task: '', date: 'End of Week 4', status: 'Not Started', criteria: '', notes: '' },
        { horizon: 'Month 2 Goal', task: '', date: 'End of Month 2', status: 'Not Started', criteria: '', notes: '' },
        { horizon: '  Week 5', task: '', date: 'End of Week 5', status: 'Not Started', criteria: '', notes: '' },
        { horizon: '  Week 6', task: '', date: 'End of Week 6', status: 'Not Started', criteria: '', notes: '' },
        { horizon: '  Week 7', task: '', date: 'End of Week 7', status: 'Not Started', criteria: '', notes: '' },
        { horizon: '  Week 8', task: '', date: 'End of Week 8', status: 'Not Started', criteria: '', notes: '' },
        { horizon: 'Month 3 Goal', task: '', date: 'End of Month 3', status: 'Not Started', criteria: '', notes: '' },
        { horizon: '  Week 9', task: '', date: 'End of Week 9', status: 'Not Started', criteria: '', notes: '' },
        { horizon: '  Week 10', task: '', date: 'End of Week 10', status: 'Not Started', criteria: '', notes: '' },
        { horizon: '  Week 11', task: '', date: 'End of Week 11', status: 'Not Started', criteria: '', notes: '' },
        { horizon: '  Week 12', task: '', date: 'End of Week 12', status: 'Not Started', criteria: '', notes: '' }
      ];
      setBreakdownAnswers(defaultBreakdown);
    }

    const savedRoutine = localStorage.getItem('ultimate_guide_worksheet_routine');
    if (savedRoutine) {
      try { setRoutineTracker(JSON.parse(savedRoutine)); } catch {}
    }
  }, []);

  const saveOneThing = (updated: typeof oneThingAnswers) => {
    setOneThingAnswers(updated);
    localStorage.setItem('ultimate_guide_worksheet_onething', JSON.stringify(updated));
  };

  const saveBreakdown = (updated: BreakdownRow[]) => {
    setBreakdownAnswers(updated);
    localStorage.setItem('ultimate_guide_worksheet_breakdown', JSON.stringify(updated));
  };

  const saveRoutine = (updated: RoutineTrackerState) => {
    setRoutineTracker(updated);
    localStorage.setItem('ultimate_guide_worksheet_routine', JSON.stringify(updated));
  };

  const closeModal = () => {
    localStorage.setItem('ultimate_guide_worksheet_onething', JSON.stringify(oneThingAnswers));
    localStorage.setItem('ultimate_guide_worksheet_breakdown', JSON.stringify(breakdownAnswers));
    localStorage.setItem('ultimate_guide_worksheet_routine', JSON.stringify(routineTracker));
    setActiveWorksheet(null);
  };

  const handlePrint = (title: string) => {
    localStorage.setItem('ultimate_guide_worksheet_onething', JSON.stringify(oneThingAnswers));
    localStorage.setItem('ultimate_guide_worksheet_breakdown', JSON.stringify(breakdownAnswers));
    localStorage.setItem('ultimate_guide_worksheet_routine', JSON.stringify(routineTracker));
    const originalTitle = document.title;
    document.title = title;
    window.print();
    document.title = originalTitle;
  };

  const handleDownloadPDF = async (filename: string) => {
    // Save state first
    localStorage.setItem('ultimate_guide_worksheet_onething', JSON.stringify(oneThingAnswers));
    localStorage.setItem('ultimate_guide_worksheet_breakdown', JSON.stringify(breakdownAnswers));
    localStorage.setItem('ultimate_guide_worksheet_routine', JSON.stringify(routineTracker));

    const element = document.getElementById('worksheet-modal-root');
    if (!element) return;

    // Dynamically load html2pdf.js from CDN
    if (!(window as unknown as WindowWithPlayerJS).html2pdf) {
      try {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
          script.onload = () => resolve();
          script.onerror = () => reject();
          document.head.appendChild(script);
        });
      } catch (err) {
        console.error("Failed to load PDF library", err);
        window.print();
        return;
      }
    }

    // Add generating class to format styles cleanly
    element.classList.add('is-pdf-generating');

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await (window as unknown as WindowWithPlayerJS).html2pdf?.().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation failed, falling back to print", err);
      window.print();
    } finally {
      element.classList.remove('is-pdf-generating');
    }
  };

  // Auto-resize textareas to fit content without scrolling
  const autoExpandTextarea = (el: HTMLTextAreaElement | null) => {
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };

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
    let loadedProgress = new Array(lectures.length).fill(false);
    const savedProgress = localStorage.getItem('ultimate_guide_progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        if (Array.isArray(parsed) && parsed.length === lectures.length) {
          loadedProgress = parsed;
        }
      } catch {
        // Fallback
      }
    }
    setCompletedLessons(loadedProgress);

    // Auto-select first uncompleted lesson on load
    const firstUncompleted = loadedProgress.findIndex((completed) => !completed);
    if (firstUncompleted !== -1) {
      setActiveIdx(firstUncompleted);
    } else {
      setActiveIdx(0);
    }

    setLoading(false);
  }, [searchParams]);

  // Save progress changes
  const toggleCompleted = (idx: number) => {
    const updated = [...completedLessons];
    const isNowCompleted = !updated[idx];
    updated[idx] = isNowCompleted;
    setCompletedLessons(updated);
    localStorage.setItem('ultimate_guide_progress', JSON.stringify(updated));

    // If marked as completed and there's a next lesson, auto-advance after a brief delay
    if (isNowCompleted && idx === activeIdx && idx < lectures.length - 1) {
      setTimeout(() => {
        setActiveIdx(idx + 1);
      }, 600);
    }
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
                  loading="lazy"
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

              {(currentLecture.links.length > 0 || activeIdx === 1 || activeIdx === 2 || activeIdx === 5) && (
                <div className="lecture-resources">
                  <h2>Resources & Downloads</h2>
                  
                  {/* Interactive Worksheet Triggers */}
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: currentLecture.links.length > 0 ? '1.5rem' : '0' }}>
                    {activeIdx === 1 && (
                      <button
                        onClick={() => setActiveWorksheet('one-thing')}
                        className="btn-worksheet-trigger"
                      >
                        Open Interactive Worksheet
                      </button>
                    )}
                    {activeIdx === 2 && (
                      <button
                        onClick={() => setActiveWorksheet('breakdown')}
                        className="btn-worksheet-trigger"
                      >
                        Open Interactive Planner
                      </button>
                    )}
                    {activeIdx === 5 && (
                      <button
                        onClick={() => setActiveWorksheet('routine')}
                        className="btn-worksheet-trigger"
                      >
                        Open Interactive Routine Builder
                      </button>
                    )}
                  </div>

                  {currentLecture.links.length > 0 && (
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
                  )}
                </div>
              )}
            </div>
          </article>
        </main>
      </div>

      {/* Interactive Worksheets Modals */}
      {activeWorksheet && (
        <div className="worksheet-modal-overlay" onClick={closeModal}>
          <div className="worksheet-modal-content" id="worksheet-modal-root" onClick={(e) => e.stopPropagation()}>
            <header className="worksheet-modal-header">
              <h2>
                {activeWorksheet === 'one-thing' && 'Find Your One Thing'}
                {activeWorksheet === 'breakdown' && 'Goal Breakdown Planner'}
                {activeWorksheet === 'routine' && 'Morning and Night Routine Builder'}
              </h2>
              <button className="worksheet-modal-close-btn" onClick={closeModal}>
                ✕
              </button>
            </header>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {activeWorksheet === 'one-thing' && (
                <div>
                  <p className="lecture-description print-hide" style={{ marginBottom: '2rem' }}>
                    Use the Focusing Question to identify your lead domino. Answer these 5 prep questions first, then state your core 3-month goal below.
                  </p>

                  <div className="worksheet-form-group print-hide">
                    <label>
                      <span>1. Current Reality: What is your current situation and what is causing you the most stress or dissatisfaction?</span>
                    </label>
                    <textarea
                      className="print-hide"
                      ref={autoExpandTextarea}
                      value={oneThingAnswers.q1}
                      onChange={(e) => {
                        setOneThingAnswers({ ...oneThingAnswers, q1: e.target.value });
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      onBlur={() => saveOneThing(oneThingAnswers)}
                      placeholder="Be completely honest about your time, money, and habits..."
                    />
                  </div>

                  <div className="worksheet-form-group print-hide">
                    <label>
                      <span>2. Potential Goals: What are all the potential goals you are considering across career, business, or health?</span>
                    </label>
                    <textarea
                      className="print-hide"
                      ref={autoExpandTextarea}
                      value={oneThingAnswers.q2}
                      onChange={(e) => {
                        setOneThingAnswers({ ...oneThingAnswers, q2: e.target.value });
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      onBlur={() => saveOneThing(oneThingAnswers)}
                      placeholder="List everything that comes to mind..."
                    />
                  </div>

                  <div className="worksheet-form-group print-hide">
                    <label>
                      <span>3. Compounding Effect: Which of these potential goals will make the other goals easier, faster, or completely unnecessary?</span>
                    </label>
                    <textarea
                      className="print-hide"
                      ref={autoExpandTextarea}
                      value={oneThingAnswers.q3}
                      onChange={(e) => {
                        setOneThingAnswers({ ...oneThingAnswers, q3: e.target.value });
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      onBlur={() => saveOneThing(oneThingAnswers)}
                      placeholder="Identify your Lead Domino..."
                    />
                  </div>

                  <div className="worksheet-form-group print-hide">
                    <label>
                      <span>4. Main Obstacles: What are the main obstacles or distractions that are currently stopping you from succeeding?</span>
                    </label>
                    <textarea
                      className="print-hide"
                      ref={autoExpandTextarea}
                      value={oneThingAnswers.q4}
                      onChange={(e) => {
                        setOneThingAnswers({ ...oneThingAnswers, q4: e.target.value });
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      onBlur={() => saveOneThing(oneThingAnswers)}
                      placeholder="Identify bad habits, environment blocks, or tasks to avoid..."
                    />
                  </div>

                  <div className="worksheet-form-group print-hide">
                    <label>
                      <span>5. Success Criteria: What does success look like for this goal? How will you know when it is successfully completed?</span>
                    </label>
                    <textarea
                      className="print-hide"
                      ref={autoExpandTextarea}
                      value={oneThingAnswers.q5}
                      onChange={(e) => {
                        setOneThingAnswers({ ...oneThingAnswers, q5: e.target.value });
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      onBlur={() => saveOneThing(oneThingAnswers)}
                      placeholder="Describe the completed picture..."
                    />
                  </div>

                  <div className="worksheet-card">
                    <h3 style={{ margin: '0 0 1rem', color: 'var(--ink)', fontWeight: 600 }}>My One Thing Goal Card</h3>
                    
                    <div className="worksheet-form-group">
                      <label style={{ color: 'var(--ink)' }}>
                        <span className="print-hide">Focusing Question Check: My Core 3-Month Goal</span>
                        <span className="print-only">My Core 3-Month Goal</span>
                      </label>
                      <textarea
                        className="print-hide"
                        ref={autoExpandTextarea}
                        value={oneThingAnswers.coreGoal}
                        onChange={(e) => {
                          setOneThingAnswers({ ...oneThingAnswers, coreGoal: e.target.value });
                          e.target.style.height = 'auto';
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        onBlur={() => saveOneThing(oneThingAnswers)}
                        placeholder="State your ONE single 3-month goal clearly..."
                      />
                      <div className="print-only print-text-box">{oneThingAnswers.coreGoal || "(No response)"}</div>
                    </div>
                    
                    <div className="worksheet-form-group">
                      <label style={{ color: 'var(--ink)' }}>Specific Success Criteria</label>
                      <textarea
                        className="print-hide"
                        ref={autoExpandTextarea}
                        value={oneThingAnswers.successCriteria}
                        onChange={(e) => {
                          setOneThingAnswers({ ...oneThingAnswers, successCriteria: e.target.value });
                          e.target.style.height = 'auto';
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        onBlur={() => saveOneThing(oneThingAnswers)}
                        placeholder="- e.g., Finished university assignments daily..."
                      />
                      <div className="print-only print-text-box">{oneThingAnswers.successCriteria || "(No response)"}</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="worksheet-form-group" style={{ marginBottom: 0 }}>
                        <label style={{ color: 'var(--ink)' }}>Start Date</label>
                        <input
                          type="text"
                          className="print-hide"
                          value={oneThingAnswers.startDate}
                          onChange={(e) => setOneThingAnswers({ ...oneThingAnswers, startDate: e.target.value })}
                          onBlur={() => saveOneThing(oneThingAnswers)}
                          placeholder="YYYY-MM-DD"
                          style={{ width: '100%', padding: '0.5rem 0', border: 'none', borderBottom: '1px solid var(--border-soft)', borderRadius: 0, background: 'transparent' }}
                        />
                        <div className="print-only print-text-box">{oneThingAnswers.startDate || "(No response)"}</div>
                      </div>
                      <div className="worksheet-form-group" style={{ marginBottom: 0 }}>
                        <label style={{ color: 'var(--ink)' }}>Target Completion Date</label>
                        <input
                          type="text"
                          className="print-hide"
                          value={oneThingAnswers.endDate}
                          onChange={(e) => setOneThingAnswers({ ...oneThingAnswers, endDate: e.target.value })}
                          onBlur={() => saveOneThing(oneThingAnswers)}
                          placeholder="YYYY-MM-DD"
                          style={{ width: '100%', padding: '0.5rem 0', border: 'none', borderBottom: '1px solid var(--border-soft)', borderRadius: 0, background: 'transparent' }}
                        />
                        <div className="print-only print-text-box">{oneThingAnswers.endDate || "(No response)"}</div>
                      </div>
                    </div>

                    {/* Clean Custom Print Footer (hides portal suffix) */}
                    <div className="print-footer print-only" style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-soft)', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--ink-mute)' }}>
                      <span>https://maurikmillaku.com/ultimate-guide</span>
                      <span>The Ultimate Guide | Maurik</span>
                    </div>
                  </div>
                </div>
              )}

              {activeWorksheet === 'breakdown' && (
                <div>
                  <p className="lecture-description print-hide" style={{ marginBottom: '1.5rem' }}>
                    Break your primary goal down into monthly outcomes and weekly finishable tasks. Changes are expected and healthy as you execute.
                  </p>
                  <div style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
                    <table className="worksheet-grid-table">
                      <thead>
                        <tr>
                          <th style={{ width: '20%' }}>Horizon</th>
                          <th style={{ width: '40%' }}>Milestone / Task Name</th>
                          <th style={{ width: '15%' }}>Target Date</th>
                          <th style={{ width: '12%' }}>Status</th>
                          <th style={{ width: '13%' }}>Success Check</th>
                        </tr>
                      </thead>
                      <tbody>
                        {breakdownAnswers.map((row: BreakdownRow, idx: number) => (
                          <tr key={idx}>
                            <td style={{ fontWeight: row.horizon.startsWith('Month') ? 600 : 400 }}>
                              {row.horizon}
                            </td>
                            <td>
                              <input
                                type="text"
                                className="print-hide"
                                value={row.task}
                                onChange={(e) => {
                                  const updated = [...breakdownAnswers];
                                  updated[idx].task = e.target.value;
                                  setBreakdownAnswers(updated);
                                }}
                                onBlur={() => saveBreakdown(breakdownAnswers)}
                                placeholder={row.horizon.startsWith('Month') ? "Define month outcome..." : "e.g., Outline chapters / build module..."}
                              />
                              <span className="print-only">{row.task || "(Empty)"}</span>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="print-hide"
                                value={row.date}
                                onChange={(e) => {
                                  const updated = [...breakdownAnswers];
                                  updated[idx].date = e.target.value;
                                  setBreakdownAnswers(updated);
                                }}
                                onBlur={() => saveBreakdown(breakdownAnswers)}
                              />
                              <span className="print-only">{row.date || "(Empty)"}</span>
                            </td>
                            <td>
                              <select
                                className="print-hide"
                                value={row.status}
                                onChange={(e) => {
                                  const updated = [...breakdownAnswers];
                                  updated[idx].status = e.target.value;
                                  saveBreakdown(updated);
                                }}
                              >
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                              </select>
                              <span className="print-only">{row.status}</span>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="print-hide"
                                value={row.criteria}
                                onChange={(e) => {
                                  const updated = [...breakdownAnswers];
                                  updated[idx].criteria = e.target.value;
                                  setBreakdownAnswers(updated);
                                }}
                                onBlur={() => saveBreakdown(breakdownAnswers)}
                                placeholder="Success check..."
                              />
                              <span className="print-only">{row.criteria || "(Empty)"}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Clean Custom Print Footer (hides portal suffix) */}
                  <div className="print-footer print-only" style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-soft)', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--ink-mute)' }}>
                    <span>https://maurikmillaku.com/ultimate-guide</span>
                    <span>The Ultimate Guide | Maurik</span>
                  </div>
                </div>
              )}

              {activeWorksheet === 'routine' && (
                <div>
                  <p className="lecture-description print-hide" style={{ marginBottom: '2rem' }}>
                    Use this planner to build your custom morning and night routines. Keep them simple, short, and repeatable so you can warm up your engine and wind down consistently.
                  </p>

                  <div className="worksheet-form-group">
                    <label>
                      <span>1. My Custom Morning Routine Steps (20-30 mins)</span>
                    </label>
                    <textarea
                      className="print-hide"
                      ref={autoExpandTextarea}
                      value={routineTracker.customMorning}
                      onChange={(e) => {
                        setRoutineTracker({ ...routineTracker, customMorning: e.target.value });
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      onBlur={() => saveRoutine(routineTracker)}
                      placeholder="Write your morning routine steps here...&#10;&#10;Maurik's Example:&#10;1. Quick hygiene (wash face, brush teeth, make bed)&#10;2. Get sunlight (open window / step outside)&#10;3. Drink water / lemon water&#10;4. Walk for 5 minutes (wake up)&#10;5. Review schedule / calendar while coffee brews"
                    />
                    <div className="print-only print-text-box">{routineTracker.customMorning || "(No morning routine)"}</div>
                  </div>

                  <div className="worksheet-form-group" style={{ marginTop: '2rem' }}>
                    <label>
                      <span>2. My Custom Night Routine Steps (20 mins wind down)</span>
                    </label>
                    <textarea
                      className="print-hide"
                      ref={autoExpandTextarea}
                      value={routineTracker.customNight}
                      onChange={(e) => {
                        setRoutineTracker({ ...routineTracker, customNight: e.target.value });
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      onBlur={() => saveRoutine(routineTracker)}
                      placeholder="Write your night routine steps here...&#10;&#10;Maurik's Example:&#10;1. Quick hygiene&#10;2. Light stretching&#10;3. Evening reflection or prayer&#10;4. Screen shutdown & consistent sleep time"
                    />
                    <div className="print-only print-text-box">{routineTracker.customNight || "(No night routine)"}</div>
                  </div>

                  <div className="worksheet-card" style={{ marginTop: '2.5rem' }}>
                    <h3 style={{ margin: '0 0 1rem', color: 'var(--ink)', fontWeight: 600 }}>My Routine Action Card</h3>

                    <div className="worksheet-form-group">
                      <label style={{ color: 'var(--ink)' }}>
                        <span>Routine Trigger (e.g., waking up, closing your laptop at 6:00 PM)</span>
                      </label>
                      <input
                        type="text"
                        className="print-hide"
                        value={routineTracker.trigger}
                        onChange={(e) => setRoutineTracker({ ...routineTracker, trigger: e.target.value })}
                        onBlur={() => saveRoutine(routineTracker)}
                        placeholder="What specific event or time triggers your routine?"
                      />
                      <div className="print-only print-text-box" style={{ borderBottom: '1px solid var(--border-soft)' }}>{routineTracker.trigger || "(Empty)"}</div>
                    </div>

                    <div className="worksheet-form-group" style={{ marginTop: '1.5rem' }}>
                      <label style={{ color: 'var(--ink)' }}>
                        <span>Lead Work Session (What is the very first important task you start immediately after your morning routine?)</span>
                      </label>
                      <input
                        type="text"
                        className="print-hide"
                        value={routineTracker.leadWork}
                        onChange={(e) => setRoutineTracker({ ...routineTracker, leadWork: e.target.value })}
                        onBlur={() => saveRoutine(routineTracker)}
                        placeholder="e.g., 90-minute writing session, check primary calendar priority..."
                      />
                      <div className="print-only print-text-box" style={{ borderBottom: '1px solid var(--border-soft)' }}>{routineTracker.leadWork || "(Empty)"}</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }} className="grid-2col">
                      <div className="worksheet-form-group">
                        <label style={{ color: 'var(--ink)' }}>Routine Launch Date</label>
                        <input
                          type="date"
                          className="print-hide"
                          value={routineTracker.launchDate}
                          onChange={(e) => setRoutineTracker({ ...routineTracker, launchDate: e.target.value })}
                          onBlur={() => saveRoutine(routineTracker)}
                        />
                        <div className="print-only print-text-box" style={{ borderBottom: '1px solid var(--border-soft)' }}>{routineTracker.launchDate || "(Empty)"}</div>
                      </div>
                      <div className="worksheet-form-group">
                        <label style={{ color: 'var(--ink)' }}>Target Routine Consistency</label>
                        <input
                          type="text"
                          className="print-hide"
                          value={routineTracker.targetConsistency}
                          onChange={(e) => setRoutineTracker({ ...routineTracker, targetConsistency: e.target.value })}
                          onBlur={() => saveRoutine(routineTracker)}
                          placeholder="e.g., 5 days/week, daily"
                        />
                        <div className="print-only print-text-box" style={{ borderBottom: '1px solid var(--border-soft)' }}>{routineTracker.targetConsistency || "(Empty)"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Clean Custom Print Footer (hides portal suffix) */}
                  <div className="print-footer print-only" style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-soft)', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--ink-mute)' }}>
                    <span>https://maurikmillaku.com/ultimate-guide</span>
                    <span>The Ultimate Guide | Maurik</span>
                  </div>
                </div>
              )}
            </div>

            <div className="print-hide" style={{ marginTop: '2rem', borderTop: '1px solid var(--border-soft)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                className="btn-nav"
                onClick={() => handlePrint(activeWorksheet === 'one-thing' ? 'Find-Your-One-Thing-Worksheet' : activeWorksheet === 'breakdown' ? '3-Month-Goal-Breakdown' : 'Morning-Night-Routine-Builder')}
                style={{ background: '#f1f5f9', color: '#1e293b' }}
              >
                Print Worksheet
              </button>
              <button
                className="btn-nav"
                onClick={() => handleDownloadPDF(activeWorksheet === 'one-thing' ? 'Find-Your-One-Thing-Worksheet' : activeWorksheet === 'breakdown' ? '3-Month-Goal-Breakdown' : 'Morning-Night-Routine-Builder')}
                style={{ background: '#f1f5f9', color: '#1e293b' }}
              >
                Save as PDF
              </button>
              <button
                className="btn-worksheet-trigger"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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
