import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container">
      <main className="legal-page">
        <header className="legal-card legal-header">
          <h1>Terms of Use</h1>
          <p className="legal-sub">
            Clear, readable terms — short and focused on what matters for visitors.
          </p>
        </header>

        <section className="legal-card">
          <h2>Acceptance</h2>
          <p>
            By using this website you agree to these terms. Use the site responsibly and respect intellectual property.
          </p>
        </section>

        <section className="legal-card">
          <h2>Content & ownership</h2>
          <p>
            Content on this site is owned by the author unless otherwise stated. You may view and share links but not reproduce
            content without permission.
          </p>
        </section>

        <section className="legal-card">
          <h2>Limitations & disclaimers</h2>
          <p>
            Information is provided &quot;as is&quot; and for informational purposes only. The site owner is not liable for damages arising
            from site use.
          </p>
        </section>

        <section className="legal-card">
          <h2>Contact</h2>
          <p>
            To request changes, removal, or for legal questions, <Link href="/contact">get in touch</Link>.
          </p>
        </section>

        <footer className="legal-note">
          <small>
            These terms are a readable summary; keep your full legal text available if required by law.
          </small>
        </footer>
      </main>
    </div>
  );
}
