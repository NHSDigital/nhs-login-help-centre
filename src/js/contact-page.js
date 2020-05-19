(function() {
  const API_KEY = 'todo';
  const API_URL = 'https://api.notifications.service.gov.uk/v2/notifications/email';
  const SUPPORT_EMAIL = 'test@example.com';
  const SUPPORT_TEMPLATE = 'd6dc667b-f8d0-4758-98d0-012fca3eac18';
  const REQUEST_HEADERS = new Headers({
    Authorization: `Bearer ${API_KEY}`,
    'Content-type': 'application/json',
  });

  const errorCode = getParam('error');
  const form = document.getElementById('contact-us-form');

  if (errorCode) {
    document.querySelector('#errorcode').value = errorCode;
  }

  function getUserCookieDetails() {
    const { client_id = '' } = getJSONCookie('nhs-authorization-cookie') || {};
    const { account_id = '' } = getJWTCookie('id_token') || {};
    return { client_id, account_id };
  }

  function sendSupportEmail(formData) {
    const { client_id, account_id } = getUserCookieDetails();
    const body = {
      email_address: SUPPORT_EMAIL,
      template_id: SUPPORT_TEMPLATE,
      personalisation: {
        name: formData.get('name'),
        user_email: formData.get('email'),
        user_id: account_id,
        client: client_id,
        errorcode: formData.get('errorcode'),
        message: formData.get('name'),
      },
    };

    return fetch(API_URL, { method: 'POST', headers: REQUEST_HEADERS, body });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const supportEmailRequest = sendSupportEmail(formData);
    return false;
  });
})();
