import type { Metadata } from 'next';
import { BackToHomeLink } from '@/components/ui/BackToHomeLink';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Story | Maurik',
  description: 'The story behind how I build systems that work for the neurodivergent brain.',
};

export default function AboutPage() {
  return (
    <div className="course-page about-page">
      <header className="course-topbar">
        <div className="course-topbar-inner">
          <BackToHomeLink className="course-brand" />
        </div>
      </header>

      <main>
        <section className="course-section">
          <div className="course-section-inner">
            <div className="about-content">
              <h1>About Me</h1>
              <p>For most of my life, I thought I was the problem. I was not.</p>
              <p>I grew up in Kosovo, a competitive kid who loved football and absolutely hated losing. For the early years of my school life, I was highly focused, driven by a natural desire to do my best on the pitch and in the classroom. Football was my first true passion, and though paths in sports can be uncertain, that love for the game, and the drive it taught me, never left. I still watch every Real Madrid game and play whenever I get the chance.</p>
              <p>The first signs that my brain processed things differently appeared when I faced traditional rote memorization. Trying to force myself to learn things I had no interest in felt like hitting a wall. As school became more complex and distractions like smartphones entered the picture, maintaining focus became an uphill battle. My academic performance and my confidence started to slip, and by high school, the traditional classroom environment felt increasingly challenging.</p>
              <p>During high school, I realized I needed a foundation to anchor my life. I began practicing my faith, starting with daily prayers. This became the bedrock of everything for me. It provided peace, clarity, and a structured rhythm to my days. More than anything, it taught me discipline and the belief that time is valuable. I realized that our hours have weight, and I didn&apos;t want to waste mine or watch others waste theirs.</p>
              <p>I entered university to study Computer Science, but quickly found myself overwhelmed. I was struggling to keep up with the curriculum and tried to fix my life by doing everything at once. At one point, I was enrolled in multiple unrelated courses and trying to follow overly complex morning routines. I was trying to optimize every second, but because I lacked focus, I was getting nothing done. I once studied intensely for an exam and still failed it repeatedly, which made me realize that the standard academic approach just wasn&apos;t going to work for me.</p>
              <p>By my third year, I knew something had to change. I decided to take a step back and figure things out on my own terms. It was a difficult decision, but the moment I made it, I felt a deep sense of relief. I was finally taking ownership of my path.</p>
              <p>I spent months researching, reading, and testing different methods. I took the strategies that actually worked and assembled them into a simple, execution-focused system. For the first time, I started finishing what I started. I completed courses, built apps, and made guides like my <Link href="/ultimate-guide" style={{ textDecoration: 'underline', color: 'var(--brand)' }}>Ultimate Guide</Link> and <Link href="/find-your-direction" style={{ textDecoration: 'underline', color: 'var(--brand)' }}>Finding Your Direction</Link> to help others do the same.</p>
              <p>It was during this period of building systems that I learned about ADHD. Looking back, everything clicked. The patterns of freezing under pressure, losing momentum, and struggling with unstructured tasks weren&apos;t signs of laziness, my brain simply processed focus and stimulation differently. Understanding this was a breakthrough. There is no magic cure, but there are better systems to work with it.</p>
              <p>Today, I am focused on building systems for myself and helping others build their own, so they can figure out the right things to do and actually get them done. The proudest moments of my life have come from completing what I set out to do. I want to take everything I learned from my struggles and turn it into resources that help people find their direction and build the discipline to follow it. Your brain isn&apos;t broken. It just needs the right system.</p>
              <p>That is what I am here to build.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="course-footer">
        <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Maurik. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
          <Link href="/privacy" style={{ color: 'var(--ink-soft)' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: 'var(--ink-soft)' }}>Terms of Use</Link>
        </div>
      </footer>
    </div>
  );
}
