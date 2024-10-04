import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ProblemDetailsForm } from '../src/app/_components/problem-details-form';

function RenderProblemDetailForm () {
  return( render(
    <ProblemDetailsForm
    errors={{}}
    setErrors={jest.fn()}
    errorSummaryRef={{current:{focus:jest.fn(), scrollIntoView:jest.fn()}} as any}
    problemRadioRef={{current:{querySelectorAll:jest.fn()}} as any}
    setShowOtherClients={jest.fn()}
    setSubmitted={jest.fn()}
    contactLinks={[]}
    errorParam=''
    descParam=''
    personalFormDetails={{}}
    showOtherClients={false}
    isSubmitted={false}
    clients={[]}
    ></ProblemDetailsForm>))
}

describe('Problem details form', () => {
  it('renders correctly', () => {
    const { container } = RenderProblemDetailForm()
    expect(container).toMatchInlineSnapshot(`
<div>
  <form
    class="nhs-help-centre__form"
    id="problem-details-form"
  >
    <h2
      class="nhsuk-heading-s"
    >
      Your problem
    </h2>
    <div
      class="nhsuk-form-group"
      id="client-form-control"
    >
      <fieldset
        class="nhsuk-fieldset"
      >
        <legend
          class="nhsuk-fieldset__legend nhsuk-fieldset__legend--xs nhsuk-u-font-weight-bold"
        >
          Select the website or app you are trying to visit
        </legend>
        <span
          class="nhsuk-error-message nhs-help-centre__form-control-error"
        />
        <div
          class="nhsuk-radios nhsuk-radios--conditional"
          id="common-clients"
        >
          <div
            class="nhsuk-radios__item"
          >
            <input
              class="nhsuk-radios__input nhs-help-centre__form-control-input"
              id="visitNHS"
              name="visit"
              type="radio"
              value="visit_nhs_app"
            />
            <label
              class="nhsuk-label nhsuk-radios__label"
              for="visitNHS"
            >
              NHS App
            </label>
          </div>
          <div
            class="nhsuk-radios__item"
          >
            <input
              class="nhsuk-radios__input nhs-help-centre__form-control-input"
              id="visitPatientAccess"
              name="visit"
              type="radio"
              value="patient_access"
            />
            <label
              class="nhsuk-label nhsuk-radios__label"
              for="visitPatientAccess"
            >
              Patient Access
            </label>
          </div>
          <div
            class="nhsuk-radios__item"
          >
            <input
              class="nhsuk-radios__input nhs-help-centre__form-control-input"
              id="visitNHSPrescription"
              name="visit"
              type="radio"
              value="nhs_repeat_prescription_app"
            />
            <label
              class="nhsuk-label nhsuk-radios__label"
              for="visitNHSPrescription"
            >
              NHS Repeat Prescription App
            </label>
          </div>
          <div
            class="nhsuk-radios__item"
          >
            <input
              class="nhsuk-radios__input nhs-help-centre__form-control-input"
              id="visitOther"
              name="visit"
              type="radio"
              value="other"
            />
            <label
              class="nhsuk-label nhsuk-radios__label"
              for="visitOther"
            >
              Other
            </label>
          </div>
          <div
            class="nhsuk-radios__conditional nhsuk-radios__conditional--hidden"
            id="clients-list"
          >
            <div
              class="nhsuk-form-group"
            >
              <select
                class="nhsuk-select nhsuk-u-width-two-thirds"
                id="client"
                name="client"
              >
                <option
                  selected=""
                  value=""
                >
                  Select an option
                </option>
                <option
                  value="visit_the_website_or_app_i_am_trying_to_visit_is_not_on_the_list"
                >
                  The website or app I am trying to visit is not on this list
                </option>
              </select>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
    <div
      class="nhsuk-form-group"
      id="problem-form-control"
    >
      <fieldset
        class="nhsuk-fieldset"
      >
        <legend
          class="nhsuk-fieldset__legend nhsuk-fieldset__legend--xs nhsuk-u-font-weight-bold"
        >
          Select the problem you are having
        </legend>
        <span
          class="nhsuk-error-message nhs-help-centre__form-control-error"
        />
        <div
          class="nhsuk-radios"
          id="common-problems"
        >
          <div
            class="nhsuk-radios__item"
          >
            <input
              class="nhsuk-radios__input nhs-help-centre__form-control-input"
              id="dupeAccount"
              name="problem"
              type="radio"
              value="dupe_account"
            />
            <label
              class="nhsuk-label nhsuk-radios__label"
              for="dupeAccount"
            >
              There is already an account linked to my details
            </label>
          </div>
          <div
            class="nhsuk-radios__conditional nhsuk-radios__conditional--hidden"
            id="issues-list"
          >
            <div
              class="nhsuk-radios__item"
            >
              <input
                class="nhsuk-radios__input nhs-help-centre__form-control-input"
                id="FirstLinePasswordReset"
                name="subProblem"
                type="radio"
                value="first_line_password_reset"
              />
              <label
                class="nhsuk-label nhsuk-radios__label"
                for="FirstLinePasswordReset"
              >
                I cannot remember the password I used to set up my account
              </label>
            </div>
            <div
              class="nhsuk-radios__item"
            >
              <input
                class="nhsuk-radios__input nhs-help-centre__form-control-input"
                id="FirstLineChangeMobile"
                name="subProblem"
                type="radio"
                value="first_line_change_mobile"
              />
              <label
                class="nhsuk-label nhsuk-radios__label"
                for="FirstLineChangeMobile"
              >
                I cannot access my account as I have changed my mobile number
              </label>
            </div>
            <div
              class="nhsuk-radios__item"
            >
              <input
                class="nhsuk-radios__input nhs-help-centre__form-control-input"
                id="SecondLineEmailHint"
                name="subProblem"
                type="radio"
                value="second_line_email_hint"
              />
              <label
                class="nhsuk-label nhsuk-radios__label"
                for="SecondLineEmailHint"
              >
                I cannot remember the email address I used to set up my account
              </label>
            </div>
            <div
              class="nhsuk-radios__item"
            >
              <input
                class="nhsuk-radios__input nhs-help-centre__form-control-input"
                id="SecondLineManualReset"
                name="subProblem"
                type="radio"
                value="second_line_manual_reset"
              />
              <label
                class="nhsuk-label nhsuk-radios__label"
                for="SecondLineManualReset"
              >
                I cannot access the email address I used to set up my account
              </label>
            </div>
          </div>
          <div
            class="nhsuk-radios__item"
          >
            <input
              class="nhsuk-radios__input nhs-help-centre__form-control-input"
              id="gpConnectionIssue"
              name="problem"
              type="radio"
              value="gp_connection_issue"
            />
            <label
              class="nhsuk-label nhsuk-radios__label"
              for="gpConnectionIssue"
            >
              There is an issue connecting to my GP
            </label>
          </div>
          <div
            class="nhsuk-radios__item"
          >
            <input
              class="nhsuk-radios__input nhs-help-centre__form-control-input"
              id="changeEmail"
              name="problem"
              type="radio"
              value="change_email"
            />
            <label
              class="nhsuk-label nhsuk-radios__label"
              for="changeEmail"
            >
              I need to change the email address linked to my NHS login account
            </label>
          </div>
          <div
            class="nhsuk-radios__item"
          >
            <input
              class="nhsuk-radios__input nhs-help-centre__form-control-input"
              id="notSure"
              name="problem"
              type="radio"
              value="not_sure"
            />
            <label
              class="nhsuk-label nhsuk-radios__label"
              for="notSure"
            >
              Something else
            </label>
          </div>
        </div>
      </fieldset>
    </div>
    <div
      class="nhsuk-form-group"
      id="message-form-control"
    >
      <label
        class="nhsuk-label nhsuk-u-font-weight-bold"
        for="message-detail"
      >
        Describe the problem in more detail
      </label>
      <span
        class="nhsuk-hint"
      >
        Do not include personal or medical information like your NHS number or medical history.
      </span>
      <span
        class="nhsuk-error-message nhs-help-centre__form-control-error"
      />
      <div>
        <textarea
          aria-describedby="message-detail-hint"
          class="nhsuk-textarea nhs-help-centre__form-control-input"
          id="message-detail"
          maxlength="1500"
          name="message-detail"
          rows="6"
        />
        <div
          class="nhsuk-hint nhsuk-character-count__message"
          id="message-detail-count"
        >
          You have 
          <span
            id="remaining-characters"
          >
            1500
          </span>
           characters remaining
        </div>
      </div>
    </div>
    <p
      class="nhsuk-body"
    >
      View the
       
      <a
        href="https://access.login.nhs.uk/privacy"
        target="blank"
      >
        NHS login privacy policy (opens in a new window)
      </a>
       
      to find out what happens to your personal information.
    </p>
    <button
      class="nhsuk-button submit-button"
      id="submit-button"
    >
      Send message
    </button>
  </form>
</div>
`);
  });
  it('contains a heading', () => {
  const { getByRole } = RenderProblemDetailForm()
  expect(getByRole('heading')).toHaveTextContent("Your problem")
  });
});


