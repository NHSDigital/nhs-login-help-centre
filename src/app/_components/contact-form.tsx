'use client';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function ContactForm() {
  const [showOtherClients, setShowOtherClients] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const errorCode = useSearchParams().get('error') as string;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as any);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  return (
    <form
      id="contact-us-form"
      className="nhsuk-grid-column-two-thirds nhs-help-centre__form"
      onSubmit={onSubmit}
    >
      <h1 className="nhsuk-app-contact-panel__heading">Contact NHS login support</h1>
      <div
        className="nhsuk-error-summary nhsuk-error-summary--hidden"
        aria-labelledby="error-summary-title"
        role="alert"
        tabIndex={-1}
      >
        <h2 className="nhsuk-error-summary__title">There is a problem</h2>
        <div className="nhsuk-error-summary__body">
          <ul className="nhsuk-list nhsuk-error-summary__list"></ul>
        </div>
      </div>
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
      <div className="nhsuk-form-group" id="name-form-control">
        <label className="nhsuk-label nhsuk-u-font-weight-bold" htmlFor="name">
          Full name
        </label>
        <span className="nhsuk-error-message nhs-help-centre__form-control-error"></span>
        <input
          className="nhsuk-input nhsuk-u-width-two-thirds nhs-help-centre__form-control-input"
          id="name"
          name="name"
          type="text"
        />
      </div>
      <div className="nhsuk-form-group" id="email-form-control">
        <label className="nhsuk-label nhsuk-u-font-weight-bold" htmlFor="email">
          Email address
        </label>
        <span className="nhsuk-hint">This should be the email address you use for NHS login.</span>
        <span className="nhsuk-error-message nhs-help-centre__form-control-error"></span>
        <input
          className="nhsuk-input nhsuk-u-width-two-thirds nhs-help-centre__form-control-input"
          id="email"
          name="email"
          type="text"
        />
      </div>
      <div className="nhsuk-form-group" id="client-form-control">
        <fieldset className="nhsuk-fieldset">
          <legend className="nhsuk-fieldset__legend nhsuk-fieldset__legend--xs nhsuk-u-font-weight-bold">
            Select the website or app you are trying to visit
          </legend>
          <span className="nhsuk-error-message nhs-help-centre__form-control-error"></span>
          <div
            className="nhsuk-radios nhsuk-radios--conditional"
            id="common-clients"
            onChange={(e: any) => {
              if (e.target.name === 'visit') {
                setShowOtherClients(e.target.value === 'other');
              }
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
              <div className="nhsuk-form-group">
                <select
                  className="nhsuk-select nhsuk-u-width-two-thirds"
                  id="client"
                  defaultValue=""
                  name="client"
                >
                  <option value="">Select an option</option>
                  {/* {%- for value, name in clients.clients -%} */}
                  {/* <option value="{{value}}">{{name}}</option> */}
                  {/* {%- endfor -%} */}
                  <option value="visit_the_website_or_app_i_am_trying_to_visit_is_not_on_the_list">
                    The website or app I am trying to visit is not on this list
                  </option>
                </select>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="nhsuk-form-group" id="problem-form-control">
        <fieldset className="nhsuk-fieldset">
          <legend className="nhsuk-fieldset__legend nhsuk-fieldset__legend--xs nhsuk-u-font-weight-bold">
            Select the problem you are having
          </legend>
          <span className="nhsuk-error-message nhs-help-centre__form-control-error"></span>
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
      <div className="nhsuk-form-group" id="message-form-control">
        <label className="nhsuk-label nhsuk-u-font-weight-bold" htmlFor="message-detail">
          Describe the problem in more detail
        </label>
        <span className="nhsuk-hint">
          Do not include personal or medical information like your NHS number or medical history.
        </span>
        <span className="nhsuk-error-message nhs-help-centre__form-control-error"></span>
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
      <button className="nhsuk-button submit-button" id="submit-button">
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
