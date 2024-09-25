import { FormEvent, RefObject, useState } from 'react';
import { ContactFormValues, formGroupCssClasses, ErrorDescription } from './contact-form';
import { validateProblemDetails } from './validate';
import Cookies from 'js-cookie';

export function ProblemDetailsForm({
  errors,
  setErrors,
  errorSummaryRef,
  problemRadioRef,
  setShowOtherClients,
  setShowOtherIssues,
  setSubmitted,
  contactLinks,
  errorParam,
  descParam,
  personalFormDetails,
  showOtherClients,
  showOtherIssues,
  isSubmitted,
  clients,
}: {
  errors: ContactFormValues;
  setErrors: Function;
  errorSummaryRef: RefObject<HTMLDivElement>;
  problemRadioRef: RefObject<HTMLDivElement>;
  setShowOtherClients: Function;
  setShowOtherIssues: Function;
  setSubmitted: Function;
  contactLinks: ErrorDescription[];
  errorParam: string;
  descParam: string;
  personalFormDetails: ContactFormValues;
  showOtherClients: boolean;
  showOtherIssues: boolean;
  isSubmitted: boolean;
  clients: { zendeskId: string; displayName: string }[];
}) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as any);
    const formJson: ContactFormValues = Object.fromEntries(formData.entries()) as ContactFormValues;
    const errors = validateProblemDetails(formJson);
    if (errors && Object.keys(errors).length) {
      setErrors(errors);
      if (errorSummaryRef && errorSummaryRef.current) {
        errorSummaryRef.current.focus();
        errorSummaryRef.current.scrollIntoView();
      }
    } else {
      const problemText = getProblemText(problemRadioRef, formJson.problem);
      const errorDescription = getErrorDescription(
        contactLinks,
        errorParam,
        descParam,
        formJson.problem,
        formJson.subProblem
      );
      const combinedFormDetails = Object.assign(formJson, personalFormDetails);
      setSubmitted(true);
      alert(JSON.stringify(combinedFormDetails));
      alert(JSON.stringify(errorDescription));
      alert(JSON.stringify(problemText));
      sendToApi(combinedFormDetails, errorDescription, problemText)
        .then(res => {
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

  return (
    <form
      id="contact-us-form"
      className="nhsuk-grid-column-two-thirds nhs-help-centre__form"
      onSubmit={onSubmit}
    >
      <h2 className="nhsuk-heading-s">Your problem</h2>
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
          <div
            className="nhsuk-radios"
            id="common-problems"
            onChange={(e: any) => {
              if (e.target.name === 'problem')
                setShowOtherIssues(e.target.value === 'dupe_account');
              if (['gp_connection_issue', 'change_email', 'not_sure'].includes(e.target.value))
                setShowOtherIssues(false);
            }}
          >
            <RadioItem inputId="dupeAccount" name="problem" value="dupe_account">
              There is already an account linked to my details
            </RadioItem>
            <div
              className={
                'nhsuk-radios__conditional' +
                (showOtherIssues ? '' : ' nhsuk-radios__conditional--hidden')
              }
              id="issues-list"
            >
              <RadioItem
                inputId="FirstLinePasswordReset"
                name="subProblem"
                value="first_line_password_reset"
              >
                I cannot remember the password I used to set up my account
              </RadioItem>
              <RadioItem
                inputId="FirstLineChangeMobile"
                name="subProblem"
                value="first_line_change_mobile"
              >
                I cannot access my account as I have changed my mobile number
              </RadioItem>
              <RadioItem
                inputId="SecondLineEmailHint"
                name="subProblem"
                value="second_line_email_hint"
              >
                I cannot remember the email address I used to set up my account
              </RadioItem>
              <RadioItem
                inputId="SecondLineManualReset"
                name="subProblem"
                value="second_line_manual_reset"
              >
                I cannot access the email address I used to set up my account
              </RadioItem>
            </div>
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
        <TextBox></TextBox>
      </div>
      <p className="nhsuk-body">
        View the <a href="../legal/privacy">NHS login privacy policy (opens in a new window)</a> to
        find out what happens to your personal information.
      </p>
      <button
        className={'nhsuk-button submit-button' + (isSubmitted ? ' nhsuk-button--disabled' : '')}
        id="submit-button"
      >
        Send message
      </button>
    </form>
  );
}

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
    radio => radio && radio.querySelector && radio.querySelector('input')?.value === value
  );
  return selectedRadio ? selectedRadio.querySelector('label')?.innerText : '';
}

function getErrorDescription(
  contactLinks: ErrorDescription[],
  errorParam: string,
  descParam: string,
  problem: string,
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
    gp_connection_issue: { code: 'CID7023', description: 'Unable to connect to your GP surgery’s system - Reference CID7023' },
    change_email: {
      code: 'CID3004',
      description: 'Needs to change email address for account - Reference CID3004',
    },
  };

  let problemSelected = problem;
  if (problem === 'dupe_account') {
    problemSelected = subProblem!;
  }

  let errorDescription = problemSelected != null ? errorMappings[problemSelected] : null;
  if (errorDescription) {
    const matchingErrorFromLinks =
      contactLinks.find(x => x.code === errorDescription!.code) || null;
    if (matchingErrorFromLinks) {
      return matchingErrorFromLinks;
    }
    return { code: errorDescription.code, description: errorDescription.description };
  } else {
    if (!errorCodeRegex.test(errorParam)) {
      return { code: 'UNKNOWN', description: 'UNKNOWN' };
    }
    const matchingErrorFromLinks = contactLinks.find(x => x.code === errorParam);

    return matchingErrorFromLinks || { code: errorParam, description: descParam };
  }
}

function sendToApi(
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
    contactEmail: contactEmail,
    last_nhsnumber_digits: nhsNumberLastDigits,
    phoneNumber: phoneNumber,
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

function TextBox() {
  const [characterCount, setCharacterCount] = useState(0);
  return (
    <div>
      <textarea
        className="nhsuk-textarea nhs-help-centre__form-control-input"
        id="message-detail"
        name="message-detail"
        rows={6}
        onChange={e => setCharacterCount(e.target.value.length)}
        aria-describedby="message-detail-hint"
        maxLength={1500}
      ></textarea>
      <div className="nhsuk-hint nhsuk-character-count__message" id="message-detail-count">
        You have <span id="remaining-characters">{1500 - characterCount}</span> characters remaining
      </div>
    </div>
  );
}
