import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generatePost } from '@/lib/ai';
import { postToBlogger } from '@/lib/blogger';

const Body = z.object({ topic: z.string().min(3), keywords: z.string().optional().default('') });

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { topic, keywords } = Body.parse(json);

    const { title, html, tags } = await generatePost(topic, keywords);

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
