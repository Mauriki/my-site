import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="container">
      <main className="legal-page">
        <header className="legal-card legal-header">
          <h1>Privacy Policy</h1>
          <p className="legal-sub">
            Short summary: how your data is handled — clear, minimal, and privacy-first.
          </p>
        </header>

        <section className="legal-card">
          <h2>What we collect</h2>
          <p>
            We only collect the information you provide intentionally (for example, your email when subscribing).
            We do not sell personal data. Aggregated analytics may be used to improve the site.
          </p>
        </section>

        <section className="legal-card">
          <h2>How we use it</h2>
          <p>
            Email addresses are used only to deliver newsletter content via the third-party provider you subscribe with.
            We may use basic analytics to understand site performance and improve content.
          </p>
        </section>

        <section className="legal-card">
          <h2>Third-party services</h2>
          <p>
            Subscription handling and email delivery are performed by Substack (or other chosen provider). Please review their
            policies for details on data usage. This site links to external services and is not responsible for their practices.
          </p>
        </section>

        <section className="legal-card">
          <h2>Contact</h2>
          <p>
            Questions or requests about your data? <Link href="/contact">Contact me</Link>.
          </p>
        </section>

        <footer className="legal-note">
          <small>
            This page is for informational purposes. The original legal text remains in effect where applicable.
          </small>
        </footer>
      </main>
    </div>
  );
}
