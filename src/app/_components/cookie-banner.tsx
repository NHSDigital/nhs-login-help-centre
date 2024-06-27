'use client';

import { useState } from 'react';
import { CookiePreferences, acceptAllCookies } from '../_hooks/useCookie';

export default function CookieBanner({
  cookiePrefs,
  setCookiePrefs,
}: {
  cookiePrefs: CookiePreferences;
  setCookiePrefs: (prefs: CookiePreferences) => void;
}) {
  const [hasAccepted, setHasAccepted] = useState(false);

  const acceptCookies = () => {
    setCookiePrefs(acceptAllCookies);
    setHasAccepted(true);
  };

  const chooseCookies = () => {
    setCookiePrefs({ ...cookiePrefs, hasSeenBanner: true });
    window.location.assign(`${process.env.ACCESS_FRONTEND_URL}/cookies/cookie-settings`);
  };

  if (!cookiePrefs.hasSeenBanner) {
    return (
      <div id="nhsuk-cookie-banner" tabIndex={-1}>
        <div id="cookiebanner" className="nhsuk-cookie-banner">
          <div className="page-section">
            <div className="nhsuk-width-container">
              <h4 className="nhsuk-heading-s cookie-heading" tabIndex={-1}>
                Cookies on NHS login
              </h4>
              <p tabIndex={-1}>
                Cookies collect information about how you use NHS login to help us make our site
                work as well as possible.
              </p>
              <p tabIndex={-1}>
                We would also like to use analytics cookies to improve our service.
              </p>

              <button
                className="nhsuk-button full-width"
                id="nhsuk-cookie-banner__link_accept"
                onClick={acceptCookies}
              >
                Accept all cookies
              </button>

              <button
                className="nhsuk-button full-width"
                id="nhsuk-cookie-banner__link"
                onClick={chooseCookies}
              >
                Choose your cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (hasAccepted) {
    return (
      <div id="nhsuk-cookie-banner" tabIndex={-1}>
        <div id="nhsuk-cookie-confirmation-banner" className="nhsuk-success-banner" role="banner">
          <div className="page-section" style={{ padding: '0px' }}>
            <div className="nhsuk-width-container">
              <p className="nhsuk-body accepted-cookies" tabIndex={-1}>
                You can change your cookie settings at any time using our&nbsp;
                <a href={process.env.ACCESS_FRONTEND_URL + '/cookies'} className="nhsuk-link">
                  cookies page
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
