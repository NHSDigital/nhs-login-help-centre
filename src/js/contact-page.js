(function() {
    const errorCode = getParam('error');

    if (errorCode) {
        document.querySelector('#error-code-select').value = errorCode;
    }
})();
