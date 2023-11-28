(function() {
  const errorCodeRegex = /^CID\d{4}$/;
  const MISSING_NAME_ERROR = 'Enter your full name';
  const MISSING_EMAIL_ERROR = 'Enter your email address';
  const INVALID_EMAIL_ERROR = 'Enter an email address in the correct format, like name@example.com';
  const MISSING_CLIENT_ERROR = 'Select the website or app you are trying to visit';
  const MISSING_PROBLEM_ERROR = 'Select your problem';
  const MISSING_MESSAGE_ERROR = 'Describe your problem in more detail';
  const MAXIMUM_CHARACTERS = 1500;
  const REQUEST_HEADERS = new Headers({
    'Content-type': 'application/json',
  });
  const SELECTED_COMMON_ISSUE_MAPPING = {
    dupe_account : "There is already an account linked to my details. ",
    gp_connection_issue : "There is an issue connecting to my GP. ",
    change_email: "I need to change the email address linked to my NHS login account. ",
    not_sure: ""
  };

  const commonClients = document.getElementById('common-clients');
  const commonProblems = document.getElementById('common-problems');
  const clientLisElement = document.getElementById('clients-list');
  const clientDropdown = document.getElementById('client');
  var clientName = "";
  var selectedCommonIssue = "";

  commonClients.addEventListener('change', function() {
    const commonClientsList = document.getElementsByName('visit');

    commonClientsList.forEach((client) => {
      if(client.checked && client.value === 'other')
        clientLisElement.classList.remove("nhsuk-radios__conditional--hidden");
      else if (client.checked){
        clientLisElement.classList.add("nhsuk-radios__conditional--hidden");
        clientName = client.value;
      }
    });
  });

  clientDropdown.addEventListener('change', function(){
    clientName = clientDropdown.value;
  });

  commonProblems.addEventListener('change', function(){
    const commonProblemsList = document.getElementsByName('problem');

    commonProblemsList.forEach((problem) => {
      if(problem.checked)
        selectedCommonIssue = SELECTED_COMMON_ISSUE_MAPPING[problem.value];
    });
  });

  const messageLengthElement = document.getElementById('remaining-characters');
  const messageDetailElement = document.getElementById('message-detail');
  messageDetailElement.addEventListener('keyup', function(){
    const typedCharacters = messageDetailElement.value.length;
    const remainingCharacters = MAXIMUM_CHARACTERS-typedCharacters;
    messageLengthElement.textContent = remainingCharacters > 0 ? remainingCharacters : 0;
  });

  const validateEmailField = Validators.combineValidators([
    Validators.hasValue('email', MISSING_EMAIL_ERROR),
    Validators.validEmail('email', INVALID_EMAIL_ERROR),
  ]);

  FormBuilder('contact-us-form')
    .addFormControl('name-form-control', Validators.hasValue('name', MISSING_NAME_ERROR))
    .addFormControl('email-form-control', validateEmailField)
    .addFormControl('client-form-control', Validators.validateClient('visit', MISSING_CLIENT_ERROR))
    .addFormControl('problem-form-control', Validators.isOptionSelected('problem', MISSING_PROBLEM_ERROR))
    .addFormControl('message-form-control', Validators.hasValue('message-detail', MISSING_MESSAGE_ERROR))
    .addSuccessHandler(onSubmit);

  function getAccountId() {
    const { account_id = '' } = Utils.getJWTCookie('id_token') || {};
    return account_id;
  }

  function getErrorCode() {
    const errorCode = Utils.getParam('error');
    const errorDesc = decodeURIComponent(Utils.getParam('desc') || 'UNKNOWN');
    const errorMatch = ContactUsLinks.find(x => x.code == errorCode);
    if (!errorCodeRegex.test(errorCode)) {
      return { code: 'UNKNOWN', description: 'UNKNOWN' };
    }
    if (errorMatch) {
      return errorMatch;
    } else {
      return { code: errorCode, description: errorDesc };
    }
  }

  function sendSupportEmail(formData) {
    const account_id = getAccountId();
    const { code, description } = getErrorCode();
    const body = {
      user_name: formData.get('name'),
      user_email: formData.get('email'),
      user_id: account_id,
      client: clientName,
      error_code: code,
      error_title: description,
      error_description: description,
      message: selectedCommonIssue+formData.get('message-detail'),
      browser: navigator.userAgent,
    };

    return fetch(Environment.API_URL + '/raise-ticket', {
      method: 'POST',
      headers: REQUEST_HEADERS,
      body: JSON.stringify(body),
    });
  }

  function onSubmit(formData) {
    document.querySelector('.submit-button').classList.add('nhsuk-button--disabled');
    sendSupportEmail(formData)
      .then(res => {
        if(res.ok) {
          window.location.replace('/contact-sent');
        } else {
          window.location.assign('/contact-error');
        }
      })
      .catch(() => window.location.assign('/contact-error'));
  }
})();
