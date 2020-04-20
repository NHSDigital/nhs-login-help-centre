
function trackLinkClick(element) {
    digitalData.link = {
        linkName: element.innerText,
        linkDestination: element.getAttribute('href')
    };
    _satellite.track('tracklink');
};

function createScript(href) {
    return new Promise((resolve, reject) => {
        const  script = document.createElement('script');
        script.src = href;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

function startAnalytics() {
    const consentCookie = getConsentCookie();

    if (consentCookie.statistics) {
        createScript('/js/hotjar.js');
        // add this for local dev
        // createScript('https://assets.adobedtm.com/launch-EN89caca63ff2c4dae923a38d7d05ec849-development.min.js')
        createScript('https://assets.adobedtm.com/launch-ENef935e55aadd4530a5725efe3624e9e2.min.js')
            .then(() => {
                window.digitalData = {
                    page: {
                        pageInfo: {
                            pageName: document.title
                        }
                    }
                };

                _satellite.track('page_view');
                for (const link of document.querySelectorAll('a')) {
                    link.addEventListener('click', () => trackLinkClick(link));
                }
            });
    }
}
