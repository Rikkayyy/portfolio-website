'use server';

import { headers } from 'next/headers';
import { getSupabaseAdmin } from '@/lib/supabase';

// Rate limit: max 20 requests per IP per minute
const RATE_LIMIT = 20;
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function trackVisit(page: string, referrer: string, userAgent: string) {
  try {
    if (!page) return;

    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : headersList.get('x-real-ip') ?? null;

    if (ip && isRateLimited(ip)) return;

    let country: string | null = null;
    let city: string | null = null;
    if (ip && ip !== '::1' && ip !== '127.0.0.1') {
      try {
        const geo = await fetch(`http://ip-api.com/json/${ip}?fields=country,city`, {
          signal: AbortSignal.timeout(2000),
        });
        if (geo.ok) {
          const data = (await geo.json()) as { country?: string; city?: string };
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
      user_agent: userAgent || null,
      referrer: referrer || null,
    });
  } catch {
    // Silently fail
  }
}
