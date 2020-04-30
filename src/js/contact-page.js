(function() {
    const errorCode = getParam('error');
    const form = document.getElementById('contact-us-form');

    if (errorCode) {
        document.querySelector('#errorcode').value = errorCode;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form).entries();
        console.log(data)
    });
})();
