const COOKIE_NAME = "nhsuk-cookie-consent";
const COOKIE_VERSION = 3;
const COOKIE_LIVE_DAYS = 90;

function getConsentCookie() {
  const [cookieJSON] = document.cookie
    .split("; ")
    .map(s => s.split("="))
    .filter(cookie => cookie[0] === COOKIE_NAME)
    .map(cookie => cookie[1]);

  try {
    const cookie = JSON.parse(cookieJSON);
    return cookie.version < COOKIE_VERSION ? null : cookie;
  } catch {
    return { version: 0 };
  }
}


function setConsentCookie(props) {
  const cookieJSON = JSON.stringify({ ...props, version: COOKIE_VERSION });

  const date = new Date();
  date.setTime(date.getTime() + COOKIE_LIVE_DAYS * 86400000);
  const expires = date.toUTCString();

  document.cookie = `${COOKIE_NAME}=${cookieJSON}; expires=${expires}; path=/`;
}
