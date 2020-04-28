(function() {
    const idToken = getJSONCookie('id_token');
    const emailWithoutCookieForm = document.querySelector('#email-without-cookie');
    const emailWithCookieForm = document.querySelector('#email-with-cookie');
    const emailForm = document.querySelector('#email-form');
    const errorCode = getParam('error');

    if (idToken) {
        emailForm.removeChild(emailWithoutCookieForm);
        emailWithCookieForm.style.display = '';
    } else {
        emailForm.removeChild(emailWithCookieForm);
        emailWithoutCookieForm.style.display = '';
    }

    if (errorCode) {
        document.querySelector('#error-code-select').value = errorCode;
    }
})();
