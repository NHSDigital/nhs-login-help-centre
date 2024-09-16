'use client';
import { useSearchParams } from 'next/navigation';
import { FormEvent, RefObject, useRef, useState } from 'react';
import { validate } from './validate';
import Cookies from 'js-cookie';

export type ContactFormValues = {
  client?: string;
  email?: string;
  'message-detail'?: string;
  name?: string;
  // phone_number?:internal;
  problem?: string;
  visit?: string;
};

type ErrorDescription = { description: string; code: string };

const formIdsForErrorSummary: ContactFormValues = {
  visit: 'visitNHS',
  problem: 'dupeAccount',
};

export default function ContactForm({ clients, contactLinks }: Props) {
  const [showOtherClients, setShowOtherClients] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [errors, setErrors] = useState<ContactFormValues>({});
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const problemRadioRef = useRef<HTMLDivElement>(null);
  const errorParam = useSearchParams().get('error') as string;
  const descParam = useSearchParams().get('desc') as string;
  const [activeIndex, setActiveIndex] = useState(0);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as any);
    const formJson: ContactFormValues = Object.fromEntries(formData.entries()) as ContactFormValues;
    const errors = validate(formJson);
    if (errors && Object.keys(errors).length) {
      setErrors(errors);
      if (errorSummaryRef && errorSummaryRef.current) {
        errorSummaryRef.current.focus();
        errorSummaryRef.current.scrollIntoView();
      }
    } else {
      const problemText = getProblemText(problemRadioRef, formJson.problem);
      const errorDescription = getErrorDescription(contactLinks, errorParam, descParam);
      setSubmitted(true);
      sendToApi(formJson, errorDescription, problemText)
        .then((res) => {
          if (res.ok) {
            window.location.replace('/contact-sent');
          } else {
            window.location.assign('/contact-error');
          }
        })
        .catch(() => window.location.assign('/contact-error'))
        .finally(() => setSubmitted(false));
    }
  }

  function PersonalDetailsForm() {
    return (
    <>
      <div className="nhsuk-inset-text">
          <h2 className="nhsuk-heading-m">We cannot help with medical problems</h2>
          <p>This form is only for help using NHS login.</p>
          <p className="nhsuk-body">
            If you need medical help, go to{' '}
            <a href="https://www.nhs.uk/contact-us/get-medical-help/">111.nhs.uk</a> or call 111 or
            your GP.
          </p>
          <p className="nhsuk-body">Call 999 if it's a life-threatening emergency.</p>
        </div>
        <h2>Get help</h2>
        <p className="nhsuk-body">Telling us as much information as possible will make it easier for us to find your account and quickly solve your problem.</p>
        <h3>Your details</h3>
        <div className={formGroupCssClasses(errors, 'name')} id="name-form-control">
          <label className="nhsuk-label nhsuk-u-font-weight-bold" htmlFor="name">
            Full name
          </label>
          <span className="nhsuk-error-message nhs-help-centre__form-control-error">
            {errors.name}
          </span>
          <input
            className="nhsuk-input nhsuk-u-width-two-thirds nhs-help-centre__form-control-input"
            id="name"
            name="name"
            type="text"
          />
        </div>
        <div className={formGroupCssClasses(errors, 'email')} id="email-form-control">
          <label className="nhsuk-label nhsuk-u-font-weight-bold" htmlFor="email">
            NHS login email (if known)
          </label>
          <span className="nhsuk-hint">This is the email you used to create your account.</span>
          <span className="nhsuk-error-message nhs-help-centre__form-control-error">
            {errors.email}
          </span>
          <input
            className="nhsuk-input nhsuk-u-width-two-thirds nhs-help-centre__form-control-input"
            id="email"
            name="email"
            type="text"
          />
        </div>
        <div className={formGroupCssClasses(errors, 'email')} id="email-form-control">
          <label className="nhsuk-label nhsuk-u-font-weight-bold" htmlFor="email">
            Contact email (if different to NHS login email)
          </label>
          <span className="nhsuk-hint">This is the email address we will use to contact you about this problem.</span>
          <span className="nhsuk-error-message nhs-help-centre__form-control-error">
            {errors.email}
          </span>
          <input
            className="nhsuk-input nhsuk-u-width-two-thirds nhs-help-centre__form-control-input"
            id="contact_email"
            name="contact_email"
            type="text"
          />
        </div>
        <div className={formGroupCssClasses(errors, 'email')} id="email-form-control">
          <label className="nhsuk-label nhsuk-u-font-weight-bold" htmlFor="email">
                    NHS login phone number (optional)
          </label>
          <span className="nhsuk-hint">This is the phone number you used to create your account.</span>
          <span className="nhsuk-error-message nhs-help-centre__form-control-error">
            {errors.email}
          </span>
          <input
            className="nhsuk-input nhsuk-u-width-two-thirds nhs-help-centre__form-control-input"
            id="contact_email"
            name="contact_email"
            type="text"
          />
        </div>
        <div className={formGroupCssClasses(errors, 'email')} id="email-form-control">
          <label className="nhsuk-label nhsuk-u-font-weight-bold" htmlFor="email">
                    Last 3 digits of your NHS number (optional)
          </label>
          <span className="nhsuk-hint">If you know your NHS number.</span>
          <span className="nhsuk-error-message nhs-help-centre__form-control-error">
            {errors.email}
          </span>
          <input
            className="nhsuk-input nhsuk-u-width-two-thirds nhs-help-centre__form-control-input"
            id="contact_email"
            name="contact_email"
            type="text"
          />
        </div>
      </>
    )
  }

  function ProblemDetailsForm() {
    return(
      <>
              <div className={formGroupCssClasses(errors, 'visit')} id="client-form-control">
        <fieldset className="nhsuk-fieldset">
          <legend className="nhsuk-fieldset__legend nhsuk-fieldset__legend--xs nhsuk-u-font-weight-bold">
            Select the website or app you are trying to visit
          </legend>
          <span className="nhsuk-error-message nhs-help-centre__form-control-error">
            {errors.visit}
          </span>
          <div
            className="nhsuk-radios nhsuk-radios--conditional"
            id="common-clients"
            onChange={(e: any) => {
              if (e.target.name === 'visit') setShowOtherClients(e.target.value === 'other');
            }}
          >
            <RadioItem inputId="visitNHS" name="visit" value="visit_nhs_app">
              NHS App
            </RadioItem>
            <RadioItem inputId="visitPatientAccess" name="visit" value="patient_access">
              Patient Access
            </RadioItem>
            <RadioItem
              inputId="visitNHSPrescription"
              name="visit"
              value="nhs_repeat_prescription_app"
            >
              NHS Repeat Prescription App
            </RadioItem>
            <RadioItem inputId="visitOther" name="visit" value="other">
              Other
            </RadioItem>
            <div
              className={
                'nhsuk-radios__conditional' +
                (showOtherClients ? '' : ' nhsuk-radios__conditional--hidden')
              }
              id="clients-list"
            >
              <div className={formGroupCssClasses(errors, 'client')}>
                <select
                  className="nhsuk-select nhsuk-u-width-two-thirds"
                  id="client"
                  defaultValue=""
                  name="client"
                >
                  <option value="">Select an option</option>
                  {clients.map(({ zendeskId, displayName }) => (
                    <option key={zendeskId} value={zendeskId}>
                      {displayName}
                    </option>
                  ))}
                  <option value="visit_the_website_or_app_i_am_trying_to_visit_is_not_on_the_list">
                    The website or app I am trying to visit is not on this list
                  </option>
                </select>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div
        className={formGroupCssClasses(errors, 'problem')}
        id="problem-form-control"
        ref={problemRadioRef}
      >
        <fieldset className="nhsuk-fieldset">
          <legend className="nhsuk-fieldset__legend nhsuk-fieldset__legend--xs nhsuk-u-font-weight-bold">
            Select the problem you are having
          </legend>
          <span className="nhsuk-error-message nhs-help-centre__form-control-error">
            {errors.problem}
          </span>
          <div className="nhsuk-radios" id="common-problems">
            <RadioItem inputId="dupeAccount" name="problem" value="dupe_account">
              There is already an account linked to my details
            </RadioItem>
            <RadioItem inputId="gpConnectionIssue" name="problem" value="gp_connection_issue">
              There is an issue connecting to my GP
            </RadioItem>
            <RadioItem inputId="changeEmail" name="problem" value="change_email">
              I need to change the email address linked to my NHS login account
            </RadioItem>
            <RadioItem inputId="notSure" name="problem" value="not_sure">
              Something else
            </RadioItem>
          </div>
        </fieldset>
      </div>
      <div className={formGroupCssClasses(errors, 'message-detail')} id="message-form-control">
        <label className="nhsuk-label nhsuk-u-font-weight-bold" htmlFor="message-detail">
          Describe the problem in more detail
        </label>
        <span className="nhsuk-hint">
          Do not include personal or medical information like your NHS number or medical history.
        </span>
        <span className="nhsuk-error-message nhs-help-centre__form-control-error">
          {errors['message-detail']}
        </span>
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
      <div className="nhsuk-u-margin-bottom-6 nhsuk-form-group">
        <label className="nhsuk-heading-m nhsuk-u-margin-bottom-2">Privacy policy agreement</label>
        <p className="nhsuk-body">We will collect and save your information securely.</p>
        <p className="nhsuk-body">
          By sending this message you confirm that you agree to our{' '}
          <a href="https://access.login.nhs.uk/privacy">privacy notice</a> and{' '}
          <a href="https://access.login.nhs.uk/terms-and-conditions">terms and conditions</a>.
        </p>
      </div>
      </>
    )
  }

  return (
    <form
      id="contact-us-form"
      className="nhsuk-grid-column-two-thirds nhs-help-centre__form"
      onSubmit={onSubmit}
    >
      <h1 className="nhsuk-app-contact-panel__heading">Contact NHS login support</h1>
      <div
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
      </div>
      {activeIndex === 0 ? (<PersonalDetailsForm/>) : (<ProblemDetailsForm/>)}
      <button
        className={'nhsuk-button submit-button' + (isSubmitted ? ' nhsuk-button--disabled' : '')}
        id="submit-button"
      >
        Send message
      </button>
    </form>
  );
}

type Props = {
  clients: { zendeskId: string; displayName: string }[];
  contactLinks: ErrorDescription[];
};

type RadioItemProps = { inputId: string; value: string; name: string };

function RadioItem({ inputId, value, name, children }: React.PropsWithChildren<RadioItemProps>) {
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

function getProblemText(ref: RefObject<HTMLDivElement>, value?: string) {
  if (!ref.current || !value || value === 'not_sure') return '';

  const selectedRadio = Array.from(ref.current.querySelectorAll('.nhsuk-radios__item')).find(
    (radio) => radio && radio.querySelector && radio.querySelector('input')?.value === value
  );
  return selectedRadio ? selectedRadio.querySelector('label')?.innerText : '';
}

function formGroupCssClasses(errors: ContactFormValues, fieldName: keyof ContactFormValues) {
  if (!!errors[fieldName]) {
    return 'nhsuk-form-group nhsuk-form-group--error';
  }
  return 'nhsuk-form-group';
}

function getErrorDescription(
  contactLinks: ErrorDescription[],
  errorParam: string,
  descParam: string
): ErrorDescription {
  const errorCodeRegex = /^CID\d{4,5}$/;

  if (!errorCodeRegex.test(errorParam)) {
    return { code: 'UNKNOWN', description: 'UNKNOWN' };
  }
  const matchingErrorFromLinks = contactLinks.find((x) => x.code === errorParam);

  return matchingErrorFromLinks || { code: errorParam, description: descParam };
}

function sendToApi(
  { name, email, client, visit, 'message-detail': messageDetail }: ContactFormValues,
  { code, description }: ErrorDescription,
  problemText = ''
) {
  const accountId = getAccountId();
  const message = problemText ? `${problemText}. ${messageDetail}` : messageDetail;

  const body = {
    user_name: name,
    user_email: email,
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
