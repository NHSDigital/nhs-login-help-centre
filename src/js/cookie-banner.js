(function() {
  const cookieBanner = document.getElementById("cookiebanner");
  const cookieBannerWrapper = document.getElementById("nhsuk-cookie-banner");
  const cookieAcceptButton = document.getElementById("nhsuk-cookie-banner__link_accept_analytics");
  const cookieConfirmationBanner = document.getElementById("nhsuk-cookie-confirmation-banner");
  const cookieRejectButton = document.getElementById("nhsuk-cookie-banner__link_accept");

  function handleLinkClick(consent) {
    cookieBanner.style.display = "none";
    cookieConfirmationBanner.style.display = "block";
    setConsentCookie({
      necessary:true,
      preferences: false,
      statistics: consent,
      marketing: false,
      consented: true
    });
    startAnalytics();
  }

  if (!getConsentCookie()) {
    cookieBannerWrapper.style.display = "block";
    cookieAcceptButton.addEventListener("click", () => handleLinkClick(true));
    cookieRejectButton.addEventListener("click", () => handleLinkClick(false));
  } else {
    startAnalytics();
  }
})()
