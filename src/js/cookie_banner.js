const COOKIE_NAME = "nhsuk-cookie-consent";
const COOKIE_VERSION = 1;

function getConsentCookie() {
  const cookieJSON = document.cookie
    .split("; ")
    .map(s => s.split("="))
    .filter(cookie => cookie[0] === COOKIE_NAME)
    .map(cookie => cookie[1]);

  try {
    const cookie = JSON.parse(cookieJSON[0]);
    return cookie.version >= COOKIE_VERSION ? cookie : {};
  } catch {
    return {};
  }
}

function setConsentCookie(consent) {
  const cookieJSON = JSON.stringify({ consent, version: COOKIE_VERSION });

  const date = new Date();
  date.setTime(date.getTime() + 7776000000);
  const expires = date.toUTCString();

  document.cookie = `${COOKIE_NAME}=${cookieJSON};expires=${expires};`;
}

function handleLinkClick(consent) {
    setConsentCookie(consent);
    document.querySelector('#cookiebanner').style.display = 'none';
    document.querySelector('#nhsuk-cookie-confirmation-banner').style.display = 'block';
}

function initaliseBanner() {
  const { consent = null } = getConsentCookie();

  if (consent !== null) return;

  document.querySelector("#nhsuk-cookie-banner").style.display = "block";

  document
    .getElementById("nhsuk-cookie-banner__link_accept")
    .addEventListener("click", () => handleLinkClick(true));

  document
    .getElementById("nhsuk-cookie-banner__link_accept_analytics")
    .addEventListener("click", () => handleLinkClick(false));
}


initaliseBanner();