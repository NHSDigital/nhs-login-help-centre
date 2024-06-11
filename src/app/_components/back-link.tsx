'use client';
import useHistoryStack from '@/app/_hooks/useHistoryStack';

export default function BackLink() {
  const [getBackLink] = useHistoryStack();
  const backLink = getBackLink();
  if (!backLink) return null;
  return (
    <p className="nhsuk-breadcrumb__back">
      <a className="nhsuk-breadcrumb__backlink" href={backLink.url}>
        Back to {backLink.title}
      </a>
    </p>
  );
}
