function getCookie(name) {
    const [cookie] = document.cookie
        .split("; ")
        .map(s => s.split("="))
        .filter(cookie => cookie[0] === name)
        .map(cookie => cookie[1]);

    return cookie;
}

function getJWTCookie(name) {
    try {
        const token = getCookie(name);
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

function getJSONCookie(name) {
    try {
        const cookieJSON = decodeURIComponent(getCookie(name));
        return JSON.parse(cookieJSON);
    } catch {
        return null;
    }
}

  function getParam(key) {
    const [param] = window.location.search
        .replace('?', '')
        .split('&')
        .map(part => part.split('='))
        .filter(param => param[0] === key)
        .map(param => param[1])

    return param;
}
