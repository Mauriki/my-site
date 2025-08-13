export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12 leading-7">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-8">Last updated: August 13, 2025</p>
      
      <div className="space-y-6">
        <p>
          This site and integration (the &quot;Service&quot;) connect your Notion account to receive and store blog posts from https://maurik.vercel.app.
        </p>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">What we collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We do not sell personal data.</li>
            <li>We may process technical data sent by your browser (e.g., IP, user agent, timestamps).</li>
            <li>OAuth tokens (if/when you authorize) to perform requested actions in your Notion workspace.</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">How we use data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To operate and improve the Service.</li>
            <li>To authenticate your connection with Notion.</li>
            <li>To communicate with you if you contact us.</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Data sharing</h2>
          <p>
            We do not sell your personal data. We may share data with service providers strictly to operate the Service, or if required by law.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Data retention</h2>
          <p>
            We retain data only as long as necessary for the purposes above or as required by law. You may request deletion at any time.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Security</h2>
          <p>
            We use reasonable safeguards, but no method of transmission or storage is 100% secure.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Children</h2>
          <p>
            The Service is not intended for children under 13.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Changes</h2>
          <p>
            We may update this policy. We will post updates on this page.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <p>
            Questions? Email: <a href="mailto:maurikmunir@gmail.com" className="text-blue-600 hover:underline">maurikmunir@gmail.com</a>
          </p>
        </section>
      </div>
    </main>
  );
}
