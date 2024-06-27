'use client';
import { MouseEvent, PropsWithChildren } from 'react';

export default function BackLink({ children }: PropsWithChildren) {
  function onBackClick(e: MouseEvent) {
    e.preventDefault();
    window.history.back();
  }
  return (
    <>
      <a href="/contact" onClick={onBackClick}>
        {children}
      </a>
    </>
  );
}
