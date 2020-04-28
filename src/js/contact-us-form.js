(function(){
    document.querySelector('#contact-us-form__submit').addEventListener('click', () => {
        const yesChecked = document.querySelector('#contact-us-form__response-yes').checked;
        const noChecked = document.querySelector('#contact-us-form__response-no').checked;

        if (!yesChecked && !noChecked) return;

        if (yesChecked) {
            document.querySelector('#contact-us-thank-you').style.display = "block";
            document.querySelector('#contact-us-form').style.display = "none";
        }

        if (noChecked) {
            document.location.assign('/contact');
        }
    });
})();
