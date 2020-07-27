const Analytics = (function() {
  // add this for local dev
  // https://assets.adobedtm.com/launch-EN89caca63ff2c4dae923a38d7d05ec849-development.min.js
  const ADOBE_URL = 'https://assets.adobedtm.com/launch-ENef935e55aadd4530a5725efe3624e9e2.min.js';
  const HOTJAR_URL = '/js/hotjar.js';

  function trackLinkClick(element) {
    window.digitalData.link = {
      linkName: element.innerText,
      linkDestination: element.getAttribute('href'),
    };
    _satellite.track('tracklink');
  }

  function trackPageView() {
    window.digitalData.page = {
      pageInfo: {
        // find this in /src/_includes/head.njk
        pageName: PageInfo.pageName,
      },
    };
    _satellite.track('page_view');
  }

  function createHandlers() {
    for (const link of document.querySelectorAll('a')) {
      link.addEventListener('click', () => trackLinkClick(link));
    }
  }

  return {
    start() {},
  };
})();
