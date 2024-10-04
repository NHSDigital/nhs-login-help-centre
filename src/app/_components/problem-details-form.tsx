import { FormEvent, RefObject, useState } from 'react';
import { ContactFormValues, ErrorDescription } from './contact-form';
import { RadioItem } from './radio-item';
import { TextBox } from './text-box';
import { validateProblemDetails } from './validate';
import { formGroupCssClasses, getProblemText, getErrorDescription, sendToApi} from './contact-form-helper-functions';

export function ProblemDetailsForm({
  errors,
  setErrors,
  errorSummaryRef,
  problemRadioRef,
  setShowOtherClients,
  setSubmitted,
  contactLinks,
  errorParam,
  descParam,
  personalFormDetails,
  showOtherClients,
  isSubmitted,
  clients,
}: {
  errors: ContactFormValues;
  setErrors: Function;
  errorSummaryRef: RefObject<HTMLDivElement>;
  problemRadioRef: RefObject<HTMLDivElement>;
  setShowOtherClients: Function;
  setSubmitted: Function;
  contactLinks: ErrorDescription[];
  errorParam: string;
  descParam: string;
  personalFormDetails: ContactFormValues;
  showOtherClients: boolean;
  isSubmitted: boolean;
  clients: { zendeskId: string; displayName: string }[];
}) {
  const [showOtherIssues, setShowOtherIssues] = useState(false);

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
    <form id="problem-details-form" className="nhs-help-centre__form" onSubmit={onSubmit}>
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
        View the{' '}
        <a href="https://access.login.nhs.uk/privacy" target="blank">
          NHS login privacy policy (opens in a new window)
        </a>{' '}
        to find out what happens to your personal information.
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
