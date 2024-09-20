import { ContactFormValues } from './contact-form';

const MISSING_NAME_ERROR = 'Enter your full name';
const MISSING_EMAIL_ERROR = 'Enter your email address';
const INVALID_EMAIL_ERROR = 'Enter an email address in the correct format, like name@example.com';
const INVALID_PHONE_ERROR = 'Enter a phone number in the correct format';
const INVALID_THREE_DIGITS = 'Enter the last 3 digits of your NHS number';
const MISSING_CLIENT_ERROR = 'Select the website or app you are trying to visit';
const MISSING_PROBLEM_ERROR = 'Select your problem';
const MISSING_MESSAGE_ERROR = 'Describe your problem in more detail';
const EMAIL_REGEX = /(^[a-zA-Z0-9_.+'-]+@[a-zA-Z0-9-]+(?!.*?\.\.)(?!.*\.$)\.[a-zA-Z0-9-.]+$)/;
const PHONE_REGEX = /^(0|\+44)7[0-9]{9}$/;
const THREE_DIGIT_REGEX = /^[0-9]{3}$/;

export function validatePersonalDetails({
  name,
  email,
  contact_email,
  phone_number,
  nhsnumber_3_digits
}: ContactFormValues) {
  const errors: ContactFormValues = {};
  
  if (!hasValue(name)) {
    errors.name = MISSING_NAME_ERROR;
  }
  if (!hasValue(email) && !hasValue(contact_email)) {
    errors.email = MISSING_EMAIL_ERROR;
    errors.contact_email = MISSING_EMAIL_ERROR;
  } 
  else if (hasValue(email) && !EMAIL_REGEX.test(email?.trim() || '')) {
    errors.email = INVALID_EMAIL_ERROR;
  } 
  if (hasValue(contact_email) && !EMAIL_REGEX.test(contact_email?.trim() || '')) {
    errors.contact_email = INVALID_EMAIL_ERROR;
  }
  if (hasValue(phone_number) && !PHONE_REGEX.test(phone_number?.trim() || '')) {
    errors.phone_number = INVALID_PHONE_ERROR;
  }
  if (hasValue(nhsnumber_3_digits) && !THREE_DIGIT_REGEX.test(nhsnumber_3_digits?.trim() || '')) {
    errors.nhsnumber_3_digits = INVALID_THREE_DIGITS;
  }
  return errors;
}

export function validateProblemDetails({
  'message-detail': messageDetail,
  problem,
  visit,
  client,
}: ContactFormValues) {
  const errors: ContactFormValues = {};
  if (!hasValue(visit) || (visit === 'other' && !hasValue(client))) {
    errors.visit = MISSING_CLIENT_ERROR;
  }
  if (!hasValue(problem)) {
    errors.problem = MISSING_PROBLEM_ERROR;
  }
  if (!hasValue(messageDetail)) {
    errors['message-detail'] = MISSING_MESSAGE_ERROR;
  }
  return errors;
}

function hasValue(value?: string) {
  return !!value && !!value.trim();
}
