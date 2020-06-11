(function() {
  const API_URL = 'https://api.dev.signin.nhs.uk/nhs-login-support/send-email';
  const REQUEST_HEADERS = new Headers({
    'Content-type': 'application/json',
  });

  const errorCode = Utils.getParam('error');
  const form = document.getElementById('contact-us-form');

  if (errorCode) {
    document.querySelector('#errorcode').value = errorCode;
  }

  function getUserCookieDetails() {
    const { client_id = '' } = Utils.getJSONCookie('nhs-authorization-cookie') || {};
    const { account_id = '' } = Utils.getJWTCookie('id_token') || {};
    return { client_id, account_id };
  }

  function getErrorValues(formData) {
    const error = formData.get('errorcode');
    const errorText = document.querySelector(`option[value=${error}`).text;
    const [errorCode, errorTitle] = errorText.split(': ');
    return { errorCode, errorTitle };
  }

  function sendSupportEmail(formData) {
    const { client_id, account_id } = getUserCookieDetails();
    const { errorCode, errorTitle } = getErrorValues(formData);
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

    return fetch(API_URL, { method: 'POST', headers: REQUEST_HEADERS, body: JSON.stringify(body) });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    sendSupportEmail(formData)
      .then(res => {
        const nextPage = res.ok ? '/contact-sent' : '/contact-error';
        window.location.assign(nextPage);
      })
      .catch(() => window.location.assign('/contact-error'));
  });
})();
