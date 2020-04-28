(function() {
    const idToken = getJSONCookie('id_token');
    const withoutCookieForm = document.querySelector('#email-without-cookie');
    const withCookieForm = document.querySelector('#email-with-cookie');
    const cookieFormContainer = document.querySelector('#email-form');

    if (idToken) {
        cookieFormContainer.removeChild(withoutCookieForm);
        withCookieForm.style.display = '';
    } else {
        cookieFormContainer.removeChild(withCookieForm);
        withoutCookieForm.style.display = '';
    }
})();
