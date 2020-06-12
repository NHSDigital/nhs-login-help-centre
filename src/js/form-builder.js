// Builds a form object that can be used for validation and that will update the dom of the main element
const FormBuilder = function(mainFormElementID) {
  let errors = [];
  let formControls = [];
  let onSuccessHandler = null;

  const mainFormElement = document.querySelector('#' + mainFormElementID);
  const errorSummaryElement = mainFormElement.querySelector('.nhsuk-error-summary');
  const errorSummaryList = errorSummaryElement.querySelector('.nhsuk-error-summary__list');
  const originalTitle = document.title;

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
    errors = errors.concat(error);
    errorSummaryElement.classList.remove('nhsuk-error-summary--hidden');

    const listItemElement = document.createElement('li');
    const errorMessageLinkElement = document.createElement('a');

    errorMessageLinkElement.innerHTML = error;
    errorMessageLinkElement.href = '#' + formControl.inputElement.id;
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

  mainFormElement.addEventListener('submit', e => {
    e.preventDefault();
    resetForm();

    const formData = new FormData(mainFormElement);
    formControls.forEach(formControl => validateFormControl(formControl, formData));

    if (!errors.length && typeof onSuccessHandler === 'function') {
      onSuccessHandler(formData);
    }

    if (errors.length) {
      errorSummaryElement.focus();
      document.title = 'Error: ' + originalTitle;
    }
  });

  const Form = {
    addFormControl(id, validator) {
      formControls = formControls.concat({
        validator,
        containerElement: document.querySelector('#' + id),
        errorElement: document.querySelector('#' + id + ' .nhs-help-centre__form-control-error'),
        inputElement: document.querySelector('#' + id + ' .nhs-help-centre__form-control-input'),
      });
      return Form;
    },

    addSuccessHandler(handler) {
      if (typeof handler === 'function') {
        onSuccessHandler = handler;
      }
      return Form;
    },
  };

  return Form;
};
