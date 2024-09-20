import { FormEvent } from 'react';
import { ContactFormValues } from './contact-form';
import {  validatePersonalDetails } from './validate';

  export function PersonalDetailsForm({
    errors,
    isContinue,
    handleSetContinue,
    handleSetError,
    errorSummaryRef,
    handleSetPersonalForm
  }: {
  errors: ContactFormValues
  isContinue: boolean
  handleSetContinue:VoidFunction
  handleSetError:Function
  errorSummaryRef:any
  handleSetPersonalForm:Function
}) {

  function onContinue(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as any);
    const formJson: ContactFormValues = Object.fromEntries(formData.entries()) as ContactFormValues;
    const errors = validatePersonalDetails(formJson);
    if (errors && Object.keys(errors).length) {
      handleSetError(errors);
      if (errorSummaryRef && errorSummaryRef.current) {
        errorSummaryRef.current.focus();
        errorSummaryRef.current.scrollIntoView();
      }
    } else {
      handleSetPersonalForm(formJson)
      handleSetContinue();
      handleSetError({})
    }
  }

    return(
      <form
      id="contact-us-form"
      className="nhsuk-grid-column-two-thirds nhs-help-centre__form"
      onSubmit={onContinue}
    >
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
        <div className={formGroupCssClasses(errors, 'contact_email')} id="contact_email-form-control">
          <label className="nhsuk-label nhsuk-u-font-weight-bold" htmlFor="contact_email">
            Contact email (if different to NHS login email)
          </label>
          <span className="nhsuk-hint">This is the email address we will use to contact you about this problem.</span>
          <span className="nhsuk-error-message nhs-help-centre__form-control-error">
            {errors.contact_email}
          </span>
          <input
            className="nhsuk-input nhsuk-u-width-two-thirds nhs-help-centre__form-control-input"
            id="contact_email"
            name="contact_email"
            type="text"
          />
        </div>
        <div className={formGroupCssClasses(errors, 'phone_number')} id="phone-form-control">
          <label className="nhsuk-label nhsuk-u-font-weight-bold" htmlFor="phone_number">
                    NHS login phone number (optional)
          </label>
          <span className="nhsuk-hint">This is the phone number you used to create your account.</span>
          <span className="nhsuk-error-message nhs-help-centre__form-control-error">
            {errors.phone_number}
          </span>
          <input
            className="nhsuk-input nhsuk-u-width-two-thirds nhs-help-centre__form-control-input"
            id="phone_number"
            name="phone_number"
            type="text"
          />
        </div>
        <div className={formGroupCssClasses(errors, 'nhsnumber_3_digits')} id="nhsnumber-3-digits-form-control">
          <label className="nhsuk-label nhsuk-u-font-weight-bold" htmlFor="nhsnumber_3_digits">
                    Last 3 digits of your NHS number (optional)
          </label>
          <span className="nhsuk-hint">If you know your NHS number.</span>
          <span className="nhsuk-error-message nhs-help-centre__form-control-error">
            {errors.nhsnumber_3_digits}
          </span>
          <input
            className="nhsuk-input nhsuk-u-width-one-third nhs-help-centre__form-control-input"
            id="nhsnumber_3_digits"
            name="nhsnumber_3_digits"
            type="text"
            maxLength={3}
          />
        </div>
        <button
        className={'nhsuk-button continue-button' + (isContinue ? ' nhsuk-button--disabled' : '')}
        id="continue-button"
      >
        Continue
      </button>
      </form>
    )
  }

  function formGroupCssClasses(errors: ContactFormValues, fieldName: keyof ContactFormValues) {
  if (!!errors[fieldName]) {
    return 'nhsuk-form-group nhsuk-form-group--error';
  }
  return 'nhsuk-form-group';
}
