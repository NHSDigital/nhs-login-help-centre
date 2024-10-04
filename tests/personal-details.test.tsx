import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { PersonalDetailsForm } from '../src/app/_components/personal-details-form';
import { ContactFormValues } from '@/app/_components/contact-form';

function RenderPersonalDetailsForm (errors: ContactFormValues) {
  return( render(
    <PersonalDetailsForm
    errors={errors}
    setErrors={jest.fn()}
    errorSummaryRef={{current:{focus:jest.fn(), scrollIntoView:jest.fn()}} as any}
    setContinue={jest.fn()}
    setPersonalFormDetails={jest.fn()}
    ></PersonalDetailsForm>))
}

describe('Personal details form', () => {
  it('renders correctly', () => {
    const { container } = RenderPersonalDetailsForm({})
    expect(container).toMatchInlineSnapshot(`
<div>
  <form
    class="nhs-help-centre__form"
    id="personal-details-form"
  >
    <div
      class="nhsuk-inset-text"
    >
      <h2
        class="nhsuk-heading-m"
      >
        We cannot help with medical problems
      </h2>
      <p>
        This form is only for help using NHS login.
      </p>
      <p
        class="nhsuk-body"
      >
        If you need medical help, go to
         
        <a
          href="https://www.nhs.uk/contact-us/get-medical-help/"
        >
          111.nhs.uk
        </a>
         or call 111 or your GP.
      </p>
      <p
        class="nhsuk-body"
      >
        Call 999 if it's a life-threatening emergency.
      </p>
    </div>
    <h2>
      Get help
    </h2>
    <p
      class="nhsuk-body"
    >
      Telling us as much information as possible will make it easier for us to find your account and quickly solve your problem.
    </p>
    <h3>
      Your details
    </h3>
    <div
      class="nhsuk-form-group"
      id="name-form-control"
    >
      <label
        class="nhsuk-label nhsuk-u-font-weight-bold"
        for="name"
      >
        Full name
      </label>
      <span
        class="nhsuk-error-message nhs-help-centre__form-control-error"
      />
      <input
        class="nhsuk-input nhsuk-u-width-two-thirds nhs-help-centre__form-control-input"
        id="name"
        name="name"
        type="text"
      />
    </div>
    <div
      class="nhsuk-form-group"
      id="email-form-control"
    >
      <label
        class="nhsuk-label nhsuk-u-font-weight-bold"
        for="email"
      >
        NHS login email (if known)
      </label>
      <span
        class="nhsuk-hint"
      >
        This is the email you used to create your account.
      </span>
      <span
        class="nhsuk-error-message nhs-help-centre__form-control-error"
      />
      <input
        class="nhsuk-input nhsuk-u-width-two-thirds nhs-help-centre__form-control-input"
        id="email"
        name="email"
        type="text"
      />
    </div>
    <div
      class="nhsuk-form-group"
      id="contactEmail-form-control"
    >
      <label
        class="nhsuk-label nhsuk-u-font-weight-bold"
        for="contactEmail"
      >
        Contact email (if different to NHS login email)
      </label>
      <span
        class="nhsuk-hint"
      >
        This is the email address we will use to contact you about this problem.
      </span>
      <span
        class="nhsuk-error-message nhs-help-centre__form-control-error"
      />
      <input
        class="nhsuk-input nhsuk-u-width-two-thirds nhs-help-centre__form-control-input"
        id="contactEmail"
        name="contactEmail"
        type="text"
      />
    </div>
    <div
      class="nhsuk-form-group"
      id="phone-form-control"
    >
      <label
        class="nhsuk-label nhsuk-u-font-weight-bold"
        for="phoneNumber"
      >
        NHS login mobile phone number (optional)
      </label>
      <span
        class="nhsuk-hint"
      >
        This is the mobile phone number you used to create your account.
      </span>
      <span
        class="nhsuk-error-message nhs-help-centre__form-control-error"
      />
      <input
        class="nhsuk-input nhsuk-u-width-two-thirds nhs-help-centre__form-control-input"
        id="phoneNumber"
        name="phoneNumber"
        type="text"
      />
    </div>
    <div
      class="nhsuk-form-group"
      id="nhsnumber-3-digits-form-control"
    >
      <label
        class="nhsuk-label nhsuk-u-font-weight-bold"
        for="nhsNumberLastDigits"
      >
        Last 3 digits of your NHS number (optional)
      </label>
      <span
        class="nhsuk-hint"
      >
        If you know your NHS number.
      </span>
      <span
        class="nhsuk-error-message nhs-help-centre__form-control-error"
      />
      <input
        class="nhsuk-input nhsuk-u-width-one-third nhs-help-centre__form-control-input"
        id="nhsNumberLastDigits"
        maxlength="3"
        name="nhsNumberLastDigits"
        type="text"
      />
    </div>
    <button
      class="nhsuk-button continue-button"
      id="continue-button"
    >
      Continue
    </button>
  </form>
</div>
`)
  });
  
  it('shows the error message for name errors', () => {
  const { getByText } = RenderPersonalDetailsForm({name:"Enter your full name"})
  expect(getByText("Enter your full name")).toBeInTheDocument
  });

  it('shows the error message for NHS login email errors', () => {
  const { getByText } = RenderPersonalDetailsForm({email:"Enter a valid email address"})
  expect(getByText("Enter a valid email address")).toBeInTheDocument
  });

  it('shows the error message for contact email errors', () => {
  const { getByText } = RenderPersonalDetailsForm({contactEmail:"Enter your contact email address"})
  expect(getByText("Enter your contact email address")).toBeInTheDocument
  });

  it('shows the error message for phone errors', () => {
  const { getByText } = RenderPersonalDetailsForm({phoneNumber:"Enter a valid mobile phone number"})
  expect(getByText("Enter a valid mobile phone number")).toBeInTheDocument
  });

  it('shows the error message for NHS number errors', () => {
  const { getByText } = RenderPersonalDetailsForm({nhsNumberLastDigits:"Enter three digits"})
  expect(getByText("Enter three digits")).toBeInTheDocument
  });

  it('prevents a user from typing more than 3 digits of their NHS number', async () => {
    const user = userEvent.setup();
    const { getByRole } = RenderPersonalDetailsForm({})
    await user.type(getByRole('textbox', {name:"Last 3 digits of your NHS number (optional)"}), '12345');
    expect(getByRole('textbox', {name:"Last 3 digits of your NHS number (optional)"})).toHaveValue('123');
  // await user.click(getByRole('button', {name: "Continue"}))
});
});
