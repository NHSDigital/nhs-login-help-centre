const Consent = (function() {
  const COOKIE_NAME = 'cookiePreference';
  const DEFAULT_COOKIE_PREFERENCES = { hasSeenBanner: false, hasAcceptedOptionalCookies: true };
  const ACCEPT_ALL_COOKIE_PREFERENCES = { hasSeenBanner: true, hasAcceptedOptionalCookies: true };

  return {
    getCookiePreferences() {
      const preferenceCookie = Utils.getJSONCookie(COOKIE_NAME);
      if (!preferenceCookie) {
        return DEFAULT_COOKIE_PREFERENCES;
      }
      // previously this cookie was just set as a single flag '1'
      if (preferenceCookie === 1) {
        Consent.setAcceptAllCookies();
        return ACCEPT_ALL_COOKIE_PREFERENCES;
      }
      return preferenceCookie;
    },

    setAcceptAllCookies() {
      Utils.setJSONCookie(COOKIE_NAME, ACCEPT_ALL_COOKIE_PREFERENCES);
    },

    setHasSeenCookieBanner() {
      const cookiePreferences = Consent.getCookiePreferences();
      Utils.setJSONCookie(COOKIE_NAME, {
        ...cookiePreferences,
        hasSeenBanner: true,
      });
    },
  };
})();
