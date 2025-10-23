import Link from 'next/link';
import { GenerateForm } from '@/components/GenerateForm';

export default function HomePage() {
  return (
    <main className="container">
      <h1>Agentic Blogger</h1>
      <p className="label">Generate SEO-optimized posts and publish to Google Blogger automatically.</p>
      <div className="card" style={{ marginTop: 16 }}>
        <GenerateForm />
      </div>
      <p style={{ marginTop: 16 }}>
        View API: <Link href="/api/cron">/api/cron</Link>
      </p>
    </main>
  );
}
