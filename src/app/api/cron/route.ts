import { NextResponse } from 'next/server';
import { generatePost } from '@/lib/ai';
import { postToBlogger } from '@/lib/blogger';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const defaultTopic = process.env.DEFAULT_TOPIC || 'Ways to make money online in 2025';
    const defaultKeywords = process.env.DEFAULT_KEYWORDS || 'affiliate marketing, passive income, SEO, digital products';

    const { title, html, tags } = await generatePost(defaultTopic, defaultKeywords);

    const config = {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN || '',
      blogId: process.env.BLOGGER_BLOG_ID || '',
    };
    if (!config.clientId || !config.clientSecret || !config.refreshToken || !config.blogId) {
      throw new Error('Missing Google Blogger credentials');
    }

    const posted = await postToBlogger(config, title, html, tags);
    return NextResponse.json({ ok: true, url: posted.url, id: posted.id, title });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 400 });
  }
}
