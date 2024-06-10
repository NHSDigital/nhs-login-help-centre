import { ContactFormValues } from './contact-form';

const MISSING_NAME_ERROR = 'Enter your full name';
const MISSING_EMAIL_ERROR = 'Enter your email address';
const INVALID_EMAIL_ERROR = 'Enter an email address in the correct format, like name@example.com';
const MISSING_CLIENT_ERROR = 'Select the website or app you are trying to visit';
const MISSING_PROBLEM_ERROR = 'Select your problem';
const MISSING_MESSAGE_ERROR = 'Describe your problem in more detail';
const EMAIL_REGEX = /(^[a-zA-Z0-9_.+'-]+@[a-zA-Z0-9-]+(?!.*?\.\.)(?!.*\.$)\.[a-zA-Z0-9-.]+$)/;

export function validate({
  name,
  email,
  'message-detail': messageDetail,
  problem,
  visit,
  client,
}: ContactFormValues) {
  const errors: ContactFormValues = {};

  if (!hasValue(name)) {
    errors.name = MISSING_NAME_ERROR;
  }
  if (!hasValue(email)) {
    errors.email = MISSING_EMAIL_ERROR;
  } else if (!EMAIL_REGEX.test(email?.trim() || '')) {
    errors.email = INVALID_EMAIL_ERROR;
  }
  if (!hasValue(messageDetail)) {
    errors['message-detail'] = MISSING_MESSAGE_ERROR;
  }
  if (!hasValue(problem)) {
    errors.problem = MISSING_PROBLEM_ERROR;
  }
  if (!hasValue(visit) || (visit === 'other' && !hasValue(client))) {
    errors.visit = MISSING_CLIENT_ERROR;
  }
  return errors;
}

function hasValue(value?: string) {
  return !!value && !!value.trim();
}
