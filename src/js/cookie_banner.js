const COOKIE_NAME = "nhsuk-cookie-consent";
const COOKIE_VERSION = 1;
const COOKIE_LIVE_DAYS = 90;

const cookieBanner = document.getElementById("cookiebanner");
const cookieBannerWrapper = document.getElementById("nhsuk-cookie-banner");
const cookieAcceptButton = document.getElementById("nhsuk-cookie-banner__link_accept");
const cookieConfirmationBanner = document.getElementById("nhsuk-cookie-confirmation-banner");
const cookieRejectButton = document.getElementById("nhsuk-cookie-banner__link_accept_analytics");

function getConsent() {
  const [cookieJSON] = document.cookie
    .split("; ")
    .map(s => s.split("="))
    .filter(cookie => cookie[0] === COOKIE_NAME)
    .map(cookie => cookie[1]);

  try {
    return JSON.parse(cookieJSON).version >= COOKIE_VERSION;
  } catch {
    return false;
  }
}

function setConsentCookie(consent) {
  const cookieJSON = JSON.stringify({ consent, version: COOKIE_VERSION });

  const date = new Date();
  date.setTime(date.getTime() + COOKIE_LIVE_DAYS * 86400000);
  const expires = date.toUTCString();

  document.cookie = `${COOKIE_NAME}=${cookieJSON}; expires=${expires}; path=/`;
}

function handleLinkClick(consent) {
  setConsentCookie(consent);
  cookieBanner.style.display = "none";
  cookieConfirmationBanner.style.display = "block";
}

if (!getConsent()) {
  cookieBannerWrapper.style.display = "block";
  cookieAcceptButton.addEventListener("click", () => handleLinkClick(true));
  cookieRejectButton.addEventListener("click", () => handleLinkClick(false));
}
