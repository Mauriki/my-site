import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="state-shell">
      <div className="state-card">
        <p className="state-kicker">404</p>
        <h1>Page Not Found</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="state-link">
          Go back home
        </Link>
      </div>
    </div>
  );
}
