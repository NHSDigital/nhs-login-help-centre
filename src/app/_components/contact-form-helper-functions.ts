import { RefObject } from 'react';
import { ContactFormValues, ErrorDescription } from './contact-form';
import Cookies from 'js-cookie';
import { FormEvent } from 'react';
import { validatePersonalDetails } from './validate';

export function formGroupCssClasses(errors: ContactFormValues, fieldName: keyof ContactFormValues) {
  if (!!errors[fieldName]) {
    return 'nhsuk-form-group nhsuk-form-group--error';
  }
  return 'nhsuk-form-group';
}

export function getProblemText(ref: RefObject<HTMLDivElement>, value?: string) {
  if (!ref.current || !value || value === 'not_sure') return '';

  const selectedRadio = Array.from(ref.current.querySelectorAll('.nhsuk-radios__item')).find(
    radio => radio && radio.querySelector && radio.querySelector('input')?.value === value
  );
  return selectedRadio ? selectedRadio.querySelector('label')?.innerText : '';
}

export function getErrorDescription(
  contactLinks: ErrorDescription[],
  errorParam: string,
  descParam: string,
  problem?: string,
  subProblem?: string
): ErrorDescription {
  const errorCodeRegex = /^CID\d{4,5}$/;
  const errorMappings: { [problem: string]: { code: string; description: string } } = {
    first_line_password_reset: {
      code: 'CID1112',
      description: 'Cannot remember account password - Reference CID1112',
    },
    first_line_change_mobile: {
      code: 'CID1113',
      description: 'Changed mobile number - Reference CID1113',
    },
    second_line_email_hint: {
      code: 'CID1114',
      description: 'Cannot remember account email address - Reference CID1114',
    },
    second_line_manual_reset: {
      code: 'CID1115',
      description: 'Cannot access account email address - Reference CID1115',
    },
    gp_connection_issue: {
      code: 'CID7023',
      description: 'Unable to connect to your GP surgery’s system - Reference CID7023',
    },
    change_email: {
      code: 'CID3004',
      description: 'Needs to change email address for account - Reference CID3004',
    },
  };

  const problemSelected = problem === 'dupe_account' ? subProblem : problem;
  const errorDescription = problemSelected && errorMappings[problemSelected];
  if (errorDescription) {
    const matchingErrorFromLinks = contactLinks.find(x => x.code === errorDescription.code) || null;
    return (
      matchingErrorFromLinks || {
        code: errorDescription.code,
        description: errorDescription.description,
      }
    );
  } else {
    if (!errorCodeRegex.test(errorParam)) {
      return { code: 'UNKNOWN', description: 'UNKNOWN' };
    }
    const matchingErrorFromLinks = contactLinks.find(x => x.code === errorParam);

    return matchingErrorFromLinks || { code: errorParam, description: descParam };
  }
}

export function sendToApi(
  {
    name,
    email,
    contactEmail,
    nhsNumberLastDigits,
    phoneNumber,
    client,
    visit,
    'message-detail': messageDetail,
  }: ContactFormValues,
  { code, description }: ErrorDescription,
  problemText = ''
) {
  const accountId = getAccountId();
  const message = problemText ? `${problemText}. ${messageDetail}` : messageDetail;

  const body = {
    user_name: name,
    user_email: email,
    contact_email: contactEmail,
    nhsnumber_last_digits: nhsNumberLastDigits,
    phone_number: phoneNumber,
    user_id: accountId,
    client: client || visit,
    error_code: code,
    error_title: description,
    error_description: description,
    message,
    browser: navigator.userAgent,
  };

  return fetch(process.env.API_URL + '/raise-ticket', {
    method: 'POST',
    headers: new Headers({
      'Content-type': 'application/json',
    }),
    body: JSON.stringify(body),
  });
}

function getAccountId() {
  try {
    const token = Cookies.get('id_token') || '';
    const { account_id } = JSON.parse(atob(token.split('.')[1]));
    return account_id;
  } catch (e) {
    return null;
  }
}
