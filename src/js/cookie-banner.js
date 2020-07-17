(function() {
  const cookieBanner = document.getElementById('cookiebanner');
  const cookieBannerWrapper = document.getElementById('nhsuk-cookie-banner');
  const cookieAcceptButton = document.getElementById('nhsuk-cookie-banner__link_accept');
  const cookieChooseButton = document.getElementById('nhsuk-cookie-banner__link');
  const cookieConfirmationBanner = document.getElementById('nhsuk-cookie-confirmation-banner');

  function handleAcceptButtonClick() {
    cookieBanner.style.display = 'none';
    cookieConfirmationBanner.style.display = 'block';
    Consent.setAcceptAllCookies();
    Analytics.start();
  }

  function handleChooseButtonClick() {
    cookieBanner.style.display = 'none';
    Consent.setHasSeenCookieBanner();
    window.location.assign(`${Environment.ACCESS_FRONTEND_URL}/cookies/cookie-settings`);
  }

  const cookiePreferences = Consent.getCookiePreferences();

  if (!cookiePreferences.hasSeenBanner) {
    cookieBannerWrapper.style.display = 'block';
    cookieAcceptButton.addEventListener('click', () => handleAcceptButtonClick());
    cookieChooseButton.addEventListener('click', () => handleChooseButtonClick());

    setTimeout(function() {
      cookieBannerWrapper.focus();
    }, 500); // scroll the banner into view - shorter timeouts didn't work
  } else {
    Analytics.start();
  }
})();
