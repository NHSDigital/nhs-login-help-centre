/*
  Builds a form object that can be used for validation and that will update the dom of the main element
  It expects a form in the following format:

  form.nhs-help-centre__form#[mainFormElementID]
    [just one of]
    div.nhsuk-error-summary
      ul.nhsuk-error-summary__list

    [any amount of]
    div.nhsuk-form-group#[formControlId]
      span.nhs-help-centre__form-control-error
      input.nhs-help-centre__form-control-input#[inputId]
*/
const FormBuilder = function(mainFormElementID) {
  let errors = [];
  let formControls = [];
  let onSuccessHandler = Utils.noop;

  const mainFormElement = document.querySelector(`#${mainFormElementID}`);
  const errorSummaryElement = mainFormElement.querySelector('.nhsuk-error-summary');
  const errorSummaryList = errorSummaryElement.querySelector('.nhsuk-error-summary__list');
  const originalTitle = document.title;

  mainFormElement.addEventListener('submit', e => {
    e.preventDefault();
    resetForm();
    validateForm();
  });

  const Form = {
    addFormControl(id, validator) {
      const containerElement = mainFormElement.querySelector(`#${id}`);

      if (!containerElement) {
        console.error(`No element with id: "${id}" in`, mainFormElement);
      } else {
        formControls.push({
          validator,
          containerElement,
          errorElement: containerElement.querySelector('.nhs-help-centre__form-control-error'),
          inputElement: containerElement.querySelector('.nhs-help-centre__form-control-input'),
        });
      }

      return Form;
    },

    addSuccessHandler(handler) {
      if (typeof handler === 'function') {
        onSuccessHandler = handler;
      }
      return Form;
    },
  };

  function resetForm() {
    resetErrorSummary();
    formControls.forEach(resetFormControl);
    document.title = originalTitle;
  }

  function resetErrorSummary() {
    errors = [];
    errorSummaryList.innerHTML = '';
    errorSummaryElement.classList.add('nhsuk-error-summary--hidden');
  }

  function resetFormControl(formControl) {
    formControl.errorElement.innerHtml = '';
    formControl.containerElement.classList.remove('nhsuk-form-group--error');
  }

  function addErrorToErrorSummary(error, formControl) {
    errors.push(error);
    errorSummaryElement.classList.remove('nhsuk-error-summary--hidden');

    const listItemElement = document.createElement('li');
    const errorMessageLinkElement = document.createElement('a');

    errorMessageLinkElement.innerHTML = error;
    errorMessageLinkElement.href = `#${formControl.inputElement.id}`;
    listItemElement.appendChild(errorMessageLinkElement);
    errorSummaryList.appendChild(listItemElement);
  }

  function validateFormControl(formControl, formData) {
    const error = formControl.validator(formData);
    if (error) {
      addErrorToErrorSummary(error, formControl);
      formControl.errorElement.innerHTML = error;
      formControl.containerElement.classList.add('nhsuk-form-group--error');
    }
  }

  function validateForm() {
    const formData = new FormData(mainFormElement);
    formControls.forEach(formControl => validateFormControl(formControl, formData));

    if (errors.length) {
      errorSummaryElement.focus();
      document.title = `Error: ${originalTitle}`;
    } else {
      onSuccessHandler(formData);
    }
  }

  return Form;
};
