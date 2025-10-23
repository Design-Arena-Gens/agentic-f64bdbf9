"use client";

import { useState } from 'react';

export function GenerateForm() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Generating...");
    setResult(null);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, keywords })
    });
    const data = await res.json();
    setStatus(res.ok ? "Generated." : `Error: ${data.error || res.statusText}`);
    setResult(data);
  }

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Posting to Blogger...");
    const res = await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, keywords })
    });
    const data = await res.json();
    setStatus(res.ok ? "Posted." : `Error: ${data.error || res.statusText}`);
    setResult(data);
  }

  return (
    <form className="row" onSubmit={handleGenerate}>
      <div style={{ flex: 1, minWidth: 260 }}>
        <div className="label">Topic</div>
        <input className="input" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., Passive income ideas in 2025" />
      </div>
      <div style={{ flex: 1, minWidth: 260 }}>
        <div className="label">Keywords (comma-separated)</div>
        <input className="input" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="affiliate, SEO, digital products" />
      </div>
      <div className="row" style={{ width: "100%", marginTop: 8 }}>
        <button className="btn" type="submit">Generate Draft</button>
        <button className="btn secondary" onClick={handlePost}>Generate + Post</button>
        {status && <span className="badge">{status}</span>}
      </div>
      {result && (
        <pre style={{ marginTop: 12 }}>
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </form>
  );
}
