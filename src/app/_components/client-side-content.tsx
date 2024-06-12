'use client';
import { useSearchParams } from 'next/navigation';
import useHistoryStack from '@/app/_hooks/useHistoryStack';
import { useEffect } from 'react';
import useCookie, { cookiePreferencesCookie } from '@/app/_hooks/useCookie';
import Script from 'next/script';
import CookieBanner from '@/app/_components/cookie-banner';

// for local dev
// const ADOBE_URL =
// 'https://assets.adobedtm.com/launch-EN89caca63ff2c4dae923a38d7d05ec849-development.min.js';
const ADOBE_URL = 'https://assets.adobedtm.com/launch-ENef935e55aadd4530a5725efe3624e9e2.min.js';

const RETURN_LINK_KEY = 'return-link';

declare global {
  var digitalData: any;
  var _satellite: { track: any };
}

export default function ClientSideContent() {
  const returnLink = useSearchParams().get(RETURN_LINK_KEY) as string;
  useHistoryStack(returnLink ? [{ title: 'App', url: returnLink }] : undefined);

  const [cookiePrefs, setCookiePrefs] = useCookie(cookiePreferencesCookie);

  useEffect(() => {
    document.body.className = 'js-enabled';
  }, []);

  return (
    <>
      <CookieBanner cookiePrefs={cookiePrefs} setCookiePrefs={setCookiePrefs}></CookieBanner>
      {cookiePrefs.hasAcceptedOptionalCookies && (
        <Script src={ADOBE_URL} strategy="lazyOnload" onLoad={onScriptLoad} />
      )}
    </>
  );
}

function onScriptLoad() {
  window.digitalData = {};
  trackPageView();
  createHandlers();
}

function trackLinkClick(element: HTMLAnchorElement) {
  window.digitalData.link = {
    linkName: element.innerText,
    linkDestination: element.getAttribute('href'),
  };
  _satellite.track('tracklink');
}

function trackPageView() {
  const pageName =
    document.querySelector("meta[name='pageName']")?.getAttribute('content') || 'unknown';
  window.digitalData.page = {
    pageInfo: { pageName: 'nhs:cid:help-centre:' + pageName.toLowerCase() },
  };
  _satellite.track('page_view');
}

function createHandlers() {
  for (const link of Array.from(document.querySelectorAll('a'))) {
    link.addEventListener('click', () => trackLinkClick(link));
  }
}
