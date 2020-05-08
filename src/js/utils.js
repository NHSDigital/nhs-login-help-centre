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

function createScript(href) {
    return new Promise((resolve, reject) => {
        const  script = document.createElement('script');
        script.src = href;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

function range(from, to) {
    return Array.from(Array(to - from + 1), (_, i) => i + from);
}