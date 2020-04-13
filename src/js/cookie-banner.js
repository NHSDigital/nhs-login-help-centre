(function() {
  const cookieBanner = document.getElementById("cookiebanner");
  const cookieBannerWrapper = document.getElementById("nhsuk-cookie-banner");
  const cookieAcceptButton = document.getElementById("nhsuk-cookie-banner__link_accept");
  const cookieConfirmationBanner = document.getElementById("nhsuk-cookie-confirmation-banner");
  const cookieRejectButton = document.getElementById("nhsuk-cookie-banner__link_accept_analytics");

  function handleLinkClick(consent) {
    setConsentCookie(consent);
    cookieBanner.style.display = "none";
    cookieConfirmationBanner.style.display = "block";
  }

  if (!getConsentCookie()) {
    cookieBannerWrapper.style.display = "block";
    cookieAcceptButton.addEventListener("click", () => handleLinkClick(true));
    cookieRejectButton.addEventListener("click", () => handleLinkClick(false));
  }
})()
