import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" style={{ color: '#007AFF', textDecoration: 'none' }}>
          Go back home
        </Link>
      </div>
    </div>
  );
}
