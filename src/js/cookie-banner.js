(function() {
  const cookieBanner = document.getElementById('cookiebanner');
  const cookieBannerWrapper = document.getElementById('nhsuk-cookie-banner');
  const cookieAcceptButton = document.getElementById('nhsuk-cookie-banner__link_accept');
  const cookieChooseButton = document.getElementById('nhsuk-cookie-banner__link');
  const cookieConfirmationBanner = document.getElementById('nhsuk-cookie-confirmation-banner');

  function handleAcceptButtonClick() {
    cookieBanner.style.display = 'none';
    cookieConfirmationBanner.style.display = 'block';
    setAcceptAllCookies();
    startAnalytics();
  }

  function handleChooseButtonClick() {
    cookieBanner.style.display = 'none';
    setHasSeenCookieBanner();
    window.location.assign('https://access.login.nhs.uk/cookies/cookie-settings');
  }

  const cookiePreferences = getCookiePreferences();

  if (!cookiePreferences.hasSeenBanner) {
    cookieBannerWrapper.style.display = 'block';
    cookieAcceptButton.addEventListener('click', () => handleAcceptButtonClick());
    cookieChooseButton.addEventListener('click', () => handleChooseButtonClick());

    setTimeout(function() {
      cookieBannerWrapper.focus();
    }, 500); // scroll the banner into view - shorter timeouts didn't work
  } else {
    startAnalytics();
  }
})();
