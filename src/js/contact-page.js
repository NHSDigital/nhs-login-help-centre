(function() {
  const errorCodeRegex = /^CID\d{4}$/;
  const MISSING_NAME_ERROR = 'Enter your full name';
  const MISSING_EMAIL_ERROR = 'Enter your email address';
  const INVALID_EMAIL_ERROR = 'Enter an email address in the correct format, like name@example.com';
  const MISSING_MESSAGE_ERROR = 'Enter your message';
  const MISSING_CLIENT_ERROR = 'Select the website or app you are trying to visit';
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
    .addFormControl('client-form-control', Validators.hasValue('client', MISSING_CLIENT_ERROR))
    .addFormControl('message-form-control', Validators.hasValue('message', MISSING_MESSAGE_ERROR))
    .addSuccessHandler(onSubmit);

  const errorCode = Utils.getParam('error');
  const errorDesc = Utils.getParam('desc');

  if (errorCodeRegex.test(errorCode)) {
    const isNewError = !document.querySelector(`#errorcode option[value=${errorCode}]`);
    if (isNewError) {
      const firstOption = document.querySelector('#errorcode option');
      firstOption.value = errorCode;
      firstOption.hidden = false;
      firstOption.innerText = errorDesc
        ? `${errorCode}: ${decodeURIComponent(errorDesc)}`
        : errorCode;
    }
    document.querySelector('#errorcode').value = errorCode;
  }

  function getAccountId() {
    const { account_id = '' } = Utils.getJWTCookie('id_token') || {};
    return account_id;
  }

  function getErrorCodeValues(formData) {
    const error = formData.get('errorcode');
    const errorText = document.querySelector(`option[value=${error}`).text;
    const [errorCode, errorTitle] = errorText.split(': ');
    return { errorCode, errorTitle };
  }

  function sendSupportEmail(formData) {
    const account_id = getAccountId();
    const { errorCode, errorTitle } = getErrorCodeValues(formData);
    const body = {
      user_name: formData.get('name'),
      user_email: formData.get('email'),
      user_id: account_id,
      client: formData.get('client'),
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
