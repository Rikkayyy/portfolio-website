'use client';

import { useEffect } from 'react';
import { trackVisit } from '@/app/actions/trackVisit';

export function useTrackVisit(page: string) {
  useEffect(() => {
    trackVisit(page, document.referrer, navigator.userAgent);
    // Only fire once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
