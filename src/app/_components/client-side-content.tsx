'use client';

import { useSearchParams } from 'next/navigation';
import useHistoryStack from '@/app/_hooks/useHistoryStack';
import { useEffect } from 'react';

const RETURN_LINK_KEY = 'return-link';

export default function ClientSideContent() {
  const returnLink = useSearchParams().get(RETURN_LINK_KEY) as string;
  useHistoryStack(returnLink ? [{ title: 'App', url: returnLink }] : undefined);

  useEffect(() => {
    document.body.className = 'js-enabled';
  }, []);

  return null;
}
