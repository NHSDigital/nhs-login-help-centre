'use client';
import { useSearchParams } from 'next/navigation';
import { FormEvent, RefObject, useRef, useState } from 'react';
import { PersonalDetailsForm } from './personal-details-form';
import { ProblemDetailsForm } from './problem-details-form';
import Cookies from 'js-cookie';

export type ContactFormValues = {
  client?: string;
  email?: string;
  contact_email?: string;
  'message-detail'?: string;
  name?: string;
  nhsnumber_3_digits?: string;
  phone_number?: string;
  problem?: string;
  visit?: string;
};

export type ErrorDescription = { description: string; code: string };

const formIdsForErrorSummary: ContactFormValues = {
  visit: 'visitNHS',
  problem: 'dupeAccount',
};

export default function ContactForm({ clients, contactLinks }: Props) {
  const [showOtherClients, setShowOtherClients] = useState(false);
  const [showOtherIssues, setShowOtherIssues] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<ContactFormValues>({});
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const problemRadioRef = useRef<HTMLDivElement>(null);
  const errorParam = useSearchParams().get('error') as string;
  const descParam = useSearchParams().get('desc') as string;
  const [isContinue, setContinue] = useState(false);
  const [personalFormDetails, setPersonalFormDetails] = useState<ContactFormValues>({})

  function handleSetContinue(){
    setContinue(true)
  }

  function handleSetError(errorValue:ContactFormValues){
    setErrors(errorValue)
  }

  function handleSetPersonalForm(formJson:ContactFormValues){
    setPersonalFormDetails(formJson)
  }

  function handleSetShowOtherClients(){
    setShowOtherClients(true)
  }

  function handleSetShowOtherIssues(){
    setShowOtherIssues(true)
  }

  function handleSetSubmitted(){
    setSubmitted(true)
  }

  return (
    <>
      <h1 className="nhsuk-app-contact-panel__heading">Contact NHS login support</h1>
      {errors && Object.keys(errors).length ? (<div
        className={
          'nhsuk-error-summary' +
          (errors && Object.keys(errors).length ? '' : ' nhsuk-error-summary--hidden')
        }
        aria-labelledby="error-summary-title"
        role="alert"
        ref={errorSummaryRef}
        tabIndex={-1}
      >
        <h2 className="nhsuk-error-summary__title">There is a problem</h2>
        <div className="nhsuk-error-summary__body">
          <ul className="nhsuk-list nhsuk-error-summary__list">
            {Object.keys(errors).map((e) => (
              <li key={e}>
                <a href={'#' + (formIdsForErrorSummary[e as keyof ContactFormValues] || e)}>
                  {errors[e as keyof ContactFormValues]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>) : (<></>)}
      {!isContinue ? (
      <PersonalDetailsForm 
      errors={errors}
      isContinue={isContinue}
      handleSetContinue = {handleSetContinue}
      handleSetError = {handleSetError}
      handleSetPersonalForm={handleSetPersonalForm}
      errorSummaryRef={errorSummaryRef}
      />) : (<ProblemDetailsForm
      errors={errors}
      setErrors = {handleSetError}
      errorSummaryRef={errorSummaryRef}
      setShowOtherClients={handleSetShowOtherClients}
      setShowOtherIssues={handleSetShowOtherIssues}
      setSubmitted={handleSetSubmitted}
      problemRadioRef={problemRadioRef}
      contactLinks={contactLinks}
      errorParam={errorParam}
      descParam={descParam}
      personalFormDetails={personalFormDetails}
      showOtherClients={showOtherClients}
      showOtherIssues={showOtherIssues}
      isSubmitted={isSubmitted}
      clients={clients}
      />)}
    </>
  );
}

type Props = {
  clients: { zendeskId: string; displayName: string }[];
  contactLinks: ErrorDescription[];
};

type RadioItemProps = { inputId: string; value: string; name: string };

export function RadioItem({ inputId, value, name, children }: React.PropsWithChildren<RadioItemProps>) {
  return (
    <div className="nhsuk-radios__item">
      <input
        className="nhsuk-radios__input nhs-help-centre__form-control-input"
        id={inputId}
        name={name}
        type="radio"
        value={value}
      />
      <label className="nhsuk-label nhsuk-radios__label" htmlFor={inputId}>
        {children}
      </label>
    </div>
  );
}

export function getProblemText(ref: RefObject<HTMLDivElement>, value?: string) {
  if (!ref.current || !value || value === 'not_sure') return '';

  const selectedRadio = Array.from(ref.current.querySelectorAll('.nhsuk-radios__item')).find(
    (radio) => radio && radio.querySelector && radio.querySelector('input')?.value === value
  );
  return selectedRadio ? selectedRadio.querySelector('label')?.innerText : '';
}

export function formGroupCssClasses(errors: ContactFormValues, fieldName: keyof ContactFormValues) {
  if (!!errors[fieldName]) {
    return 'nhsuk-form-group nhsuk-form-group--error';
  }
  return 'nhsuk-form-group';
}

export function getErrorDescription(
  contactLinks: ErrorDescription[],
  errorParam: string,
  descParam: string,
  problem?: string
): ErrorDescription {
  const errorCodeRegex = /^CID\d{4,5}$/;
  const errorDescriptions = [
    {problemValue: "first_line_password_reset", code: "CID1112", description: "Password needs reseting"},
    {problemValue: "first_line_change_mobile", code: "CID1113", description: "Mobile needs changing"},
    {problemValue: "second_line_email_hint", code: "CID1114", description: "Email hint"},
    {problemValue: "second_line_manual_reset", code: "CID1115", description: "Email needs changing"},
    {problemValue: "gp_connection_issue", code: "CID7023", description: "GP connection issue"},
    {problemValue: "change_email", code: "CID3004", description: "Need to change email address for account"},
  ]

  let errorDescription = errorDescriptions.find(i => i.problemValue === problem) || null;
  if (errorDescription) {
    return {code: errorDescription.code, description: errorDescription.description};
  }
  else {
    if (!errorCodeRegex.test(errorParam)) {
      return { code: 'UNKNOWN', description: 'UNKNOWN' };
    }
    const matchingErrorFromLinks = contactLinks.find((x) => x.code === errorParam);

    return matchingErrorFromLinks || { code: errorParam, description: descParam };
}
}

export function sendToApi(
  { name, email, contact_email, nhsnumber_3_digits, phone_number, client, visit, 'message-detail': messageDetail }: ContactFormValues,
  { code, description }: ErrorDescription,
  problemText = ''
) {
  const accountId = getAccountId();
  const message = problemText ? `${problemText}. ${messageDetail}` : messageDetail;

  const body = {
    user_name: name,
    user_email: email,
    contact_email: contact_email,
    last_nhsnumber_digits: nhsnumber_3_digits,
    phone_number: phone_number,
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

export function TextBox() {
    const [characterCount, setCharacterCount] = useState(0);
  return(
  <div>
  <textarea
          className="nhsuk-textarea nhs-help-centre__form-control-input"
          id="message-detail"
          name="message-detail"
          rows={6}
          onChange={(e) => setCharacterCount(e.target.value.length)}
          aria-describedby="message-detail-hint"
          maxLength={1500}
        ></textarea>
        <div className="nhsuk-hint nhsuk-character-count__message" id="message-detail-count">
          You have <span id="remaining-characters">{1500 - characterCount}</span> characters
          remaining
        </div>
        </div>
        )
}
