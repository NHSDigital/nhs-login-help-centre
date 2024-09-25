import { ContactFormValues } from './contact-form';

const MISSING_NAME_ERROR = 'Enter your full name';
const MISSING_EMAIL_ERROR = 'Enter your contact email address';
const INVALID_EMAIL_ERROR = 'Enter a valid email address';
const INVALID_PHONE_ERROR = 'Enter a valid mobile phone number';
const INVALID_THREE_DIGITS = 'Enter three digits';
const MISSING_CLIENT_ERROR = 'Select the website or app you are trying to visit';
const MISSING_PROBLEM_ERROR = 'Select your problem';
const MISSING_MESSAGE_ERROR = 'Describe your problem in more detail';
const EMAIL_REGEX = /(^[a-zA-Z0-9_.+'-]+@[a-zA-Z0-9-]+(?!.*?\.\.)(?!.*\.$)\.[a-zA-Z0-9-.]+$)/;
const PHONE_REGEX = /^(0|\+44)7[0-9]{9}$/;
const THREE_DIGIT_REGEX = /^[0-9]{3}$/;

export function validatePersonalDetails({
  name,
  email,
  contactEmail,
  phoneNumber,
  nhsNumberLastDigits,
}: ContactFormValues) {
  const errors: ContactFormValues = {};

  if (!hasValue(name)) {
    errors.name = MISSING_NAME_ERROR;
  }
  if (!hasValue(email) && !hasValue(contactEmail)) {
    errors.contactEmail = MISSING_EMAIL_ERROR;
  } else if (hasValue(email) && !EMAIL_REGEX.test(email?.trim() || '')) {
    errors.email = INVALID_EMAIL_ERROR;
  }
  if (hasValue(contactEmail) && !EMAIL_REGEX.test(contactEmail?.trim() || '')) {
    errors.contactEmail = INVALID_EMAIL_ERROR;
  }
  if (hasValue(phoneNumber) && !PHONE_REGEX.test(phoneNumber?.trim() || '')) {
    errors.phoneNumber = INVALID_PHONE_ERROR;
  }
  if (hasValue(nhsNumberLastDigits) && !THREE_DIGIT_REGEX.test(nhsNumberLastDigits?.trim() || '')) {
    errors.nhsNumberLastDigits = INVALID_THREE_DIGITS;
  }
  return errors;
}

export function validateProblemDetails({
  'message-detail': messageDetail,
  problem,
  subProblem,
  visit,
  client,
}: ContactFormValues) {
  const errors: ContactFormValues = {};
  if (!hasValue(visit) || (visit === 'other' && !hasValue(client))) {
    errors.visit = MISSING_CLIENT_ERROR;
  }
  if (!hasValue(problem)) {
    errors.problem = MISSING_PROBLEM_ERROR;
  } else if (problem === 'dupe_account' && !hasValue(subProblem)) {
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
