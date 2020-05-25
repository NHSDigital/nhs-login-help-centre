const Analytics = (function() {
  function trackLinkClick(element) {
    digitalData.link = {
      linkName: element.innerText,
      linkDestination: element.getAttribute('href'),
    };
    _satellite.track('tracklink');
  }

  return {
    start() {
      const cookiePreferences = Consent.getCookiePreferences();

      if (cookiePreferences.hasAcceptedOptionalCookies) {
        Utils.createScript('/js/hotjar.js');
        // add this for local dev
        // Utils.createScript('https://assets.adobedtm.com/launch-EN89caca63ff2c4dae923a38d7d05ec849-development.min.js')
        Utils.createScript(
          'https://assets.adobedtm.com/launch-ENef935e55aadd4530a5725efe3624e9e2.min.js'
        ).then(() => {
          window.digitalData = {
            page: {
              pageInfo: {
                pageName: document.title,
              },
            },
          };

          _satellite.track('page_view');
          for (const link of document.querySelectorAll('a')) {
            link.addEventListener('click', () => trackLinkClick(link));
          }
        });
      }
    },
  };
})();
