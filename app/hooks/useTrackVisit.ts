'use client';

import { useEffect } from 'react';

export function useTrackVisit(page: string) {
  useEffect(() => {
    fetch('/api/track-visit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        page,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
      }),
    }).catch(() => {});
    // Only fire once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
