const Utils = (function() {
  const COOKIE_LIVE_DAYS = 365;
  const MILLISECONDS_IN_ONE_DAY = 86400000;
  // if we are on a .login.nhs.uk subdomain share cookies with rest of login,
  // otherwise set the cookies on the current domain
  const COOKIE_DOMAIN = window.location.hostname.includes('.login.nhs.uk')
    ? '.login.nhs.uk'
    : window.location.hostname;

  return {
    getCookie(name) {
      const [cookie] = document.cookie
        .split('; ')
        .map(s => s.split('='))
        .filter(cookie => cookie[0] === name)
        .map(cookie => cookie[1]);

      return cookie;
    },

    getJWTCookie(name) {
      try {
        const token = Utils.getCookie(name);
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    },

    getJSONCookie(name) {
      try {
        const cookieJSON = decodeURIComponent(Utils.getCookie(name));
        return JSON.parse(cookieJSON);
      } catch {
        return null;
      }
    },

    setJSONCookie(name, props) {
      const cookieJSON = encodeURIComponent(
        JSON.stringify({
          ...props,
        })
      );

      const date = new Date();
      date.setTime(date.getTime() + COOKIE_LIVE_DAYS * MILLISECONDS_IN_ONE_DAY);
      const expires = date.toUTCString();

      document.cookie = `${name}=${cookieJSON}; expires=${expires}; path=/; domain=${COOKIE_DOMAIN};`;
    },

    getParam(key) {
      const [param] = window.location.search
        .replace('?', '')
        .split('&')
        .map(part => part.split('='))
        .filter(param => param[0] === key)
        .map(param => param[1]);

      return param;
    },

    createScript(href) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = href;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    },

    range(from, to) {
      return Array.from(Array(to - from + 1), (_, i) => i + from);
    },
  };
})();
