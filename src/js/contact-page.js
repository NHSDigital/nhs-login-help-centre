(function() {
  const MISSING_NAME_ERROR = 'Enter your full name';
  const MISSING_EMAIL_ERROR = 'Enter your email address';
  const INVALID_EMAIL_ERROR = 'Enter an email address in the correct format, like name@example.com';
  const MISSING_MESSAGE_ERROR = 'Enter your message';
  const REQUEST_HEADERS = new Headers({
    'Content-type': 'application/json',
  });

  const validateEmailField = Validators.combineValidators([
    Validators.hasValue('email', MISSING_EMAIL_ERROR),
    Validators.validEmail('email', INVALID_EMAIL_ERROR),
  ]);

  FormBuilder('contact-us-form')
    .addFormControl('name-form-control', Validators.hasValue('name', MISSING_NAME_ERROR))
    .addFormControl('email-form-control', validateEmailField)
    .addFormControl('message-form-control', Validators.hasValue('message', MISSING_MESSAGE_ERROR))
    .addSuccessHandler(onSubmit);

  document.querySelector('#errorcode').value = Utils.getParam('error');

  function getUserCookieDetails() {
    const { client_id = '' } = Utils.getJSONCookie('nhs-authorization-cookie') || {};
    const { account_id = '' } = Utils.getJWTCookie('id_token') || {};
    return { client_id, account_id };
  }

  function getErrorCodeValues(formData) {
    const error = formData.get('errorcode');
    const errorText = document.querySelector(`option[value=${error}`).text;
    const [errorCode, errorTitle] = errorText.split(': ');
    return { errorCode, errorTitle };
  }

  function sendSupportEmail(formData) {
    const { client_id, account_id } = getUserCookieDetails();
    const { errorCode, errorTitle } = getErrorCodeValues(formData);
    const body = {
      user_name: formData.get('name'),
      user_email: formData.get('email'),
      user_id: account_id,
      client: client_id,
      error_code: errorCode,
      error_title: errorTitle,
      error_description: errorTitle,
      message: formData.get('message'),
      browser: navigator.userAgent,
    };

    return fetch(Environment.EMAIL_API_URL, {
      method: 'POST',
      headers: REQUEST_HEADERS,
      body: JSON.stringify(body),
    });
  }

  function onSubmit(formData) {
    sendSupportEmail(formData)
      .then(res => {
        const nextPage = res.ok ? '/contact-sent' : '/contact-error';
        window.location.assign(nextPage);
      })
      .catch(() => window.location.assign('/contact-error'));
  }
})();
