'use client';

import { usePathname } from 'next/navigation';
import { useTrackVisit } from '@/app/hooks/useTrackVisit';

export function VisitTracker() {
  const path = usePathname();
  useTrackVisit(path);
  return null;
}
