const COOKIE_NAME = "nhsuk-cookie-consent";
const COOKIE_VERSION = 3;
const COOKIE_LIVE_DAYS = 90;

function getConsentCookie() {
  const cookie = getJSONCookie(COOKIE_NAME) || {};
  return cookie.version < COOKIE_VERSION ? null : cookie;
}

function setConsentCookie(props) {
  const cookieJSON = JSON.stringify({ ...props, version: COOKIE_VERSION });

  const date = new Date();
  date.setTime(date.getTime() + COOKIE_LIVE_DAYS * 86400000);
  const expires = date.toUTCString();

  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(cookieJSON)}; expires=${expires}; path=/`;
}
