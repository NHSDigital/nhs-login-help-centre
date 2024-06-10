'use client';
import { useSearchParams } from 'next/navigation';

export default function ContactForm() {
  const errorCode = useSearchParams().get('error') as string;

  return (
    <form id="contact-us-form" className="nhsuk-grid-column-two-thirds nhs-help-centre__form">
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
          If you need medical help, go to&nbsp;
          <a href="https://www.nhs.uk/contact-us/get-medical-help/">111.nhs.uk</a>&nbsp; or call 111
          or your GP.
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
          <div className="nhsuk-radios nhsuk-radios--conditional" id="common-clients">
            <div className="nhsuk-radios__item">
              <input
                className="nhsuk-radios__input nhs-help-centre__form-control-input"
                id="visitNHS"
                name="visit"
                type="radio"
                value="visit_nhs_app"
              />
              <label className="nhsuk-label nhsuk-radios__label" htmlFor="visitNHS">
                NHS App
              </label>
            </div>
            <div className="nhsuk-radios__item">
              <input
                className="nhsuk-radios__input nhs-help-centre__form-control-input"
                id="visitPatientAccess"
                name="visit"
                type="radio"
                value="patient_access"
              />
              <label className="nhsuk-label nhsuk-radios__label" htmlFor="visitPatientAccess">
                Patient Access
              </label>
            </div>
            <div className="nhsuk-radios__item">
              <input
                className="nhsuk-radios__input nhs-help-centre__form-control-input"
                id="visitNHSPrescription"
                name="visit"
                type="radio"
                value="nhs_repeat_prescription_app"
              />
              <label className="nhsuk-label nhsuk-radios__label" htmlFor="visitNHSPrescription">
                NHS Repeat Prescription App
              </label>
            </div>
            <div className="nhsuk-radios__item">
              <input
                className="nhsuk-radios__input nhs-help-centre__form-control-input"
                id="visitOther"
                name="visit"
                type="radio"
                value="other"
              />
              <label className="nhsuk-label nhsuk-radios__label" htmlFor="visitOther">
                Other
              </label>
            </div>
            <div
              className="nhsuk-radios__conditional nhsuk-radios__conditional--hidden"
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
            <div className="nhsuk-radios__item">
              <input
                className="nhsuk-radios__input nhs-help-centre__form-control-input"
                id="dupeAccount"
                name="problem"
                type="radio"
                value="dupe_account"
              />
              <label className="nhsuk-label nhsuk-radios__label" htmlFor="dupeAccount">
                There is already an account linked to my details
              </label>
            </div>
            <div className="nhsuk-radios__item">
              <input
                className="nhsuk-radios__input nhs-help-centre__form-control-input"
                id="gpConnectionIssue"
                name="problem"
                type="radio"
                value="gp_connection_issue"
              />
              <label className="nhsuk-label nhsuk-radios__label" htmlFor="gpConnectionIssue">
                There is an issue connecting to my GP
              </label>
            </div>
            <div className="nhsuk-radios__item">
              <input
                className="nhsuk-radios__input nhs-help-centre__form-control-input"
                id="changeEmail"
                name="problem"
                type="radio"
                value="change_email"
              />
              <label className="nhsuk-label nhsuk-radios__label" htmlFor="changeEmail">
                I need to change the email address linked to my NHS login account
              </label>
            </div>
            <div className="nhsuk-radios__item">
              <input
                className="nhsuk-radios__input nhs-help-centre__form-control-input"
                id="notSure"
                name="problem"
                type="radio"
                value="not_sure"
              />
              <label className="nhsuk-label nhsuk-radios__label" htmlFor="notSure">
                Something else
              </label>
            </div>
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
          aria-describedby="message-detail-hint"
          maxLength={1500}
        ></textarea>
        <div className="nhsuk-hint nhsuk-character-count__message" id="message-detail-count">
          You have <span id="remaining-characters">1500</span> characters remaining
        </div>
      </div>
      <div className="nhsuk-u-margin-bottom-6 nhsuk-form-group">
        <label className="nhsuk-heading-m nhsuk-u-margin-bottom-2">Privacy policy agreement</label>
        <p className="nhsuk-body">We will collect and save your information securely.</p>
        <p className="nhsuk-body">
          By sending this message you confirm that you agree to our{' '}
          <a href="https://access.login.nhs.uk/privacy">privacy notice</a> and&nbsp;
          <a href="https://access.login.nhs.uk/terms-and-conditions">terms and conditions</a>.
        </p>
      </div>
      <button className="nhsuk-button submit-button" id="submit-button">
        Send message
      </button>
    </form>
  );
}
