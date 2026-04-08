'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisit } from '@/app/actions/trackVisit';

export function VisitTracker() {
  const path = usePathname();

  useEffect(() => {
    // Skip tracking for admin users (Supabase auth cookies present)
    const hasAuthCookie = document.cookie.split(';').some(c =>
      c.trim().startsWith('sb-') && c.includes('auth-token')
    );
    if (!hasAuthCookie) {
      trackVisit(path, document.referrer, navigator.userAgent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
