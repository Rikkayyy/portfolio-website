import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, referrer, user_agent } = body as {
      page?: string;
      referrer?: string;
      user_agent?: string;
    };

    if (!page) return NextResponse.json({ ok: false }, { status: 400 });

    // Extract IP — Vercel sets x-forwarded-for, fallback to x-real-ip
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') ?? null;

    // Geo-lookup (best-effort, skip on localhost or failure)
    let country: string | null = null;
    let city: string | null = null;
    if (ip && ip !== '::1' && ip !== '127.0.0.1') {
      try {
        const geo = await fetch(`http://ip-api.com/json/${ip}?fields=country,city`, { signal: AbortSignal.timeout(2000) });
        if (geo.ok) {
          const data = await geo.json() as { country?: string; city?: string };
          country = data.country ?? null;
          city = data.city ?? null;
        }
      } catch {
        // Silently skip geo lookup on failure
      }
    }

    const supabase = getSupabaseAdmin();
    await supabase.from('page_views').insert({
      page,
      ip,
      country,
      city,
      user_agent: user_agent ?? null,
      referrer: referrer || null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
