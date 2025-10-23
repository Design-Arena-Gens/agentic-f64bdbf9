import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generatePost } from '@/lib/ai';

const Body = z.object({ topic: z.string().min(3), keywords: z.string().optional().default('') });

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { topic, keywords } = Body.parse(json);
    const post = await generatePost(topic, keywords);
    return NextResponse.json(post);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 400 });
  }
}
