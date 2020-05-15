const COOKIE_NAME = 'cookiePreference';
const COOKIE_DOMAIN = 'localhost'; // '.login.nhs.uk';
const COOKIE_LIVE_DAYS = 365;

const MILLISECONDS_IN_ONE_DAY = 86400000;

const DEFAULT_COOKIE_PREFERENCES = { hasSeenBanner: false, hasAcceptedOptionalCookies: true };
const ACCEPT_ALL_COOKIE_PREFERENCES = { hasSeenBanner: true, hasAcceptedOptionalCookies: true };

function getCookiePreferences() {
  const preferenceCookie = getJSONCookie(COOKIE_NAME);
  if (!preferenceCookie) {
    return DEFAULT_COOKIE_PREFERENCES;
  }
  // previously this cookie was just set as a single flag '1'
  if (preferenceCookie === 1) {
    return ACCEPT_ALL_COOKIE_PREFERENCES;
  }
  return preferenceCookie;
}

function setCookiePreferences(hasSeenBanner = null, hasAcceptedOptionalCookies = null) {
  const cookiePreferences = getCookiePreferences();
  if (hasSeenBanner) cookiePreferences.hasSeenBanner = hasSeenBanner;
  if (hasAcceptedOptionalCookies)
    cookiePreferences.hasAcceptedOptionalCookies = hasAcceptedOptionalCookies;

  const cookieJSON = encodeURIComponent(JSON.stringify(cookiePreferences));

  const date = new Date();
  date.setTime(date.getTime() + COOKIE_LIVE_DAYS * MILLISECONDS_IN_ONE_DAY);
  const expires = date.toUTCString();

  document.cookie = `${COOKIE_NAME}=${cookieJSON}; expires=${expires}; path=/; domain=${COOKIE_DOMAIN};`;
}
